"use client";

// Holds the uploaded resume File and its analysis result in memory so the
// "Generate the Updated Resume" flow can hand off to a fresh route
// (/improved-resume) without re-uploading or persisting anything server-side.
// Mounted once in the root layout — survives client-side navigation because
// the provider stays mounted across route changes, but is lost on a hard
// refresh (nothing is stored, matching the rest of this app's privacy stance).

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ResumeAnalysis } from "@/types/analysis";

interface ResumeSessionValue {
  file: File | null;
  jobDescription: string;
  analysis: ResumeAnalysis | null;
  setSession: (file: File, jobDescription: string, analysis: ResumeAnalysis) => void;
  clearSession: () => void;
}

const ResumeSessionContext = createContext<ResumeSessionValue | null>(null);

export function ResumeSessionProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const setSession = useCallback((f: File, jd: string, a: ResumeAnalysis) => {
    setFile(f);
    setJobDescription(jd);
    setAnalysis(a);
  }, []);

  const clearSession = useCallback(() => {
    setFile(null);
    setJobDescription("");
    setAnalysis(null);
  }, []);

  const value = useMemo(
    () => ({ file, jobDescription, analysis, setSession, clearSession }),
    [file, jobDescription, analysis, setSession, clearSession],
  );

  return <ResumeSessionContext.Provider value={value}>{children}</ResumeSessionContext.Provider>;
}

export function useResumeSession(): ResumeSessionValue {
  const ctx = useContext(ResumeSessionContext);
  if (!ctx) {
    throw new Error("useResumeSession must be used within a ResumeSessionProvider");
  }
  return ctx;
}
