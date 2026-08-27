import type { Metadata } from "next";
import ImprovedResumeApp from "@/components/ImprovedResumeApp";

// Session-driven and ephemeral (nothing persists past the browser tab) — not
// a marketing/pSEO page, so it stays out of the sitemap and off search.
export const metadata: Metadata = {
  title: "Your Improved Resume",
  robots: { index: false, follow: false },
};

export default function ImprovedResumePage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-5 py-10">
      <ImprovedResumeApp />
    </main>
  );
}
