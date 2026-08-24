export function openExternalUrl(href: string, event?: { preventDefault(): void; stopPropagation(): void }) {
  event?.preventDefault();
  event?.stopPropagation();
  const opened = window.open(href, "_blank", "noopener,noreferrer");
  if (!opened) window.location.assign(href);
}
