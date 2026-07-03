"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeOutExpo, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const QUOTES = [
  {
    quote:
      "First earbuds I can wear for eight hours straight. I genuinely forget they're in.",
    name: "Maya R.",
    role: "Product designer",
  },
  {
    quote:
      "The open fit means I still hear the room. Perfect for the office and on a run.",
    name: "Daniel K.",
    role: "Marathoner",
  },
  {
    quote: "Calls sound like I'm holding a phone to my ear. My team noticed.",
    name: "Priya S.",
    role: "Remote lead",
  },
  {
    quote:
      "I switched from in-ear buds that always ached by lunch. These just don't.",
    name: "Tomasz W.",
    role: "Software engineer",
  },
  {
    quote:
      "Battery easily gets me through a full workday of calls and music. No anxiety.",
    name: "Elena V.",
    role: "Consultant",
  },
  {
    quote:
      "They look understated but sound huge. The finish feels genuinely premium.",
    name: "Marcus L.",
    role: "Photographer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-section py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        {/* Lifestyle band */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-5"
        >
          <motion.div
            variants={fadeUp}
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:col-span-3 sm:aspect-auto"
          >
            <Image
              src="/images/lifestyle-relax.png"
              alt="A person relaxing while wearing Velv earbuds"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 max-w-xs">
              <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-tight text-white">
                Comfort you stop noticing.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:col-span-2 sm:aspect-auto"
          >
            <Image
              src="/images/lifestyle-ear.png"
              alt="Close-up of a Velv earbud in the ear"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Quotes */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {QUOTES.map((q) => (
            <motion.figure
              variants={fadeUp}
              key={q.name}
              className="flex flex-col justify-between rounded-[24px] border border-divider bg-canvas p-7"
            >
              <blockquote className="text-[16px] leading-relaxed text-ink">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <div className="text-[14px] font-semibold text-ink">
                  {q.name}
                </div>
                <div className="text-[13px] text-ink-muted">{q.role}</div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
