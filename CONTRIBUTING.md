# Contributing to UseGrokBot

Thanks for helping people see how Grok Bot is actually used.

## Ways to help

1. [Submit a use case](https://usegrokbot.com/submit) — paste a public X post.
2. Open a pull request that adds or fixes a discover story, workflow, integration, or translation.
3. Fix copy, bugs, or mobile UX.

## Submit a use case

The form only asks for:

- X post URL (required)
- Prompt (optional)
- Notes (optional)

Everything else should come from the source: author, @handle, date, title, what they built, apps, category, and result or output.

## Adding a discover story

Stories live in `data/discover.ts`.

Required:

- Real public source URL
- Author name
- @handle when the source has one
- Published date
- Result **or** Output
- Integrations
- Trust status: Official, Tested, or Community

Rules:

- Do not invent X authors, handles, or tweet IDs.
- Only set `xPostUrl` when you have a real public permalink.
- Only write a Result number if the original post has that number.
- If there is no number, use Output.
- Do not mark a story Tested unless UseGrokBot actually ran the Bot.
- UseGrokBot is the curator. The original author stays the source.

## Workflows

Ready-to-build guides live in `data/use-cases/`.

If a workflow is inspired by a public example, link it with `relatedUseCase` on the discover story and keep an Inspired by line on the workflow page.

## Translations

English is the source copy. Then:

- `zh-Hant` for `zh-hk`
- `zh-Hans` for `zh-cn`

Keep the same keys in `lib/i18n/messages.ts`.

## Pull requests

- One change per PR when you can
- Do not commit `.env`, API keys, or secrets
- Do not add affiliate claims or fake testimonials
