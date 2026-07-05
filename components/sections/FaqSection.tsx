"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { faqPageLd, type QA } from "@/lib/seo";
import Reveal from "@/components/motion/Reveal";

export default function FaqSection({
  items,
  heading = "Frequently asked questions",
}: {
  items: QA[];
  heading?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-24 border-t border-border py-20 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(items)) }}
      />
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
      </Reveal>
      <dl className="mt-10 space-y-4">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={Math.min(i, 6) * 0.04}>
              <div
                className={`glass rounded-2xl border transition-[border-color,box-shadow] duration-300 ${
                  isOpen
                    ? "border-border-bright shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "border-border hover:border-border-bright"
                }`}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left font-semibold tracking-tight text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.q}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.25 }}
                      className="shrink-0 text-secondary"
                    >
                      <ChevronDown size={18} aria-hidden="true" />
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-secondary">{item.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </dl>
    </section>
  );
}
