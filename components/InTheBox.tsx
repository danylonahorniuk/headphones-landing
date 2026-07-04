"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type Item = { title: string; desc: string; icon: React.ReactNode };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ITEMS: Item[] = [
  {
    title: "Velv Earbuds",
    desc: "A pair of open-fit buds, tuned and ready.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" {...stroke}>
        <path d="M11 12a4 4 0 0 1 8 0v2a4 4 0 0 1-4 4h-1v6" />
        <path d="M21 12a4 4 0 0 0-8 0v2a4 4 0 0 0 4 4h1v6" />
      </svg>
    ),
  },
  {
    title: "Charging Case",
    desc: "Pocketable case with 24 hours of backup power.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" {...stroke}>
        <rect x="7" y="12" width="18" height="13" rx="4" />
        <path d="M11 12v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" />
        <path d="M16 17v3" />
      </svg>
    ),
  },
  {
    title: "USB-C Cable",
    desc: "Braided cable for fast, universal charging.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" {...stroke}>
        <path d="M8 8c0 6 16 10 16 16" />
        <rect x="4" y="5" width="8" height="6" rx="2" />
        <rect x="20" y="21" width="8" height="6" rx="2" />
      </svg>
    ),
  },
  {
    title: "Quick Start Guide",
    desc: "Pair and go in under a minute.",
    icon: (
      <svg viewBox="0 0 32 32" className="h-8 w-8" {...stroke}>
        <path d="M16 9c-2-1.5-5-2-8-2v16c3 0 6 .5 8 2 2-1.5 5-2 8-2V7c-3 0-6 .5-8 2Z" />
        <path d="M16 9v18" />
      </svg>
    ),
  },
];

export default function InTheBox() {
  return (
    <section className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            In the box
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            Everything you need.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-[24px] border border-divider bg-canvas p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-tint text-accent-deep">
                {item.icon}
              </div>
              <h3 className="mt-5 text-[16px] font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-secondary">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
