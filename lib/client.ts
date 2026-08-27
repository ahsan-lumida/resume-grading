// Browser-side helper. Posts to the BFF route (/api/analyze), consumes the
// NDJSON progress stream it relays, and normalizes errors into ApiError.
// Safe to import from client components.

import { ApiError, type ProgressEvent, type ProgressStage, type ResumeAnalysis } from "@/types/analysis";
import type { GeneratedResume, GenerateProgressEvent, GenerateProgressStage } from "@/types/resumeContent";

// In-stream "error" events have no distinct HTTP status to key off (the response
// is already a 200 by the time they can occur) — map error codes to the same
// friendly copy used for pre-stream HTTP-status errors instead.
function streamErrorMessage(code: string, fallback: string): string {
  switch (code) {
    case "resume_parse_error":
      return "We couldn't read any text — this looks like a scanned image. Please upload a text-based PDF or DOCX.";
    case "pii_redaction_error":
      return "Something went wrong while processing your resume. Please try again.";
    case "all_providers_exhausted":
      return "Our AI providers are temporarily unavailable. Please try again shortly.";
    case "unsupported_file_type":
      return "Unsupported file type. Please upload a PDF or DOCX file.";
    default:
      return fallback || "Something went wrong while analyzing your resume. Please try again.";
  }
}

export async function submitAnalysis(
  file: File,
  jobDescription?: string,
  onProgress?: (event: { stage: ProgressStage; pct: number }) => void,
): Promise<ResumeAnalysis> {
  const form = new FormData();
  form.append("file", file);
  if (jobDescription && jobDescription.trim().length > 0) {
    form.append("job_description", jobDescription.trim());
  }

  let res: Response;
  try {
    res = await fetch("/api/analyze", { method: "POST", body: form });
  } catch {
    throw new ApiError(0, "Network error. Check your connection and try again.");
  }

  // Pre-stream HTTP error path — unchanged from before streaming was added.
  if (!res.ok) {
    let message = "Something went wrong while analyzing your resume. Please try again.";
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // Non-JSON error body; keep the default message.
    }
    throw new ApiError(res.status, message);
  }

  if (!res.body) {
    throw new ApiError(0, "Empty response from server.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastPct = 0;

  // Returns the final result if `line` was the terminal "done" event, otherwise
  // undefined (progress ticks report via onProgress and don't end the stream).
  function handleLine(line: string): ResumeAnalysis | undefined {
    let event: ProgressEvent;
    try {
      event = JSON.parse(line) as ProgressEvent;
    } catch {
      console.error("Malformed NDJSON line from /api/analyze:", line);
      return undefined;
    }

    if (event.stage === "done") {
      return event.result;
    }
    if (event.stage === "error") {
      throw new ApiError(0, streamErrorMessage(event.code, event.message));
    }

    // Defensive: never let the bar visually regress on an out-of-order tick.
    lastPct = Math.max(lastPct, event.pct);
    onProgress?.({ stage: event.stage, pct: lastPct });
    return undefined;
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        if (!line) continue;
        const result = handleLine(line);
        if (result) return result;
      }
    }

    // Flush a final unterminated line, if the stream ended without a trailing \n.
    const rest = buffer.trim();
    if (rest) {
      const result = handleLine(rest);
      if (result) return result;
    }
  } finally {
    reader.releaseLock();
  }

  throw new ApiError(0, "Stream ended unexpectedly without a result. Please try again.");
}

function generateStreamErrorMessage(code: string, fallback: string): string {
  switch (code) {
    case "resume_parse_error":
      return "We couldn't read any text — this looks like a scanned image. Please upload a text-based PDF or DOCX.";
    case "pii_redaction_error":
      return "Something went wrong while processing your resume. Please try again.";
    case "all_providers_exhausted":
      return "Our AI providers are temporarily unavailable. Please try again shortly.";
    case "unsupported_file_type":
      return "Unsupported file type. Please upload a PDF or DOCX file.";
    case "resume_generation_error":
      return "We couldn't generate your improved resume. Please try again.";
    default:
      return fallback || "Something went wrong while generating your resume. Please try again.";
  }
}

/**
 * Posts the original file + the already-computed analysis to /api/generate,
 * consumes the NDJSON progress stream, and resolves with the terminal
 * GeneratedResume. Mirrors submitAnalysis()'s stream-reading shape.
 */
export async function submitGeneration(
  file: File,
  jobDescription: string | undefined,
  analysis: ResumeAnalysis,
  onProgress?: (event: { stage: GenerateProgressStage; pct: number }) => void,
): Promise<GeneratedResume> {
  const form = new FormData();
  form.append("file", file);
  form.append("analysis", JSON.stringify(analysis));
  if (jobDescription && jobDescription.trim().length > 0) {
    form.append("job_description", jobDescription.trim());
  }

  let res: Response;
  try {
    res = await fetch("/api/generate", { method: "POST", body: form });
  } catch {
    throw new ApiError(0, "Network error. Check your connection and try again.");
  }

  if (!res.ok) {
    let message = "Something went wrong while generating your resume. Please try again.";
    try {
      const data = (await res.json()) as { message?: string };
      if (data?.message) message = data.message;
    } catch {
      // Non-JSON error body; keep the default message.
    }
    throw new ApiError(res.status, message);
  }

  if (!res.body) {
    throw new ApiError(0, "Empty response from server.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let lastPct = 0;

  function handleLine(line: string): GeneratedResume | undefined {
    let event: GenerateProgressEvent;
    try {
      event = JSON.parse(line) as GenerateProgressEvent;
    } catch {
      console.error("Malformed NDJSON line from /api/generate:", line);
      return undefined;
    }

    if (event.stage === "done") {
      return event.result;
    }
    if (event.stage === "error") {
      throw new ApiError(0, generateStreamErrorMessage(event.code, event.message));
    }

    lastPct = Math.max(lastPct, event.pct);
    onProgress?.({ stage: event.stage, pct: lastPct });
    return undefined;
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        if (!line) continue;
        const result = handleLine(line);
        if (result) return result;
      }
    }

    const rest = buffer.trim();
    if (rest) {
      const result = handleLine(rest);
      if (result) return result;
    }
  } finally {
    reader.releaseLock();
  }

  throw new ApiError(0, "Stream ended unexpectedly without a result. Please try again.");
}
