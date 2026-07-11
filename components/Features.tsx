"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

type Callout = {
  label: string;
  desc: string;
  top: string;
  left: string;
  side: "left" | "right";
  // scroll progress at which this callout snaps into view
  revealAt: number;
};

const CALLOUTS: Callout[] = [
  {
    label: "Open-fit shell",
    desc: "Rests against the ear — never pushes into the canal.",
    top: "30%",
    left: "42%",
    side: "left",
    revealAt: 0.16,
  },
  {
    label: "Touch control",
    desc: "Tap the stem to play, skip, or take a call.",
    top: "50%",
    left: "56%",
    side: "right",
    revealAt: 0.38,
  },
  {
    label: "Precision mic",
    desc: "Beam-forming array isolates your voice on every call.",
    top: "66%",
    left: "50%",
    side: "left",
    revealAt: 0.6,
  },
];

function CalloutMarker({
  c,
  progress,
}: {
  c: Callout;
  progress: MotionValue<number>;
}) {
  // Reveal once the scroll crosses revealAt, and never hide again —
  // the section is already behind you at that point, so re-hiding on
  // scroll-up would just make the user redo the same reveal twice.
  const [shown, setShown] = useState(() => progress.get() >= c.revealAt);

  useMotionValueEvent(progress, "change", (v) => {
    if (v >= c.revealAt) setShown(true);
  });

  return (
    <motion.div
      initial={false}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{ top: c.top, left: c.left }}
      className="absolute z-10"
    >
      {/* Pulsing dot */}
      <motion.span
        initial={false}
        animate={{ scale: shown ? 1 : 0.6 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative flex h-3.5 w-3.5"
      >
        <motion.span
          animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-accent"
        />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-accent shadow" />
      </motion.span>

      {/* Label card */}
      <div
        className={`absolute top-1/2 w-[150px] -translate-y-1/2 sm:w-52 ${
          c.side === "right"
            ? "left-5 text-left sm:left-8"
            : "right-5 text-right sm:right-8"
        }`}
      >
        <div className="inline-block rounded-2xl border border-divider/70 bg-white/95 px-4 py-3 shadow-[0_12px_30px_-12px_rgba(20,20,40,0.25)] sm:bg-white/85 sm:backdrop-blur-md">
          <div className="text-[14px] font-semibold text-ink">{c.label}</div>
          <div className="mt-1 text-[12.5px] leading-snug text-ink-secondary">
            {c.desc}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Heading fades in early, drifts up slightly as you go
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.85, 0.95],
    [0, 1, 1, 0.5]
  );
  const headingY = useTransform(scrollYProgress, [0, 0.08], [24, 0]);

  // Product floats in and gently drifts
  const imgOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1.02]);

  return (
    <section id="features" ref={ref} className="relative h-[calc(var(--vh,1vh)*300)] bg-section">
      <div className="sticky top-0 flex h-[calc(var(--vh,1vh)*100)] flex-col items-center justify-center overflow-hidden">
        {/* Heading — sits above the product, in flow so it never overlaps */}
        <motion.div
          style={{ opacity: headingOpacity, y: reduce ? 0 : headingY }}
          className="z-20 px-6 pt-4 text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            The details
          </p>
          <h2 className="mt-3 text-balance text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            Designed around your ear.
          </h2>
        </motion.div>

        {/* Floating product + callouts */}
        <motion.div
          style={{ opacity: imgOpacity, scale: reduce ? 1 : imgScale }}
          className="relative mt-4 h-[56vh] w-[min(84vw,480px)]"
        >
          <Image
            src="/images/midnight-one.png"
            alt="A single Velv earbud, up close"
            fill
            sizes="(max-width: 768px) 84vw, 480px"
            className="object-contain drop-shadow-[0_40px_70px_rgba(20,20,40,0.22)]"
          />
          {CALLOUTS.map((c) => (
            <CalloutMarker key={c.label} c={c} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
