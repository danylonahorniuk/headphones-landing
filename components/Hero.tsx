"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Headline fades/lifts away as you scroll in
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.28], [0, -60]);

  // Closed case: visible at start, fades out mid-scroll
  const closedOpacity = useTransform(scrollYProgress, [0.12, 0.42], [1, 0]);
  // Open case: fades in as closed fades out, then settles
  const openOpacity = useTransform(scrollYProgress, [0.34, 0.6], [0, 1]);

  // Whole product gently scales up through the scroll
  const productScale = useTransform(scrollYProgress, [0, 0.7], [0.86, 1.04]);
  const productY = useTransform(scrollYProgress, [0, 0.7], [20, -10]);

  // Closing caption fades in at the end
  const captionOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.55, 0.8], [24, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Ambient gradient wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#f3f4f8_55%,#eceef3_100%)]" />

        {/* Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute top-[16vh] z-20 px-6 text-center"
        >
          <h1 className="text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tightest text-ink">
            Free your ears.
          </h1>
          <p className="mt-5 text-[clamp(1rem,2.2vw,1.375rem)] font-medium text-ink-secondary">
            Sound that fits.
          </p>
        </motion.div>

        {/* Product stack */}
        <motion.div
          style={{ scale: productScale, y: productY }}
          className="relative z-10 mt-[8vh] h-[52vh] w-[min(90vw,620px)]"
        >
          <motion.div style={{ opacity: closedOpacity }} className="absolute inset-0">
            <Image
              src="/images/midnight-case-closed.png"
              alt="Velv charging case, closed"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 620px"
              className="object-contain drop-shadow-[0_40px_60px_rgba(20,20,40,0.14)]"
            />
          </motion.div>
          <motion.div style={{ opacity: openOpacity }} className="absolute inset-0">
            <Image
              src="/images/midnight-case-open.png"
              alt="Velv earbuds resting in the open case"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 620px"
              className="object-contain drop-shadow-[0_40px_60px_rgba(20,20,40,0.16)]"
            />
          </motion.div>
        </motion.div>

        {/* Closing caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute bottom-[12vh] z-20 max-w-md px-6 text-center text-[15px] leading-relaxed text-ink-secondary"
        >
          Open-fit design. No silicone tips. Just sound that sits comfortably,
          all&nbsp;day.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: headlineOpacity }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
          aria-hidden
        >
          <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-ink-muted/50 p-1.5">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-ink-muted"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
