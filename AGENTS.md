<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Verify in ego-browser before asking Chris to try

Chris's rule, not optional.

After any UI, copy, i18n, routing, or local-dev change:

1. Open the app yourself in **ego-browser** (`ego-browser nodejs`, not curl-only, not a screenshot-only glance).
2. Click through the changed flow the way a user would. Check desktop and mobile if layout changed. Open the Next.js N badge if it appears and fix the issue.
3. Only after that passes may you tell Chris the local URL is ready.

Do **not** ask Chris to try, refresh, or "see if it works" until you have already done this. If local will not load, fix it first.

Never use overflow-x-auto for catalogs, chip rows, or nav lists.
