"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type Callout = {
  label: string;
  desc: string;
  // position of the dot on the image, in %
  top: string;
  left: string;
  // which side the label sits on
  side: "left" | "right";
};

const CALLOUTS: Callout[] = [
  {
    label: "Precision mic",
    desc: "Beam-forming array isolates your voice on every call.",
    top: "46%",
    left: "62%",
    side: "right",
  },
  {
    label: "Touch control",
    desc: "Tap the stem to play, skip, or take a call.",
    top: "20%",
    left: "40%",
    side: "left",
  },
  {
    label: "Open-fit shell",
    desc: "Rests against the ear — never pushes into the canal.",
    top: "70%",
    left: "30%",
    side: "left",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="features" className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            The details
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            Designed around your ear.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-secondary">
            Every surface has a reason. Here's what happens where.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="relative mx-auto mt-16 aspect-square w-full max-w-[560px]"
        >
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="absolute inset-0 overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-20px_rgba(20,20,40,0.18)]"
          >
            <Image
              src="/images/midnight-detail-mic.png"
              alt="Macro detail of the Velv earbud stem"
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover"
            />
          </motion.div>

          {/* Callouts */}
          {CALLOUTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.35,
                ease: easeOutExpo,
              }}
              className="absolute z-10"
              style={{ top: c.top, left: c.left }}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-3.5 w-3.5">
                <motion.span
                  animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-accent shadow" />
              </span>

              {/* Label card */}
              <motion.div
                initial={{ opacity: 0, x: c.side === "right" ? -8 : 8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.75 + i * 0.35,
                  ease: easeOutExpo,
                }}
                className={`absolute top-1/2 w-48 -translate-y-1/2 ${
                  c.side === "right"
                    ? "left-7 text-left"
                    : "right-7 text-right"
                }`}
              >
                <div className="inline-block rounded-2xl border border-divider/80 bg-white/90 px-4 py-3 backdrop-blur-sm">
                  <div className="text-[14px] font-semibold text-ink">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-ink-secondary">
                    {c.desc}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
