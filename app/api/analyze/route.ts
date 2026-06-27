// BFF endpoint. The browser uploads here; this handler calls the backend
// server-side so CLIENT_SECRET never leaves the server.

import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/api";
import { ApiError } from "@/types/analysis";

// Resume analysis is slow and dynamic — never cache, never statically optimize.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

  try {
    const analysis = await analyzeResume(
      file,
      typeof jobDescription === "string" ? jobDescription : undefined,
    );
    return NextResponse.json(analysis, { status: 200 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { message: "Something went wrong while analyzing your resume. Please try again." },
      { status: 500 },
    );
  }
}
