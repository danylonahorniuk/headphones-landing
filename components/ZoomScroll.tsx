"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

/**
 * Scroll-driven zoom through three keyframes.
 * Each frame scales up while cross-fading into the next, so the
 * sequence reads as one continuous push-in even without video.
 */

const SPECS = [
  { value: "6h", label: "Per charge" },
  { value: "24h", label: "With case" },
  { value: "5g", label: "Each bud" },
  { value: "IPX4", label: "Sweat proof" },
];

function Frame({
  src,
  alt,
  opacity,
  scale,
  priority,
}: {
  src: string;
  alt: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number> | number;
  priority?: boolean;
}) {
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-contain"
      />
    </motion.div>
  );
}

export default function ZoomScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Frame A — wide shot, both buds
  const aOpacity = useTransform(scrollYProgress, [0, 0.32, 0.4], [1, 1, 0]);
  const aScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.55]);

  // Frame B — single bud, medium
  const bOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.44, 0.64, 0.72],
    [0, 1, 1, 0]
  );
  const bScale = useTransform(scrollYProgress, [0.34, 0.72], [1, 1.5]);

  // Frame C — macro close-up
  const cOpacity = useTransform(scrollYProgress, [0.66, 0.78], [0, 1]);
  const cScale = useTransform(scrollYProgress, [0.66, 1], [1, 1.18]);

  // Intro copy fades out as the zoom takes over
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  // Spec strip appears near the end
  const specsOpacity = useTransform(scrollYProgress, [0.8, 0.94], [0, 1]);
  const specsY = useTransform(scrollYProgress, [0.8, 0.94], [30, 0]);

  return (
    <section id="overview" ref={ref} className="relative h-[calc(var(--vh,1vh)*340)] bg-canvas">
      <div className="sticky top-0 flex h-[calc(var(--vh,1vh)*100)] items-center justify-center overflow-hidden">
        {/* Intro copy */}
        <motion.div
          style={{ opacity: introOpacity, y: reduce ? 0 : introY }}
          className="absolute top-[14vh] z-20 px-6 text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            Engineered to disappear
          </p>
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tighter text-ink">
            Every detail, up close.
          </h2>
        </motion.div>

        {/* Zoom frames */}
        <div className="relative h-[70vh] w-[min(94vw,900px)]">
          <Frame
            src="/images/midnight-two.png"
            alt="Two Velv earbuds"
            opacity={aOpacity}
            scale={reduce ? 1 : aScale}
            priority
          />
          <Frame
            src="/images/midnight-one.png"
            alt="A single Velv earbud"
            opacity={bOpacity}
            scale={reduce ? 1 : bScale}
          />
          <Frame
            src="/images/midnight-one-closer.png"
            alt="Macro detail of a Velv earbud"
            opacity={cOpacity}
            scale={reduce ? 1 : cScale}
          />
        </div>

        {/* Bottom scrim — keeps the spec strip readable over the dark product */}
        <motion.div
          style={{ opacity: specsOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[42vh] bg-gradient-to-t from-canvas via-canvas/90 to-transparent"
          aria-hidden
        />

        {/* Spec strip */}
        <motion.div
          style={{ opacity: specsOpacity, y: reduce ? 0 : specsY }}
          className="absolute bottom-[10vh] z-20 w-full px-6"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-y-6 sm:grid-cols-4">
            {SPECS.map((spec) => (
              <div key={spec.label} className="text-center">
                <div className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-ink [text-shadow:0_1px_12px_rgba(251,251,253,0.9)]">
                  {spec.value}
                </div>
                <div className="mt-1 text-[12px] font-medium uppercase tracking-wide text-ink-secondary [text-shadow:0_1px_10px_rgba(251,251,253,0.9)]">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
