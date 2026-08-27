// BFF endpoint. The browser posts the original file + the analysis JSON it
// already has here; this handler calls the backend server-side so
// CLIENT_SECRET never leaves the server. Mirrors app/api/analyze/route.ts.

import { NextResponse } from "next/server";
import { generateResumeStream } from "@/lib/api";
import { ApiError } from "@/types/analysis";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
// Generation re-parses the file, re-redacts, and makes its own LLM call, so
// it has the same worst-case latency profile as /api/analyze — see that
// route's note on keeping this above the backend's LLM call timeout.
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
  const analysis = form.get("analysis");
  const jobDescription = form.get("job_description");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { message: "No file received. Please attach your resume and try again." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { message: "That file is too large. Please upload a resume under 5 MB." },
      { status: 413 },
    );
  }

  if (typeof analysis !== "string" || analysis.trim().length === 0) {
    return NextResponse.json(
      { message: "Missing analysis data. Please analyze your resume again." },
      { status: 400 },
    );
  }

  let backendRes: Response;
  try {
    backendRes = await generateResumeStream(
      file,
      typeof jobDescription === "string" ? jobDescription : undefined,
      analysis,
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { message: "Something went wrong while generating your resume. Please try again." },
      { status: 500 },
    );
  }

  if (!backendRes.body) {
    return NextResponse.json(
      { message: "The generation service returned an empty response. Please try again." },
      { status: 502 },
    );
  }

  return new Response(backendRes.body, {
    status: 200,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
