"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const VARIANTS = [
  { id: "midnight", name: "Midnight", swatch: "#2A2A2E", image: "/images/midnight-two.png" },
  { id: "pearl", name: "Pearl", swatch: "#F0EDE8", image: "/images/pearl-two.png" },
  { id: "storm", name: "Storm", swatch: "#8C8C96", image: "/images/storm-two.png" },
] as const;

const INCLUDED = [
  "Velv open-fit earbuds",
  "USB-C charging case",
  "24-hour battery life",
  "2-year warranty",
  "Free 30-day returns",
];

export default function Pricing() {
  const [active, setActive] = useState(0);
  const variant = VARIANTS[active];

  return (
    <section id="pricing" className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-accent">
            Get yours
          </p>
          <h2 className="mt-4 text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.03] tracking-tighter text-ink">
            One price. Every color.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mx-auto mt-14 grid max-w-4xl overflow-hidden rounded-[36px] border border-divider bg-white md:grid-cols-2"
        >
          {/* Product preview */}
          <div className="relative flex min-h-[340px] items-center justify-center bg-section p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="relative h-56 w-full"
              >
                <Image
                  src={variant.image}
                  alt={`Velv earbuds in ${variant.name}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-contain drop-shadow-[0_24px_40px_rgba(20,20,40,0.12)]"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
              {VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActive(i)}
                  aria-label={v.name}
                  aria-pressed={active === i}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <span
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: v.swatch }}
                  />
                  {active === i && (
                    <motion.span
                      layoutId="price-swatch-ring"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute inset-0 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-section"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <div className="flex items-baseline gap-2">
              <span className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold tracking-tighter text-ink">
                $149
              </span>
              <span className="text-[15px] text-ink-muted line-through">$179</span>
            </div>
            <p className="mt-1 text-[14px] text-ink-secondary">
              In {variant.name}. Ships free in 2 days.
            </p>

            <ul className="mt-7 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <svg
                    className="h-5 w-5 flex-none text-accent"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 10.5l3.2 3.2L15 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15px] text-ink">{item}</span>
                </li>
              ))}
            </ul>

            <button className="mt-9 w-full rounded-full bg-ink py-4 text-[15px] font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Add to bag — $149
            </button>
            <p className="mt-3 text-center text-[12.5px] text-ink-muted">
              Or 4 interest-free payments of $37.25
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
