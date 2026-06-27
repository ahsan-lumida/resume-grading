// Browser-side helper. Posts to the BFF route (/api/analyze) and normalizes
// errors into ApiError. Safe to import from client components.

import { ApiError, type ResumeAnalysis } from "@/types/analysis";

export async function submitAnalysis(
  file: File,
  jobDescription?: string,
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

  return (await res.json()) as ResumeAnalysis;
}
