"use client";

import { useEffect, useRef, useState } from "react";

// Temporary diagnostic overlay. Enable by visiting the site with `?debug=1`.
// It writes live scroll + viewport metrics straight to the DOM (no React
// re-renders, no blur/shadow) so it doesn't add jank that would taint the
// measurement. Recording this while scrolling up on the phone tells us:
//   • Δ — per-frame scrollY change. A slow drag should show small Δ; a
//     "jump between sections" shows Δ spiking to hundreds/thousands in one
//     frame. maxΔ keeps the worst value even if you miss it live.
//   • ih / vv — window.innerHeight (layout viewport) vs visualViewport.height
//     (actually-visible area). If either changes at the same instant Δ
//     spikes, the URL/toolbar resize is the trigger.
//   • sh — total scrollHeight. If it changes mid-scroll, section heights are
//     reflowing.
export default function ScrollDebug() {
  const [on, setOn] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Enable only with ?debug in the URL.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (new URLSearchParams(window.location.search).has("debug")) setOn(true);
  }, []);

  // Wire up the listeners only once the overlay div is actually mounted, so
  // boxRef is available for the very first paint.
  useEffect(() => {
    if (!on) return;

    let lastY = window.scrollY;
    let maxJump = 0;
    let ticking = false;

    const render = () => {
      ticking = false;
      const y = window.scrollY;
      const d = y - lastY;
      lastY = y;
      if (Math.abs(d) > Math.abs(maxJump)) maxJump = d;
      const vv = window.visualViewport;
      const el = boxRef.current;
      if (!el) return;
      el.textContent =
        `y ${Math.round(y)}  Δ ${Math.round(d)}  maxΔ ${Math.round(maxJump)}\n` +
        `ih ${window.innerHeight}  vv ${vv ? Math.round(vv.height) : "-"}  ` +
        `vtop ${vv ? Math.round(vv.offsetTop) : "-"}\n` +
        `sh ${document.documentElement.scrollHeight}`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("scroll", onScroll);
    };
  }, [on]);

  if (!on) return null;

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: 8,
        left: 8,
        zIndex: 99999,
        whiteSpace: "pre",
        font: "600 13px/1.35 ui-monospace, Menlo, monospace",
        color: "#0f0",
        background: "rgba(0,0,0,0.82)",
        padding: "8px 10px",
        borderRadius: 8,
        pointerEvents: "auto",
      }}
      // tap the box to reset maxΔ
    />
  );
}
