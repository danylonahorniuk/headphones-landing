import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBFBFD",
        section: "#F5F5F7",
        divider: "#E8E8ED",
        ink: {
          DEFAULT: "#1D1D1F",
          secondary: "#6E6E73",
          muted: "#AEAEB2",
        },
        accent: {
          DEFAULT: "#0A84FF",
          tint: "#E3F0FF",
          deep: "#0060DF",
        },
        velv: {
          midnight: "#2A2A2E",
          pearl: "#F0EDE8",
          storm: "#8C8C96",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
