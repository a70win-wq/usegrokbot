# UseGrokBot Roadmap

UseGrokBot is building an open discovery layer for real Grok Bot use cases.

The long-term goal is simple:

> **Find what people are actually building with Grok Bot, understand it quickly, and build it yourself.**

## Now

- [x] Multilingual site: English, Traditional Chinese, Simplified Chinese
- [x] Discover feed for real Grok Bot examples
- [x] Original source attribution
- [x] Workflow / prompt library
- [x] Categories and app / integration browsing
- [x] Submission page
- [x] Open-source repository
- [x] MIT license
- [x] X-post machine ingestion: extract, validate, PR, auto-merge
- [x] Automatic source feed: `awesome-grok-bot` Field Cases every 6 hours
- [x] Auto-ingest new X Field Cases through the existing machine-ingest pipeline
- [ ] Improve discover cards with stronger Result / Output presentation
- [ ] Improve mobile filter density and touch targets
- [ ] Expand trust labels: Official / Tested / Community
- [ ] Improve integration filtering and landing pages

## Next: automated ingestion

The main product direction is a **zero-touch ingestion pipeline**.

```text
X / public source
      ↓
Relevance detection
      ↓
Metadata extraction
      ↓
Attribution + source validation
      ↓
Duplicate detection
      ↓
Result evidence validation
      ↓
Structured discover case
      ↓
CI validation
      ↓
Publish
```

Planned work:

- [x] Monitor a public Grok Bot source for candidate cases (`awesome-grok-bot` Field Cases)
- [x] Parse submitted public X URLs
- [x] Extract author, handle, date, integrations, category, and outcome from X
- [x] Detect duplicate X post IDs automatically
- [x] Separate verified numeric `Result` from non-numeric `Output` for X ingest
- [x] Reject unsupported result numbers automatically
- [x] Generate structured ingested DiscoverStory content
- [x] Add automated CI content validation
- [x] Auto-publish X cases that pass validation
- [x] Keep failed X cases in an error queue instead of blocking normal ingestion
- [ ] Add more public source indexes / feeds
- [ ] Add generic article / newsletter / video source ingestion
- [ ] Parse X mentions such as `@UseGrokBot`
- [ ] Detect semantic duplicates across different source URLs

## Community

- [ ] Add issue templates
- [ ] Add pull request template
- [ ] Add `good first issue` tasks
- [ ] Add `help wanted` tasks
- [ ] Make it easier to contribute one integration or one public example
- [ ] Explore `@UseGrokBot` mention-based submissions on X
- [ ] Contributor profiles / attribution for repeat contributors

## Discovery

- [ ] Featured Grok Bot Builds
- [ ] Recently added
- [ ] Recently verified
- [ ] Better search across use cases, outcomes, and integrations
- [ ] Collections such as “Grok Bot for Sales” and “Grok Bot for Founders”
- [ ] True trending signals when reliable engagement data is available

## Integrations

- [ ] Dedicated integration pages
- [ ] Popular integrations section
- [ ] More integration metadata and icons
- [ ] Cross-filter by category + integration
- [ ] SEO pages for common combinations such as Grok Bot + Gmail / Slack / GitHub

## Platform

Later-stage ideas:

- [ ] Public JSON feed
- [ ] Public API for discover stories / workflows / integrations
- [ ] Machine-readable case schema
- [ ] External agent access to the UseGrokBot directory

## Sustainability

UseGrokBot should remain useful to normal users without putting core discovery behind a paywall.

Potential sustainability model:

- Sponsored tools
- Featured integrations
- Relevant AI / automation sponsors

Sponsored content should always be clearly labeled and should not change editorial trust labels.

## Principles

1. **Original source first** — link back to the creator.
2. **No fake numbers** — never invent results.
3. **Explain, don't mirror** — add useful context instead of copying posts.
4. **Buildable** — connect discovery to workflows whenever possible.
5. **Automation over manual ops** — normal ingestion should not require human approval.
6. **Exceptions, not queues** — humans handle failures, not every item.
7. **Open by default** — let the community improve the project.
