"use client";

import { useCallback, useState } from "react";

export function useTapFeedback() {
  const [active, setActive] = useState(false);

  const trigger = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() => setActive(true));
  }, []);

  return {
    className: active ? "tap-feedback" : undefined,
    trigger,
    onAnimationEnd: () => setActive(false),
  };
}
