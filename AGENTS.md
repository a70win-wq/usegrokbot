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

# Reply to Chris in written Traditional Chinese

Chris's rule, not optional.

Use 繁體中文書面語 (written Traditional Chinese). Do not use simplified Chinese characters. Do not use 粵語口語 (Cantonese colloquial): no 呢隻、咩、唔好、而家、嗰、啲 as the reply register.

# How to talk about a bot

Chris's rule, not optional.

A bot is a helper. Describe **what the bot helps you do**. Do not call that a 工, 工作, or job in Chinese.

- Say: 這隻 bot 幫你做什麼
- Do not say: 這份工、第一份工、交一份工、一份有完成定義的工

English product words like job, role, and use case stay English in code and official labels. When explaining to Chris or writing Chinese copy, translate the *purpose*, not the word job.

# Keep all visible text readable on desktop and mobile

Chris's rule, not optional.

本專案所有可見文字，必須在電腦和手機上都清晰可讀。

Every page and component in this project must remain comfortably readable at 100% zoom on both desktop and a 390px mobile viewport.

- Important numbers, ranks, and step numbers must be at least 16px.
- Body text, buttons, and form values must be at least 15px.
- Supporting labels, badges, captions, and metadata must be at least 12px with clear contrast.
- Never combine very small text with a faint color or wide letter spacing.
- After changing any visible text, verify the rendered font sizes and contrast in ego-browser on desktop and mobile. Passing code checks alone is not enough.
