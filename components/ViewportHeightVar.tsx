"use client";

import { useEffect } from "react";

// Mobile Chrome (and Chromium-based in-app browsers like Telegram's) can
// actually resize `window.innerHeight` while the address bar hides/shows
// mid-scroll — unlike iOS Safari, which mostly doesn't reflow the layout
// viewport for this. Our pinned sections are hundreds of svh tall, so if a
// browser's viewport-unit support is inconsistent, that live resize forces a
// layout recalculation of every one of them *during* the scroll gesture,
// which reads as violent jumps between sections (worst when scrolling up,
// since that's when the bar reappears).
//
// The fix predates svh/dvh: freeze the viewport height in a CSS variable via
// JS, updated only on resize/orientation change — never on scroll — so
// section heights stay put for the whole gesture regardless of toolbar
// animation or viewport-unit quirks in a given WebView.
export default function ViewportHeightVar() {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setVh, 150);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", setVh);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []);

  return null;
}
