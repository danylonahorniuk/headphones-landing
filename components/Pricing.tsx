"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useColor, type ColorId } from "@/components/ColorContext";

const VARIANTS: {
  id: ColorId;
  name: string;
  swatch: string;
  image: string;
}[] = [
  { id: "midnight", name: "Midnight", swatch: "#2A2A2E", image: "/images/midnight-two.png" },
  { id: "pearl", name: "Pearl", swatch: "#F0EDE8", image: "/images/pearl-two.png" },
  { id: "storm", name: "Storm", swatch: "#8C8C96", image: "/images/storm-two.png" },
];

const INCLUDED = [
  "Velv open-fit earbuds",
  "USB-C charging case",
  "24-hour battery life",
  "2-year warranty",
  "Free 30-day returns",
];

export default function Pricing() {
  const { color, setColor } = useColor();
  const variant = VARIANTS.find((v) => v.id === color) ?? VARIANTS[0];
  const [added, setAdded] = useState(false);

  const handleBuy = () => {
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2800);
  };

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
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setColor(v.id)}
                  aria-label={v.name}
                  aria-pressed={variant.id === v.id}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <span
                    className="h-6 w-6 rounded-full border border-black/10"
                    style={{ backgroundColor: v.swatch }}
                  />
                  {variant.id === v.id && (
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

            <button
              onClick={handleBuy}
              disabled={added}
              className={`mt-9 flex h-[52px] w-full items-center justify-center overflow-hidden rounded-full text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 ${
                added
                  ? "bg-accent"
                  : "bg-ink hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="done"
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.28, ease: easeOutExpo }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
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
                    Added to bag
                  </motion.span>
                ) : (
                  <motion.span
                    key="buy"
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.28, ease: easeOutExpo }}
                  >
                    Buy now — $149
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="relative mt-3 h-4 text-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={added ? "demo" : "installments"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-x-0 text-[12.5px] text-ink-muted"
                >
                  {added
                    ? "Demo checkout — no payment was taken."
                    : "Or 4 interest-free payments of $37.25"}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
