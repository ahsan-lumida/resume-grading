// Server-side data layer. Talks to the backend at NEXT_PUBLIC_API_URL.
// CLIENT_SECRET is read here and must never reach the browser — this module
// is only ever imported by the BFF route (app/api/analyze/route.ts).

import "server-only";
import { ApiError, type ResumeAnalysis, type TokenResponse } from "@/types/analysis";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001";
const CLIENT_SECRET = process.env.CLIENT_SECRET ?? "";

// Module-level token cache. Survives across requests within a server process.
let tokenCache: { token: string; expiresAt: number } | null = null;

// Cache for 55 minutes regardless of the server's stated expires_in (3600s),
// leaving a safety margin before the real expiry.
const TOKEN_TTL_MS = 55 * 60 * 1000;

/**
 * Fetches and caches a bearer token. Reuses the cached token until it is
 * within the safety margin of expiry.
 */
export async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_secret: CLIENT_SECRET }),
      cache: "no-store",
    });
  } catch {
    throw new ApiError(503, "Couldn't reach the analysis service. Please try again shortly.");
  }

  if (res.status === 401) {
    throw new ApiError(401, "Authentication failed. The service credentials are invalid.");
  }
  if (!res.ok) {
    throw new ApiError(res.status, "Couldn't authenticate with the analysis service.");
  }

  const data = (await res.json()) as TokenResponse;
  tokenCache = { token: data.access_token, expiresAt: Date.now() + TOKEN_TTL_MS };
  return data.access_token;
}

/** Maps a non-OK analyze response to a user-friendly, typed error. */
function analyzeError(status: number): ApiError {
  switch (status) {
    case 401:
      // Token may have gone stale mid-flight; clear cache so the next call retries.
      tokenCache = null;
      return new ApiError(401, "Your session expired. Please try analyzing again.");
    case 413:
      return new ApiError(413, "That file is too large. Please upload a resume under 5 MB.");
    case 415:
      return new ApiError(415, "Unsupported file type. Please upload a PDF or DOCX file.");
    case 422:
      return new ApiError(
        422,
        "We couldn't read any text — this looks like a scanned image. Please upload a text-based PDF or DOCX.",
      );
    case 429:
      return new ApiError(429, "Too many requests right now. Please wait a moment and try again.");
    case 503:
      return new ApiError(503, "Our AI providers are temporarily unavailable. Please try again shortly.");
    default:
      return new ApiError(status, "Something went wrong while analyzing your resume. Please try again.");
  }
}

/**
 * Uploads a resume (and optional job description) for analysis.
 * Acquires a token, builds multipart form data, and POSTs to /api/v1/analyze.
 */
export async function analyzeResume(
  file: File,
  jobDescription?: string,
): Promise<ResumeAnalysis> {
  const token = await getToken();

  const form = new FormData();
  form.append("file", file);
  if (jobDescription && jobDescription.trim().length > 0) {
    form.append("job_description", jobDescription.trim());
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1/analyze`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(503, "Couldn't reach the analysis service. Please try again shortly.");
  }

  if (!res.ok) {
    throw analyzeError(res.status);
  }

  return (await res.json()) as ResumeAnalysis;
}

/**
 * Same as analyzeResume(), but calls the streaming endpoint and returns the raw
 * Response for the caller (the BFF route) to relay byte-for-byte to the browser.
 * Still validates the pre-stream HTTP status here — a non-OK status means the
 * backend rejected the request before opening the stream (bad file type, too
 * large, auth failure, rate limited), so it maps to a real ApiError exactly like
 * analyzeResume() does. Once this returns successfully, the response body is an
 * NDJSON stream of ProgressEvents, not a single JSON object.
 */
export async function analyzeResumeStream(
  file: File,
  jobDescription?: string,
): Promise<Response> {
  const token = await getToken();

  const form = new FormData();
  form.append("file", file);
  if (jobDescription && jobDescription.trim().length > 0) {
    form.append("job_description", jobDescription.trim());
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/v1/analyze/stream`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(503, "Couldn't reach the analysis service. Please try again shortly.");
  }

  if (!res.ok) {
    throw analyzeError(res.status);
  }

  return res;
}
