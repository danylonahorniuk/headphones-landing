"use client";

import { motion } from "framer-motion";
import { easeOutExpo, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const GROUPS = [
  {
    title: "Audio",
    rows: [
      ["Drivers", "12mm dynamic"],
      ["Tuning", "Adaptive EQ"],
      ["Microphones", "Dual beam-forming"],
      ["Codecs", "AAC, SBC"],
    ],
  },
  {
    title: "Battery",
    rows: [
      ["Earbuds", "6 hours"],
      ["With case", "24 hours"],
      ["Quick charge", "10 min = 2 hrs"],
      ["Charging", "USB-C"],
    ],
  },
  {
    title: "Connectivity",
    rows: [
      ["Bluetooth", "5.3"],
      ["Range", "Up to 10 m"],
      ["Multipoint", "2 devices"],
      ["Latency", "Low-latency mode"],
    ],
  },
  {
    title: "Design",
    rows: [
      ["Fit", "Open-fit, no tips"],
      ["Weight", "5 g per earbud"],
      ["Water resistance", "IPX4"],
      ["Controls", "Touch"],
    ],
  },
];

export default function Specs() {
  return (
    <section id="specs" className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            Tech specs
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            The numbers.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-2"
        >
          {GROUPS.map((group) => (
            <motion.div key={group.title} variants={fadeUp}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-ink-muted">
                {group.title}
              </h3>
              <dl className="mt-3">
                {group.rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between border-b border-divider py-3.5"
                  >
                    <dt className="text-[15px] text-ink-secondary">{label}</dt>
                    <dd className="text-[15px] font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
