"use client";

import { LocaleProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { BootScreen } from "./BootScreen";
import { CursorBot } from "./CursorBot";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        {children}
        <CursorBot />
        <BootScreen />
      </LocaleProvider>
    </ThemeProvider>
  );
}
