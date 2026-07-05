"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Lenis smooth scrolling for the whole document. Scrolls the window
// natively (so useScroll/scroll events keep working) and takes over
// anchor links, offsetting for the sticky navbar.
// Skipped entirely under prefers-reduced-motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      anchors: { offset: -88 },
      // Lenis defaults `content` to document.documentElement, but Chrome keeps
      // <html>'s border-box at viewport height, so its ResizeObserver never
      // fires when the page grows (e.g. analysis results replacing the upload
      // view) — the cached scroll limit goes stale and wheel/touchpad scrolling
      // dead-stops before the real bottom. <body>'s box does grow with content.
      content: document.body,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
