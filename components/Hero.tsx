"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const FRAME_COUNT = 24;
const framePath = (n: number) =>
  `/images/hero-sequence/hero_${String(n).padStart(2, "0")}.png`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [frame, setFrame] = useState(1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Preload every frame once on mount so scrubbing never shows a blank/loading frame.
  useEffect(() => {
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
    }
  }, []);

  // Real extracted video frames scrubbed by scroll position — the same
  // technique as a canvas image-sequence, giving continuous motion
  // instead of cross-fading between a handful of keyframes.
  const frameMV = useTransform(scrollYProgress, [0.05, 0.75], [1, FRAME_COUNT]);
  useMotionValueEvent(frameMV, "change", (v) => {
    const next = Math.min(FRAME_COUNT, Math.max(1, Math.round(v)));
    setFrame((prev) => (prev === next ? prev : next));
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.18], [0, -60]);

  const productY = useTransform(scrollYProgress, [0, 1], [24, -18]);
  const productScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.08]);

  const captionOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.68, 0.85], [24, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[340svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        {/* Ambient gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#f3f4f8_55%,#eceef3_100%)]" />

        {/* Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: reduce ? 0 : headlineY }}
          className="absolute top-[16vh] z-20 px-6 text-center"
        >
          <h1 className="text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tightest text-ink">
            Free your ears.
          </h1>
          <p className="mt-5 text-[clamp(1rem,2.2vw,1.375rem)] font-medium text-ink-secondary">
            Sound that fits.
          </p>
        </motion.div>

        {/* Product — scroll-scrubbed frame sequence */}
        <motion.div
          style={{
            y: reduce ? 0 : productY,
            scale: reduce ? 1 : productScale,
          }}
          className="relative z-10 mt-[8vh] h-[52vh] w-[min(90vw,620px)]"
        >
          {/* Soft contact shadow — a gradient (not a filter) so it stays
              cheap to composite while the stack scales. */}
          <div className="pointer-events-none absolute bottom-[13%] left-1/2 h-[9%] w-[58%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(20,20,40,0.22)_0%,transparent_72%)]" />

          {/* eslint-disable-next-line @next/next/no-img-element -- rapid
              scroll-scrubbed src swaps don't suit next/image's loading
              pipeline; frames are preloaded above so swaps are instant. */}
          <img
            src={framePath(frame)}
            alt="Velv earbuds opening from the charging case"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </motion.div>

        {/* Closing caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: reduce ? 0 : captionY }}
          className="absolute bottom-[12vh] z-20 max-w-md px-6 text-center text-[15px] leading-relaxed text-ink-secondary"
        >
          Open-fit design. No silicone tips. Just sound that sits comfortably,
          all&nbsp;day.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
          aria-hidden
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink-muted">
            Scroll
          </span>
          <div className="relative h-11 w-px overflow-hidden bg-ink-muted/25">
            <motion.span
              animate={{ y: ["-110%", "210%"] }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
