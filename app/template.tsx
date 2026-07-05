"use client";

import { motion, useReducedMotion } from "framer-motion";

// Page transition: template.tsx remounts on every route change, so this
// motion.div re-runs its entrance (fade + slight rise/scale) between
// /, /ats-resume-checker, /resume-score, etc. Nav and footer live in
// layout.tsx and stay put. (True exit animations in the App Router
// require freezing Next's private router context — deliberately avoided;
// see AGENTS.md.)
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
