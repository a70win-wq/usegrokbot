<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

Single Next.js 16 App Router site (React 19, Tailwind 4, Turbopack); npm is the package manager (`package-lock.json`). There is no database or external service to run — the site is served entirely from local structured content under `data/`.

- Dev server: `npm run dev` (Turbopack) serves on `http://localhost:3000`. `/` 307-redirects to a locale prefix (`/en`, `/zh-hk`, `/zh-cn`); browse `/en` directly. Standard scripts live in `package.json`; run/verify commands are documented in `README.md` and `CONTRIBUTING.md`.
- `npm run lint` currently exits non-zero due to pre-existing `react-hooks/set-state-in-effect` errors in a few components — not from your changes. CI (`.github/workflows/ci.yml`) does not run lint; it runs `npx tsc --noEmit`, `validate:discover`, and `validate:prompts`. `CONTRIBUTING.md` still asks contributors to run `npm run lint` and `npm run build` before submitting.
- Environment variables are optional and only needed for ingestion/`/api/ingest` (e.g. `INGEST_BOT_TOKEN`, `INGEST_GITHUB_TOKEN`/`GITHUB_TOKEN`, AI Gateway for `INGEST_MODEL`). None are required to build, lint, type-check, or run the site locally.
- Non-obvious routing: `next.config.ts` redirects several top-level routes (`/use-cases`, `/use-cases/:slug`, `/prompts`, `/saved`, `/discover`, `/learn`, `/apps`) back to the locale home. Because of this, the `UseCaseCard`/`SaveButton` (heart) workflow cards are not reachable from `/use-cases`; they render on category pages, the Saved page, and discover detail pages. Homepage search is a typeahead dropdown of live results (categories + X posts) that navigates on click.
