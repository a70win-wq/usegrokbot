# Contributing to UseGrokBot

Thanks for helping people discover how Grok Bot is actually being used.

UseGrokBot is built around one rule:

> **Curate, explain, attribute, and link back.**

## Ways to contribute

You can help by:

1. Adding a real public Grok Bot example.
2. Adding or improving an integration.
3. Improving workflow guides.
4. Fixing Traditional Chinese / Simplified Chinese translations.
5. Improving mobile UX, accessibility, or performance.
6. Fixing bugs or documentation.

## Submit a use case

The easiest path is the website submission page:

- English: `https://usegrokbot.com/en/submit`
- Traditional Chinese: `https://usegrokbot.com/zh-hk/submit`
- Simplified Chinese: `https://usegrokbot.com/zh-cn/submit`

A submission should start from a **real public source** such as an X post, article, video, or public GitHub project.

For an X post, the site then:

1. Reads the public post
2. Asks a model to draft the case
3. Validates source, attribution, duplicates, and result numbers
4. Opens a pull request
5. Merges it if validation passed

Normal cases do not wait for a person. Failures go to a GitHub issue labeled `error-queue`.

Set `INGEST_GITHUB_TOKEN` on Vercel (contents + pull requests) so `/api/ingest` can open and merge the PR. AI calls go through the Vercel AI Gateway.

## Source and attribution rules

Every community example should preserve the original source.

Required where available:

- Original source URL
- Author / publisher name
- @handle for X sources
- Published date
- Category
- Integrations
- Result or Output
- Trust status

Do not:

- invent authors, handles, dates, or source URLs
- copy an entire X post or article into UseGrokBot
- invent performance or revenue numbers
- mark something as Tested unless UseGrokBot actually tested it
- remove attribution to the original creator

If the original source gives a measurable number, it may be shown as a **Result**.

If it does not, describe the concrete deliverable as an **Output** instead.

## Discover stories

Curated discover content lives in `data/discover.ts`. Machine-ingested X cases are appended to `data/discover/ingested.json`.

A good discover story explains:

- What they built
- How it works
- Why it matters
- Who should try it
- Which integrations are involved
- What Result / Output was produced
- Where the original source lives

UseGrokBot is the curator / explainer. The original author remains the source.

## Workflows

Ready-to-build guides live under `data/use-cases/`.

If a workflow is inspired by a public example:

- link the discover story to the workflow
- preserve the original source on the discover page
- keep an `Inspired by` / source relationship where appropriate

## Public resource lists

Public indexes such as `awesome-grok-bot` may be used to **discover candidate sources**.

Do not treat an index as permission to republish every linked work. Follow the original underlying source, write a fresh summary, and keep attribution / link-back.

## Translations

English is the source copy. Keep keys aligned with `lib/i18n/messages.ts`.

- `zh-Hant` → Taiwan written Chinese, served at `/zh-hk`
- `zh-Hans` → Mainland written Chinese, served at `/zh-cn`

Hong Kong readers use the same written form as Taiwan. Do not write Cantonese particles into product copy. Traditional → Simplified conversion is fine **after** the glossary pass.

Keep in English: Grok Bot, X, @handles, GitHub issue / pull request, CRM, listing, app names, Place Order, 1-Click.

Translate `quote` fields (the excerpt on the story page). Keep the original English on the English locale and in the X embed.

Ingested X post bodies, titles, and headlines live in `data/discover/zh.json`. Curated copy in `lib/i18n/discover.ts` wins if both exist. After adding `data/discover/zh-parts/part-*.json`, run `npx tsx scripts/merge-discover-zh.ts`.

### Glossary

| English | zh-Hant | zh-Hans |
|---|---|---|
| use case | 使用案例 | 使用场景 |
| workflow | 工作流程 | 工作流 |
| integration | 整合 | 集成 |
| prompt | 提示詞 | 提示词 |
| post | 貼文 | 帖子 |
| email | 電子郵件 | 邮件 |
| inbox | 收件匣 | 收件箱 |
| software | 軟體 | 软件 |
| information | 資訊 | 信息 |
| video | 影片 | 视频 |
| login | 登入 | 登录 |
| settings | 設定 | 设置 |
| search | 搜尋 | 搜索 |
| load | 載入 | 加载 |
| menu | 選單 | 菜单 |
| account | 帳號 | 账号 |
| competitor | 競爭對手 | 竞品 |
| marketing | 行銷 | 营销 |
| operations | 營運 | 运营 |
| support | 支援 | 支持 |
| founder | 創辦人 | 创始人 |
| community | 社群 | 社区 |
| hardware | 硬體 | 硬件 |
| default | 預設 | 默认 |

## Pull requests

- Keep each PR focused when possible.
- Run `npm run lint` and `npm run build` before submitting code changes.
- Do not commit `.env`, API keys, tokens, passwords, or secrets.
- Do not add fake testimonials, fake engagement, or unsupported sponsor claims.
- Explain the source for any factual community case you add.

## Good first contributions

Easy ways to start:

- add integration metadata for one popular app
- improve one mobile layout issue
- fix one translation
- add one verified public Grok Bot source
- improve one workflow explanation
- improve docs or accessibility

## License

By contributing code to this repository, you agree that your contribution is licensed under the project's [MIT License](LICENSE).
