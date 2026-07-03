"use client";

import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

const COLUMNS = [
  {
    title: "Product",
    links: ["Overview", "Features", "Sound", "Colors", "Specs"],
  },
  {
    title: "Support",
    links: ["Help center", "Warranty", "Returns", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Sustainability", "Press", "Careers"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Final CTA */}
      <div className="border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="mx-auto max-w-content px-6 py-24 text-center sm:py-32"
        >
          <h2 className="text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-tightest">
            Free your ears.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[17px] text-white/60">
            Sound that fits. Comfort that lasts. Starting at $149.
          </p>
          <a
            href="#pricing"
            className="mt-9 inline-block rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Buy Velv
          </a>
        </motion.div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-[22px] font-semibold tracking-tighter">Velv</div>
            <p className="mt-3 max-w-[200px] text-[13px] leading-relaxed text-white/45">
              Open-fit earbuds for people who like to hear the world.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] text-white/70 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} Velv. A portfolio concept.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-white/40 transition-colors hover:text-white/70"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
