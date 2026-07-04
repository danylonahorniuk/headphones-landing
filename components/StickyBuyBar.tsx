"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useColor } from "@/components/ColorContext";

const NAMES: Record<string, { name: string; swatch: string }> = {
  midnight: { name: "Midnight", swatch: "#2A2A2E" },
  pearl: { name: "Pearl", swatch: "#F0EDE8" },
  storm: { name: "Storm", swatch: "#8C8C96" },
};

export default function StickyBuyBar() {
  const { color } = useColor();
  const finish = NAMES[color] ?? NAMES.midnight;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      // Hide once the pricing section reaches the lower part of the viewport
      // — the bar is redundant there (and near the footer CTA).
      const pricing = document.getElementById("pricing");
      const pricingReached = pricing
        ? pricing.getBoundingClientRect().top < window.innerHeight * 0.8
        : false;
      setVisible(pastHero && !pricingReached);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4"
        >
          <div className="mx-auto flex max-w-content items-center justify-between gap-4 rounded-2xl border border-divider/70 bg-canvas/85 px-4 py-3 shadow-[0_12px_40px_-12px_rgba(20,20,40,0.28)] backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <span
                className="hidden h-7 w-7 flex-none rounded-full border border-black/10 sm:block"
                style={{ backgroundColor: finish.swatch }}
                aria-hidden
              />
              <div className="leading-tight">
                <div className="text-[14px] font-semibold text-ink">
                  Velv Earbuds
                </div>
                <div className="text-[12.5px] text-ink-secondary">
                  {finish.name} · $149
                </div>
              </div>
            </div>

            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              <span>Buy now</span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
