"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {subscribed ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3.5"
          >
            <svg className="h-5 w-5 flex-none text-accent" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path
                d="M5 10.5l3.2 3.2L15 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[14px] text-white/80">
              Thanks — you&apos;re on the list.
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            noValidate
          >
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[14px] text-white placeholder:text-white/55 outline-none transition-colors focus:border-white/40"
              />
              <button
                type="submit"
                className="flex-none rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-ink transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Subscribe
              </button>
            </div>
            <div className="h-5 pl-5 pt-2">
              {error && (
                <span className="text-[12.5px] text-red-400">{error}</span>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

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

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <h3 className="text-[22px] font-semibold tracking-tight">
              Stay in the loop.
            </h3>
            <p className="mt-2 max-w-sm text-[14px] text-white/55">
              Early access, new colors, and the occasional offer. No spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="text-[22px] font-semibold tracking-tighter">Velv</div>
            <p className="mt-3 max-w-[200px] text-[13px] leading-relaxed text-white/55">
              Open-fit earbuds for people who like to hear the world.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-white/55">
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
          <p className="text-[13px] text-white/55">
            © {new Date().getFullYear()} Velv. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[13px] text-white/55 transition-colors hover:text-white/70"
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
