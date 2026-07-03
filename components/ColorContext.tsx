"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ColorId = "midnight" | "pearl" | "storm";

type ColorCtx = {
  color: ColorId;
  setColor: (c: ColorId) => void;
};

const ColorContext = createContext<ColorCtx | null>(null);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ColorId>("midnight");
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return ctx;
}
