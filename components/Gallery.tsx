"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";
import { useColor, type ColorId } from "@/components/ColorContext";

const COLORS: {
  id: ColorId;
  name: string;
  swatch: string;
  image: string;
  desc: string;
}[] = [
  {
    id: "midnight",
    name: "Midnight",
    swatch: "#2A2A2E",
    image: "/images/midnight-on-top-of-the-case.png",
    desc: "Deep gloss black that disappears against anything.",
  },
  {
    id: "pearl",
    name: "Pearl",
    swatch: "#F0EDE8",
    image: "/images/pearl-on-top-of-the-case.png",
    desc: "Warm off-white with a soft matte finish.",
  },
  {
    id: "storm",
    name: "Storm",
    swatch: "#8C8C96",
    image: "/images/storm-on-top-of-the-case.png",
    desc: "Cool metallic grey for an understated look.",
  },
];

export default function Gallery() {
  const { color, setColor } = useColor();
  const active = COLORS.find((c) => c.id === color) ?? COLORS[0];

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
                key={active.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                className="relative h-[80%] w-[min(80vw,460px)]"
              >
                <Image
                  src={active.image}
                  alt={`Velv earbuds in ${active.name}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 460px"
                  className="object-contain drop-shadow-[0_30px_50px_rgba(20,20,40,0.12)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selection panel */}
          <div className="flex flex-col items-center gap-6 px-6 pb-10">
            {/* Name + description */}
            <div className="min-h-[64px] text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[18px] font-semibold text-ink">
                    {active.name}
                  </div>
                  <p className="mt-1 text-[14px] text-ink-secondary">
                    {active.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swatch picker */}
            <div className="flex items-center justify-center gap-4">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  aria-label={c.name}
                  aria-pressed={active.id === c.id}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <span
                    className="h-7 w-7 rounded-full border border-black/10"
                    style={{ backgroundColor: c.swatch }}
                  />
                  {active.id === c.id && (
                    <motion.span
                      layoutId="swatch-ring"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute inset-0 rounded-full ring-2 ring-ink ring-offset-2 ring-offset-section"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Follow-through CTA */}
            <a
              href="#pricing"
              className="group mt-1 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              <span>Buy in {active.name} — $149</span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
