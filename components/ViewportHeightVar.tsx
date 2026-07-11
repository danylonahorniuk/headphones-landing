"use client";

import { useEffect, useRef } from "react";

// WHY THIS EXISTS (confirmed from a screen recording, 2026-07-08):
// In-app browsers on iOS (Telegram, Chrome) physically RESIZE the WKWebView
// when they show/hide their toolbar on scroll. That changes the viewport
// height, so every CSS viewport unit (svh/vh/dvh) recomputes — and because
// our pinned sections are 300-340 viewport-heights tall, the whole document
// reflows mid-scroll and the scroll position lands in a different section.
// The result is the page violently "jumping between sections" when scrolling
// up (which is when the toolbar reappears). Real Safari.app overlays its
// toolbar without resizing the layout viewport, so it never reflows — which
// is why the bug only shows up in the in-app browsers.
//
// No CSS unit is safe (they all track the resized webview), so we freeze the
// height in a `--vh` custom property via JS and — critically — only update it
// when the *width* changes (a real resize / rotation). A toolbar show/hide
// only changes height, so gating on width keeps `--vh` frozen through the
// whole scroll gesture and the sections never reflow.
export default function ViewportHeightVar() {
  const lastWidth = useRef<number | null>(null);

  useEffect(() => {
    const setVh = () => {
      lastWidth.current = window.innerWidth;
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();

    const onResize = () => {
      // Ignore height-only changes — that's the toolbar animating, not a
      // real resize. Reflowing here is exactly what causes the jump.
      if (window.innerWidth === lastWidth.current) return;
      setVh();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", setVh);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  return null;
}
