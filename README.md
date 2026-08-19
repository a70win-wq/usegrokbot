# UseGrokBot

<p align="center">
  <strong>Discover real Grok Bot workflows from X — then build them yourself.</strong>
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

Instead of dumping prompts into a directory, UseGrokBot starts with real examples shared publicly by the Grok Bot community, keeps attribution to the original source, explains what was built in plain language, and connects useful examples to ready-to-build workflows.

```text
Discover → Understand → Build → Copy → Share
```

## Why UseGrokBot?

- **Real examples** — discover public Grok Bot use cases from X and the wider community.
- **Original attribution** — community cases link back to the original author and source.
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

We do not invent result numbers. If the original source does not provide a measurable result, the case should be described as an **Output** instead.

## Community-powered discovery

Useful Grok Bot examples are spread across X, tutorials, videos, GitHub repositories, and community writeups. UseGrokBot turns those scattered signals into a structured discovery layer.

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

## Project structure

```text
app/          Next.js routes and pages
components/   UI components
data/         Discover stories, workflows, and structured content
lib/          i18n and shared utilities
public/       Static assets
```

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel deployment
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
```

## Contributing

Contributions are welcome.

You can help by:

- adding a real Grok Bot example
- adding or improving an integration
- improving Traditional / Simplified Chinese translations
- fixing mobile UX or accessibility issues
- improving workflow guides
- fixing bugs or documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution rules.

## Roadmap

The project is moving toward a community-powered, zero-touch ingestion pipeline:

```text
X / public source
      ↓
AI relevance + metadata extraction
      ↓
Source / duplicate / evidence validation
      ↓
Structured case
      ↓
CI validation
      ↓
Publish
```

See [ROADMAP.md](ROADMAP.md) for planned work.

## License

The code in this repository is licensed under the [MIT License](LICENSE).

The MIT license covers the software code. The **UseGrokBot** name, logo, and project branding remain associated with this project and are not a grant of trademark rights.

Third-party posts, screenshots, articles, videos, logos, names, and other linked materials remain the property of their respective owners and are used only as sources / references where applicable.

## Disclaimer

UseGrokBot is an independent community resource and is not affiliated with, endorsed by, or sponsored by xAI, X, or Cursor.

---

If UseGrokBot helps you discover a useful Grok Bot workflow, consider giving the repo a ⭐ — it helps more people find the project.
