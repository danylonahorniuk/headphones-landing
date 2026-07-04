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
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
        {/* Single earbud in profile: rounded bud up top, stem tapering down */}
        <path d="M13 3.6c3 0 5 2 5 4.9 0 2.3-1.5 3.8-3.4 4.4l-1.2 6.4a1.7 1.7 0 0 1-3.4-.3V13c-1.8-.7-3-2.3-3-4.5 0-2.9 2-4.9 5-4.9Z" />
        <circle cx="13" cy="8.4" r="0.55" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Charging Case",
    desc: "Pocketable case with 24 hours of backup power.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
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
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
        <rect x="7.8" y="3.6" width="8.4" height="4" rx="1.1" />
        <path d="M12 7.6v1.6c0 1.4 3 1.5 3 2.9s-3 1.5-3 2.9 3 1.5 3 2.9v1.5" />
      </svg>
    ),
  },
  {
    title: "Quick Start Guide",
    desc: "Pair and go in under a minute.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" {...stroke}>
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
