"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic hover wrapper for CTAs: the child drifts a few px toward the
 * cursor and scales down on press. Wrap the actual <button>/<Link> — the
 * wrapper stays out of the a11y tree. Inert under prefers-reduced-motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.2,
  maxShift = 8,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  maxShift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 320, damping: 22 });
  const y = useSpring(0, { stiffness: 320, damping: 22 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const clamp = (v: number) => Math.max(-maxShift, Math.min(maxShift, v));
    x.set(clamp((e.clientX - (rect.left + rect.width / 2)) * strength));
    y.set(clamp((e.clientY - (rect.top + rect.height / 2)) * strength));
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.97 }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
