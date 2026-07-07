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
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...stroke}>
        {/* Single earbud in profile, tilted like the product shots */}
        <g transform="rotate(-18 12 12)">
          <path d="M8 7.5a4 4 0 0 1 8 0c0 1.6-.9 2.6-2 3.3v6.7a2 2 0 0 1-4 0v-6.7c-1.1-.7-2-1.7-2-3.3Z" />
          <circle cx="12" cy="13" r="0.55" fill="currentColor" stroke="none" />
        </g>
      </svg>
    ),
  },
  {
    title: "Charging Case",
    desc: "Pocketable case with 24 hours of backup power.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...stroke}>
        <rect x="4" y="7" width="16" height="12" rx="4" />
        <path d="M9 7V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v1" />
        <path d="M13 10.2 10.6 13.8h1.8L11.6 17l3-4.4h-1.8Z" />
      </svg>
    ),
  },
  {
    title: "USB-C Cable",
    desc: "Braided cable for fast, universal charging.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...stroke}>
        {/* USB-C plug head with visible pins, cable trailing below */}
        <rect x="8.5" y="4" width="7" height="4.6" rx="2.3" />
        <path d="M10.5 5.4v1.8M13.5 5.4v1.8" />
        <path d="M12 8.6v2c0 1.4 3 1.4 3 2.8s-3 1.4-3 2.8 3 1.4 3 2.8v1.4" />
      </svg>
    ),
  },
  {
    title: "Quick Start Guide",
    desc: "Pair and go in under a minute.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" {...stroke}>
        <path d="M12 6.5v14" />
        <path d="M3.5 17.5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1h4A4.5 4.5 0 0 1 12 9a4.5 4.5 0 0 1 4.5-4.5h4a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-5a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z" />
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
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-[32px] border border-divider bg-canvas p-9"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-tint text-accent-deep">
                {item.icon}
              </div>
              <h3 className="mt-7 text-[17px] font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-secondary">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
