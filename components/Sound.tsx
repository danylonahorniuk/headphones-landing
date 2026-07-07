"use client";

import { motion } from "framer-motion";
import { easeOutExpo, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const PILLARS = [
  {
    title: "12mm dynamic drivers",
    body: "Custom-tuned for warm lows and airy highs without the pressure of in-ear tips.",
  },
  {
    title: "Adaptive EQ",
    body: "Sound adjusts in real time to how the buds sit in your ears.",
  },
  {
    title: "Spatial audio",
    body: "Head-tracked sound that places you inside the mix.",
  },
];

// Static bar heights (percent) — animated via scaleY
const BARS = [
  28, 44, 62, 80, 56, 72, 90, 64, 48, 76, 94, 68, 52, 84, 60, 40, 70, 88, 58,
  46, 66, 82, 50, 34,
];

export default function Sound() {
  return (
    <section id="sound" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      {/* Accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-content px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Sound
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter"
          >
            Big sound. Open ears.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[17px] leading-relaxed text-white/60"
          >
            Most open-fit buds trade bass for comfort. Velv doesn't.
          </motion.p>
        </motion.div>

        {/* Equalizer visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mx-auto mt-16 flex h-40 max-w-3xl items-center justify-center gap-[3px] sm:gap-1.5"
        >
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0.15 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.02,
                ease: easeOutExpo,
              }}
              className="w-full max-w-[10px] origin-bottom rounded-full bg-gradient-to-t from-accent/40 to-accent"
              style={{ height: `${h}%` }}
            >
              <motion.span
                animate={{ scaleY: [0.18, 1, 0.32, 0.9, 0.22, 0.75, 0.18] }}
                transition={{
                  duration: 1 + (i % 6) * 0.22,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 8) * 0.11,
                }}
                className="block h-full w-full origin-bottom rounded-full bg-inherit"
              />
            </motion.span>
          ))}
        </motion.div>

        {/* Pillars */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-20 grid max-w-4xl gap-8 sm:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.div key={p.title} variants={fadeUp}>
              <h3 className="text-[18px] font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                {p.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
