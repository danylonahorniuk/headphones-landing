"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const COLORS = [
  {
    id: "midnight",
    name: "Midnight",
    swatch: "#2A2A2E",
    image: "/images/midnight-on-top-of-the-case.png",
  },
  {
    id: "pearl",
    name: "Pearl",
    swatch: "#F0EDE8",
    image: "/images/pearl-on-top-of-the-case.png",
  },
  {
    id: "storm",
    name: "Storm",
    swatch: "#8C8C96",
    image: "/images/storm-on-top-of-the-case.png",
  },
] as const;

export default function Gallery() {
  const [active, setActive] = useState(0);
  const color = COLORS[active];

  return (
    <section id="gallery" className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            Colors
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            Pick your finish.
          </h2>
        </motion.div>

        <div className="mt-14 overflow-hidden rounded-[36px] bg-section">
          {/* Stage */}
          <div className="relative flex h-[440px] items-center justify-center sm:h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={color.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="relative h-[80%] w-[min(80vw,460px)]"
              >
                <Image
                  src={color.image}
                  alt={`Velv earbuds in ${color.name}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 460px"
                  className="object-contain drop-shadow-[0_30px_50px_rgba(20,20,40,0.12)]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Color name */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={color.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[15px] font-medium text-ink-secondary"
                >
                  {color.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Swatch picker */}
          <div className="flex items-center justify-center gap-4 pb-10">
            {COLORS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                aria-label={c.name}
                aria-pressed={active === i}
                className="relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <span
                  className="h-7 w-7 rounded-full border border-black/10"
                  style={{ backgroundColor: c.swatch }}
                />
                {active === i && (
                  <motion.span
                    layoutId="swatch-ring"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute inset-0 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-section"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
