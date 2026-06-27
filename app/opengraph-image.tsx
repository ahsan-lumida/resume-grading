import { ImageResponse } from "next/og";

// Dynamically generated 1200×630 social card. Next's file convention wires this
// up as og:image and twitter:image automatically.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ResumeGrade — Free AI Resume Reviewer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(900px 500px at 15% 0%, #1b2440 0%, transparent 60%), linear-gradient(135deg, #080B11 0%, #0F1420 60%, #161D2E 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #4F6EF7, #8B5CF6)",
              fontSize: 38,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            RG
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#EEF2FF", letterSpacing: -1 }}>
            ResumeGrade
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 78,
            fontWeight: 700,
            color: "#EEF2FF",
            lineHeight: 1.04,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Grade your resume.</span>
          <span style={{ color: "#7C8FF8" }}>Land the interview.</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            color: "#8B9CC8",
            maxWidth: 920,
            lineHeight: 1.3,
          }}
        >
          Instant AI feedback — ATS score, bullet rewrites, and interview odds by company tier.
        </div>
      </div>
    ),
    { ...size },
  );
}
