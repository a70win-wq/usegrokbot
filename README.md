# UseGrokBot

<p align="center">
  <strong>Discover real Grok Bot workflows from the public web — then build them yourself.</strong>
</p>

<p align="center">
  <a href="https://usegrokbot.com/en">Live site</a> ·
  <a href="https://usegrokbot.com/en/discover">Discover</a> ·
  <a href="https://usegrokbot.com/en/use-cases">Workflows</a> ·
  <a href="https://usegrokbot.com/en/integrations">Integrations</a> ·
  <a href="https://usegrokbot.com/en/submit">Submit a use case</a>
</p>

<p align="center">
  <a href="https://github.com/a70win-wq/usegrokbot/stargazers"><img src="https://img.shields.io/github/stars/a70win-wq/usegrokbot?style=flat-square" alt="GitHub stars" /></a>
  <a href="https://github.com/a70win-wq/usegrokbot/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Grok%20Bot-community%20resource-blueviolet?style=flat-square" alt="Grok Bot community resource" />
</p>

![UseGrokBot](https://usegrokbot.com/og.png)

## What is UseGrokBot?

UseGrokBot is an open-source discovery hub for real Grok Bot use cases.

Instead of dumping prompts into a directory, UseGrokBot starts with public examples from X and the wider web, keeps attribution to the original source, explains what was built in plain language, and connects useful examples to ready-to-build workflows.

```text
Discover → Understand → Build → Copy → Share
```

## Why UseGrokBot?

- **Real examples** — public Grok Bot use cases from X, articles, videos, newsletters, GitHub, and community writeups.
- **Original attribution** — every community case links back to the original source.
- **Plain-English explanations** — understand what the Bot actually did and why it matters.
- **Buildable workflows** — turn an interesting example into a reusable workflow and prompt.
- **Integrations** — browse workflows by the apps and tools you already use.
- **Multilingual** — English, Traditional Chinese, and Simplified Chinese.
- **Open source** — contribute examples, integrations, translations, docs, and product improvements.

## Trust labels

UseGrokBot distinguishes between different levels of verification:

- ✅ **Official** — demonstrated or published by xAI / official sources.
- 🧪 **Tested** — tested by UseGrokBot.
- 👥 **Community** — shared publicly by the community and linked back to the original source.

We do not invent result numbers. If the original source does not provide a measurable result, the case is described as an **Output** instead.

## Community-powered discovery

Useful Grok Bot examples are spread across X, tutorials, videos, GitHub repositories, newsletters, and community writeups. UseGrokBot turns those scattered signals into a structured discovery layer.

A public source can become:

```text
Source
  ↓
Attribution
  ↓
Category + Integrations
  ↓
Plain-language summary
  ↓
Result / Output
  ↓
Related build guide
```

Useful public indexes such as [`awesome-grok-bot`](https://github.com/RongleCat/awesome-grok-bot) can act as discovery sources, while UseGrokBot still links to and attributes the original underlying source.

## Zero-touch automatic source ingestion

UseGrokBot watches the **Field Cases** section of [`RongleCat/awesome-grok-bot`](https://github.com/RongleCat/awesome-grok-bot) every 6 hours.

Supported source types include:

- X posts
- Articles / blogs
- Newsletters / Substack
- YouTube videos
- GitHub repositories
- note.com / article-style sources

```text
awesome-grok-bot / Field Cases
          ↓
Source feed + URL dedupe
          ↓
X / Article / Video / Newsletter / GitHub
          ↓
Metadata + source checks
          ↓
Conservative structured case
          ↓
Discover validation
          ↓
Direct automated commit
          ↓
Vercel deployment
```

For X cases, UseGrokBot prefers the machine extraction path and falls back to a conservative source-index summary if AI extraction is unavailable.

For non-X cases, the ingestion worker reads source metadata such as author, date, page title, site name, YouTube oEmbed data, or public GitHub repository metadata. It **does not copy article, video, newsletter, or repository bodies** into UseGrokBot.

The synced source index lives at:

```text
data/source-feeds/awesome-grok-bot-field-cases.json
```

The structured machine-ingested cases live at:

```text
data/discover/ingested.json
```

Local commands:

```bash
npm run sync:awesome-grok-bot
npm run ingest:awesome-grok-bot
npm run validate:discover
```

The source feed is an index of candidates, not permission to republish linked content. UseGrokBot summarizes conservatively, preserves attribution, and links back to the original source.

## Safety rules for ingestion

Automated ingestion must preserve a few hard rules:

- Keep the original source URL.
- Do not invent numeric results.
- Do not invent quotes.
- Do not mark automatically ingested cases as Tested, Featured, or Trending.
- X cases require a real X permalink.
- Non-X cases require a real HTTP(S) source URL.
- Duplicate source URLs are rejected.
- Linked third-party content keeps its original rights.

## Project structure

```text
app/          Next.js routes and pages
components/   UI components
data/         Discover stories, workflows, source feeds, and structured content
scripts/      Validation, source sync, and ingestion utilities
lib/          i18n, ingestion, and shared utilities
public/       Static assets
```

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel deployment
- GitHub Actions
- Structured local content

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Useful commands:

```bash
npm run lint
npm run build
npm run validate:discover
npm run sync:awesome-grok-bot
npm run ingest:awesome-grok-bot
```

The fastest way to submit a public X example is [Submit a use case](https://usegrokbot.com/submit). Paste the X post and the machine handles the rest if it passes validation.

## Contributing

Contributions are welcome.

You can help by:

- adding a real Grok Bot example
- adding or improving an integration
- improving Traditional / Simplified Chinese translations
- fixing mobile UX or accessibility issues
- improving workflow guides
- adding a public source index
- improving source metadata extraction
- fixing bugs or documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution rules.

## Roadmap

Multi-source ingestion is now live. The next ingestion priorities are additional public source indexes, `@UseGrokBot` mention ingestion, semantic duplicate detection, and better integration mapping.

See [ROADMAP.md](ROADMAP.md) for planned work.

## License

The code in this repository is licensed under the [MIT License](LICENSE).

The MIT license covers the software code. The **UseGrokBot** name, logo, and project branding remain associated with this project and are not a grant of trademark rights.

Third-party posts, screenshots, articles, videos, logos, names, repositories, and other linked materials remain the property of their respective owners and are used only as sources / references where applicable.

## Disclaimer

UseGrokBot is an independent community resource and is not affiliated with, endorsed by, or sponsored by xAI, X, or Cursor.

---

If UseGrokBot helps you discover a useful Grok Bot workflow, consider giving the repo a ⭐ — it helps more people find the project.
