"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Sound", href: "#sound" },
  { label: "Colors", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Specs", href: "#specs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Active section = the one currently under the middle of the viewport
      // (the last section whose top has crossed the centre line).
      const marker = window.innerHeight * 0.5;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out-expo ${
          scrolled
            ? "border-b border-divider/70 bg-canvas/95 md:bg-canvas/80 md:backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
          <a
            href="#top"
            className="text-[19px] font-semibold tracking-tighter text-ink"
            aria-label="Velv home"
          >
            Velv
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`relative text-[13px] font-medium transition-colors ${
                      isActive
                        ? "text-ink"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                        className="absolute -bottom-1.5 left-0 right-0 mx-auto h-1 w-1 rounded-full bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href="#pricing"
              className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Buy
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px]">
              <span
                className={`h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-b border-divider bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-content flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-[15px] font-medium text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#pricing"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full bg-ink px-4 py-2.5 text-center text-[15px] font-medium text-white"
                >
                  Buy
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
