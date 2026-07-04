"use client";

import { motion } from "framer-motion";
import { easeOutExpo, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const VELV = [
  "Rests gently on the ear — no pressure",
  "Stays aware of your surroundings",
  "Comfortable through all-day wear",
  "Nothing pushed into the ear canal",
];

const TRADITIONAL = [
  "Silicone tip wedges into the canal",
  "Seals you off from the room",
  "Ear fatigue after a couple of hours",
  "Traps moisture and wax inside",
];

function Check() {
  return (
    <svg className="h-5 w-5 flex-none text-accent" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 10.5l3.2 3.2L15 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="h-5 w-5 flex-none text-ink-muted" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M6.5 6.5l7 7M13.5 6.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Comparison() {
  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent-deep">
            Why open-fit
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            Comfort that lasts longer.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
            Traditional tips seal your ears shut. Velv rests against them —
            so you can wear it all day and still hear the world.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2"
        >
          {/* Velv */}
          <motion.div
            variants={fadeUp}
            className="rounded-[28px] border-2 border-accent/25 bg-accent-tint/40 p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[19px] font-semibold text-ink">
                Velv Open-fit
              </h3>
              <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold text-white">
                Velv
              </span>
            </div>
            <ul className="mt-6 space-y-4">
              {VELV.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check />
                  <span className="text-[15px] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Traditional */}
          <motion.div
            variants={fadeUp}
            className="rounded-[28px] border border-divider bg-section p-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[19px] font-semibold text-ink-secondary">
                Traditional in-ear
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {TRADITIONAL.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Cross />
                  <span className="text-[15px] leading-snug text-ink-secondary">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
