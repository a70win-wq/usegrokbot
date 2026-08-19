"use client";

import { LocaleProvider } from "@/lib/i18n";
import { CursorBot } from "./CursorBot";
import { SavedProvider } from "./saved";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SavedProvider>
        {children}
        <CursorBot />
      </SavedProvider>
    </LocaleProvider>
  );
}
