// BFF endpoint. The browser uploads here; this handler calls the backend
// server-side so CLIENT_SECRET never leaves the server.

import { NextResponse } from "next/server";
import { analyzeResumeStream } from "@/lib/api";
import { ApiError } from "@/types/analysis";

// Resume analysis is slow and dynamic — never cache, never statically optimize.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// The backend's LLM call timeout is 90s; parsing/redaction/validation add more on
// top. Verify this against your current Vercel plan's max function duration before
// shipping — it must exceed the full pipeline's worst case or long analyses will be
// cut off mid-stream.
export const maxDuration = 120;

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { message: "Invalid upload. Please attach a resume file and try again." },
      { status: 400 },
    );
  }

  const file = form.get("file");
  const jobDescription = form.get("job_description");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { message: "No file received. Please attach your resume and try again." },
      { status: 400 },
    );
  }

  // Cheap client-side-mirrored guard before spending a backend round-trip.
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "That file is too large. Please upload a resume under 5 MB." },
      { status: 413 },
    );
  }

  let backendRes: Response;
  try {
    backendRes = await analyzeResumeStream(
      file,
      typeof jobDescription === "string" ? jobDescription : undefined,
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { message: "Something went wrong while analyzing your resume. Please try again." },
      { status: 500 },
    );
  }

  if (!backendRes.body) {
    return NextResponse.json(
      { message: "The analysis service returned an empty response. Please try again." },
      { status: 502 },
    );
  }

  // Byte-for-byte relay of the backend's NDJSON stream. Build a fresh Response
  // with an explicit, minimal header set rather than forwarding backendRes's
  // headers verbatim.
  return new Response(backendRes.body, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
