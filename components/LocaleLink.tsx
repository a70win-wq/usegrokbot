"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/lib/i18n";

export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { localizeHref } = useI18n();
  const nextHref = typeof href === "string" ? localizeHref(href) : href;
  return <Link href={nextHref} {...props} />;
}
