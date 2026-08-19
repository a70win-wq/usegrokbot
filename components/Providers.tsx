"use client";

import { LocaleProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { CursorBot } from "./CursorBot";
import { SavedProvider } from "./saved";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <SavedProvider>
          {children}
          <CursorBot />
        </SavedProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
