"use client";

import { useEffect, useRef } from "react";

// Mobile browsers fire `resize` when the address bar hides/shows during a
// scroll gesture — on BOTH iOS Safari and Android Chrome/WebView — even
// though only the height changed, not the width. Our pinned sections are
// hundreds of viewport-heights tall, so reacting to that resize (even after
// a debounce) recalculates every one of them *while the user is mid-scroll*,
// which reads as the page jumping between sections.
//
// The fix: only update `--vh` when the *width* changes. A toolbar
// show/hide never changes width — only a real resize or orientation change
// does — so this reliably tells the two apart without needing to guess at
// a height-delta threshold.
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
