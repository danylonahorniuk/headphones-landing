"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const FAQS = [
  {
    q: "Will open-fit earbuds stay in during exercise?",
    a: "Yes. Velv's shell is contoured to rest securely against the ear's ridge. They're rated IPX4 for sweat and light rain, so they hold up through runs and workouts.",
  },
  {
    q: "How is the bass without silicone tips?",
    a: "Our 12mm drivers are tuned specifically for open-fit acoustics, with adaptive EQ that compensates in real time. You get full, warm low-end without sealing your ear canal.",
  },
  {
    q: "What's the battery life?",
    a: "Six hours on a single charge, and 24 hours total with the USB-C charging case. A 10-minute quick charge gives you about two hours of listening.",
  },
  {
    q: "Do they work with both iPhone and Android?",
    a: "Absolutely. Velv pairs over Bluetooth 5.3 with any device. Multipoint lets you stay connected to two devices at once.",
  },
  {
    q: "What's your return policy?",
    a: "Try Velv for 30 days. If they're not for you, send them back for a full refund — returns are always free.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-divider">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="text-[17px] font-medium text-ink">{q}</span>
        <span className="relative flex h-6 w-6 flex-none items-center justify-center">
          <span className="absolute h-[1.5px] w-3.5 bg-ink" />
          <motion.span
            animate={{ rotate: open ? 0 : 90 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="absolute h-[1.5px] w-3.5 bg-ink"
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-[15.5px] leading-relaxed text-ink-secondary">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="bg-canvas py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="text-center text-[clamp(2rem,4.5vw,3rem)] font-semibold tracking-tighter text-ink"
        >
          Questions, answered.
        </motion.h2>

        <div className="mt-14 border-t border-divider">
          {FAQS.map((f) => (
            <Item key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
