"use client";

import { Theme } from "@carbon/react";
import { createContext, useContext, useState, useCallback } from "react";

const ThemeContext = createContext<{
  dark: boolean;
  toggle: () => void;
}>({ dark: false, toggle: () => {} });

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const toggle = useCallback(() => setDark((d) => !d), []);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <Theme theme={dark ? "g100" : "white"}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
}
