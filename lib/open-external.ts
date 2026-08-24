export function openExternalUrl(href: string, event?: { preventDefault(): void; stopPropagation(): void }) {
  event?.stopPropagation();
  // A real <a target="_blank" rel="noopener noreferrer"> click should keep
  // its default. window.open(..., "noopener") returns null even when the
  // tab opened, and treating that as a blocked popup used to navigate this page.
  if (event) return;
  const opened = window.open(href, "_blank");
  if (opened) opened.opener = null;
}
