import { ImageResponse } from "next/og";

// Dynamically generated 1200×630 social card. Next's file convention wires this
// up as og:image and twitter:image automatically. Colors mirror the Aurora
// Glass tokens in app/globals.css (kept literal — no CSS vars in ImageResponse).
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
          background:
            "radial-gradient(700px 420px at 0% 0%, rgba(139, 92, 246, 0.35) 0%, transparent 65%), radial-gradient(640px 400px at 100% 15%, rgba(34, 211, 238, 0.18) 0%, transparent 65%), radial-gradient(600px 380px at 30% 110%, rgba(251, 191, 36, 0.12) 0%, transparent 65%), #0A0A0F",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#8B5CF6",
              fontSize: 36,
              fontWeight: 700,
              color: "#F4F5F9",
              position: "relative",
            }}
          >
            R
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 10,
                width: 10,
                height: 10,
                borderRadius: 10,
                background: "#22D3EE",
              }}
            />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#F4F5F9", letterSpacing: -1 }}>
            ResumeGrade
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 78,
            fontWeight: 700,
            color: "#F4F5F9",
            lineHeight: 1.04,
            letterSpacing: -2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Grade your resume.</span>
          <span style={{ color: "#A78BFA" }}>Land the interview.</span>
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            color: "#A9AEC0",
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
