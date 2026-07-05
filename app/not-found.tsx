import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found — Velv",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-6 text-center">
      {/* Ambient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#ffffff_0%,#f3f4f8_60%,#eceef3_100%)]" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="text-[19px] font-semibold tracking-tighter text-ink">
          Velv
        </span>

        <p className="mt-12 text-[clamp(4rem,14vw,9rem)] font-semibold leading-none tracking-tightest text-ink">
          404
        </p>
        <h1 className="mt-4 text-balance text-[clamp(1.5rem,4vw,2.25rem)] font-semibold tracking-tighter text-ink">
          This page slipped out.
        </h1>
        <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ink-secondary">
          The page you're looking for doesn't exist or has moved. Let's get
          you back to the good stuff.
        </p>

        <div className="mt-9 flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-[14px] font-semibold text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Back home
          </Link>
          <Link
            href="/#pricing"
            className="rounded-full border border-divider px-6 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-section"
          >
            Shop Velv
          </Link>
        </div>
      </div>
    </main>
  );
}
