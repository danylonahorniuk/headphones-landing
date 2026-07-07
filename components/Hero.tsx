"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

// The hero product is a real 121-frame studio sequence of the case opening
// and the buds lifting out (rendered on a light-gray studio backdrop). We
// scrub it with the scroll position instead of playing it, so the motion is
// perfectly tied to how far the user has scrolled.
const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/images/hero-sequence/f_${String(i).padStart(3, "0")}.webp`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();
  // Reveal as soon as the first frame paints (it's tiny) — we never wait for
  // the whole sequence, so the hero is never left with an empty centre.
  const [firstReady, setFirstReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Warm the cache for the rest of the frames in the background so scrubbing
  // only swaps a cached <img> src — no network fetch mid-scroll. Frame 1 is
  // already requested by the visible <img>, so start from 2.
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      imgs.push(img);
    }
    return () => {
      imgs.length = 0;
    };
  }, []);

  // If frame 1 was already cached (or decoded before hydration), the <img>'s
  // onLoad may have fired before React attached its handler — reveal it here
  // so the hero is never stuck invisible.
  useEffect(() => {
    if (imgRef.current?.complete) setFirstReady(true);
  }, []);

  // Scroll → frame index. Small holds at each end keep the closed case on
  // screen while the headline is up, and let the fully-open shot settle
  // before the section releases.
  const frame = useTransform(
    scrollYProgress,
    [0.06, 0.9],
    [1, FRAME_COUNT],
    { clamp: true }
  );

  useMotionValueEvent(frame, "change", (v) => {
    if (reduce) return;
    const i = Math.min(FRAME_COUNT, Math.max(1, Math.round(v)));
    const el = imgRef.current;
    if (el) el.src = framePath(i);
  });

  // Headline fades/lifts away as you scroll in
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.24], [0, -60]);

  // Gentle parallax for depth — the opening motion itself lives inside the
  // frame sequence, so this only adds a subtle drift/zoom.
  const productScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.06]);
  const productY = useTransform(scrollYProgress, [0, 1], [12, -14]);

  // Closing caption fades in at the end
  const captionOpacity = useTransform(scrollYProgress, [0.62, 0.85], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.62, 0.85], [24, 0]);

  // Reduced motion: hold a single "buds lifting out" still.
  const initialFrame = framePath(reduce ? 96 : 1);

  return (
    <section id="top" ref={ref} className="relative h-[340svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#EBEBEE_0%,#F1F1F3_46%,#F7F6F7_100%)]">
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

        {/* Product frame sequence — the square studio shot is feathered at
            its edges (radial mask) so it dissolves into the matching
            light-gray page wash instead of reading as a hard-edged box. */}
        <motion.div
          style={{
            y: reduce ? 0 : productY,
            scale: reduce ? 1 : productScale,
          }}
          className="relative z-10 mt-[9vh] aspect-square w-[min(68vw,440px)]"
        >
          <div
            style={{
              opacity: firstReady || reduce ? 1 : 0,
              // Feather the square studio frame into the page. The axes are
              // handled separately (composited with intersect): a narrow
              // radial dissolves the left/right edges, while a vertical
              // linear fades the top/bottom edges. Splitting them lets the
              // top fade finish at 7% — above where the buds fly (~10%) — so
              // the hard top edge disappears without clipping the earbuds.
              maskImage:
                "radial-gradient(46% 100% at 50% 50%, #000 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 7%, #000 88%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskImage:
                "radial-gradient(46% 100% at 50% 50%, #000 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 7%, #000 88%, transparent 100%)",
              WebkitMaskComposite: "source-in",
            }}
            className="absolute inset-0 transition-opacity duration-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={initialFrame}
              alt="Velv charging case opening as the earbuds lift out"
              width={760}
              height={760}
              onLoad={() => setFirstReady(true)}
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>

        {/* Closing caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: reduce ? 0 : captionY }}
          className="absolute bottom-[6vh] z-20 max-w-md px-6 text-center text-[15px] leading-relaxed text-ink-secondary"
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
