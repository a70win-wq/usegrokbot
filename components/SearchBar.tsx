"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LocaleLink } from "@/components/LocaleLink";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchDiscoverStories } from "@/data/discover";
import { scenarios } from "@/data/scenarios";
import { topicMessageKey, topics } from "@/data/topics";
import { cn } from "@/lib/cn";
import { localizeDiscoverStory, localizeScenario, useI18n } from "@/lib/i18n";

type SearchBarProps = {
  variant?: "hero" | "inline";
  initialQuery?: string;
  onQueryChange?: (value: string) => void;
  autoFocus?: boolean;
  stayOnPage?: boolean;
};

export function SearchBar({
  variant = "hero",
  initialQuery = "",
  onQueryChange,
  autoFocus,
  stayOnPage = false,
}: SearchBarProps) {
  const router = useRouter();
  const { locale, t, list, localizeHref } = useI18n();
  const suggestions = list("searchSuggestions");
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(suggestions[0] ?? "");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [modKey, setModKey] = useState("⌘");
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setPlaceholder(suggestions[0] ?? "");
  }, [locale, suggestions]);

  useEffect(() => {
    if (query) return;
    let index = 0;
    const id = window.setInterval(() => {
      index = (index + 1) % Math.max(suggestions.length, 1);
      setPlaceholder(suggestions[index] ?? "");
    }, 4000);
    return () => window.clearInterval(id);
  }, [query, suggestions]);

  useEffect(() => {
    function onDoc(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    setModKey(/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl");
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const isMod = event.metaKey || event.ctrlKey;
      if (!isMod || event.key.toLowerCase() !== "k") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const stories = useMemo(() => {
    return searchDiscoverStories(query, 6).map((item) => ({
      localized: localizeDiscoverStory(item, locale),
      href: item.xPostUrl ?? item.sourceUrl,
      external: true,
    }));
  }, [query, locale]);

  const matchingTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return topics
      .filter((topic) => {
        const name = t(topicMessageKey(topic.slug));
        return (
          topic.slug.includes(q) ||
          name.toLowerCase().includes(q) ||
          topic.name.toLowerCase().includes(q) ||
          topic.description.toLowerCase().includes(q)
        );
      })
      .slice(0, 3);
  }, [query, t]);

  const matchingScenarios = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return scenarios
      .map((item) => localizeScenario(item, locale))
      .filter((item) => {
        const source = scenarios.find((entry) => entry.slug === item.slug);
        const haystack = [
          item.slug,
          item.title,
          item.short,
          item.oneLiner,
          item.does,
          item.who,
          source?.title,
          source?.short,
          source?.oneLiner,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 3);
  }, [query, locale]);

  const trimmed = query.trim();
  function resultsPath(value: string) {
    return `/?q=${encodeURIComponent(value)}`;
  }
  const showResults = variant === "hero" && open && trimmed.length > 0;
  const showSuggestions = variant === "hero" && open && trimmed.length === 0;
  const menuItems = showResults
    ? [
        ...matchingScenarios.map((item) => ({
          href: `/use-cases/${item.slug}`,
          title: item.title,
          detail: t("nav.useCases"),
          external: false,
        })),
        ...matchingTopics.map((topic) => ({
          href: `/categories/${topic.slug}`,
          title: t(topicMessageKey(topic.slug)),
          detail: t("nav.categories"),
          external: false,
        })),
        ...stories.map((item) => ({
          href: item.href,
          title: item.localized.title,
          detail: item.localized.headline,
          external: true,
        })),
      ]
    : showSuggestions
      ? suggestions.map((item) => ({
          href: stayOnPage ? "/" : resultsPath(item),
          title: item,
          detail: "",
          external: false,
        }))
      : [];

  function update(value: string) {
    setQuery(value);
    onQueryChange?.(value);
    setOpen(true);
    setActiveIndex(-1);
  }

  function goToQuery(value = trimmed) {
    if (stayOnPage) {
      onQueryChange?.(value);
      setOpen(false);
      return;
    }
    router.push(localizeHref(resultsPath(value)));
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => Math.min(current + 1, menuItems.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, -1));
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (event.key === "Enter") {
      const selected = menuItems[activeIndex];
      if (selected) {
        event.preventDefault();
        if (stayOnPage && showSuggestions) {
          onQueryChange?.(selected.title);
          setQuery(selected.title);
          setOpen(false);
          return;
        }
        if (selected.external) {
          window.open(selected.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(localizeHref(selected.href));
        }
        setOpen(false);
        return;
      }
      goToQuery();
    }
  }

  return (
    <div ref={boxRef} className={cn("relative w-full", variant === "hero" && "max-w-[720px]")}>
      <label className="sr-only" htmlFor={`search-${variant}`}>
        {t("search.label")}
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-faint" />
      <input
        ref={inputRef}
        id={`search-${variant}`}
        value={query}
        autoFocus={autoFocus}
        onChange={(event) => update(event.target.value)}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={query ? undefined : placeholder}
        className={cn(
          "w-full border border-line bg-elevated pr-16 pl-12 text-[15px] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200",
          variant === "hero"
            ? "search-field-hero h-14 rounded-full focus:border-line-strong"
            : "h-12 rounded-full focus:border-line-strong",
        )}
      />
      <span className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-md border border-line bg-card px-1.5 py-0.5 font-mono text-[11px] text-faint md:inline">
        {modKey}K
      </span>

      {showResults || showSuggestions ? (
        <div className="search-menu absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-line bg-card">
          {showSuggestions ? (
            <p className="px-4 pt-3 pb-1 text-[12px] text-faint">{t("search.try")}</p>
          ) : null}
          {showResults && stories.length === 0 && matchingTopics.length === 0 && matchingScenarios.length === 0 ? (
            <div className="px-4 py-5 text-sm text-mute">
              {t("search.empty")}
              <p className="mt-1 text-faint">{t("search.emptyHint")}</p>
            </div>
          ) : (
            <ul>
              {menuItems.map((item, index) => {
                const filterOnly = stayOnPage && showSuggestions;
                const className = cn(
                  "block w-full px-4 py-3 text-left transition hover:bg-card-hover",
                  activeIndex === index && "bg-card-hover",
                );
                return (
                  <li key={item.href + item.title}>
                    {filterOnly ? (
                      <button
                        type="button"
                        className={className}
                        onClick={() => {
                          onQueryChange?.(item.title);
                          setQuery(item.title);
                          setOpen(false);
                        }}
                      >
                        <div className="text-sm font-medium text-ink">{item.title}</div>
                      </button>
                    ) : item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className={className}
                        onClick={() => setOpen(false)}
                      >
                        <div className="text-sm font-medium text-ink">{item.title}</div>
                        {item.detail ? (
                          <div className="mt-0.5 line-clamp-1 text-[13px] text-mute">{item.detail}</div>
                        ) : null}
                      </a>
                    ) : (
                      <LocaleLink
                        href={item.href}
                        className={className}
                        onClick={() => setOpen(false)}
                      >
                        <div className="text-sm font-medium text-ink">{item.title}</div>
                        {item.detail ? (
                          <div className="mt-0.5 line-clamp-1 text-[13px] text-mute">{item.detail}</div>
                        ) : null}
                      </LocaleLink>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {showResults ? (
            stayOnPage ? (
              <button
                type="button"
                className="block w-full border-t border-line px-4 py-2.5 text-left text-[13px] text-ink"
                onClick={() => {
                  onQueryChange?.(trimmed);
                  setOpen(false);
                }}
              >
                {t("search.seeStories")}
              </button>
            ) : (
              <LocaleLink
                href={resultsPath(trimmed)}
                className="block border-t border-line px-4 py-2.5 text-[13px] text-ink"
                onClick={() => setOpen(false)}
              >
                {t("search.seeAll")}
              </LocaleLink>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
