# UseGrokBot — Design System

> A dark discovery hub that still reads as a catalog. Not a blog. Not a dashboard. Not a chat app. Not a landing-page playground.

The site should feel like Linear × Vercel × Gumloop, plus a little xAI. A visitor goes from a real X story to a copied setup without leaving.

**Theme:** dark gray, not dead black. Upgrade the current IA — do not redesign it.
**Canvas:** `#0B0D10`
**Accent:** electric blue `#4F7CFF`. Violet `#8B5CF6` only on hover, featured glow, and official/verified highlight.

---

## 1. Product feel

UseGrokBot is a **searchable catalog of ready-made work**.

Every screen answers: *What can I actually do with Grok Bot?*

Flow on every page:

Discover → Understand → See the result → Copy the prompt → Use it

### Personality

- Quiet, precise, useful
- Premium SaaS, not “AI startup landing page”
- Built for non-technical people: sales, marketers, founders, operators
- Language is plain. Never API / MCP / webhook / JSON unless the user is already on a coding use case

### Not this

- Cyberpunk, neon, liquid goo, magnetic cursors
- Huge mesh gradients, aurora blobs, WebGL heroes
- Generic Inter + purple wash + 3D orb
- Crowded dashboard cards with 9 meta chips
- Chat-agent chrome on the marketing surface
- Stock “AI brain” artwork
- Violet used as a page color
- Prompt-shop cards (Discover cards are case studies)

---

## 2. Color

Surfaces step up in small increments. Elevation comes from **hairline borders**, not drop shadows.

### Canvas and surfaces

| Token | Hex | Role |
|---|---|---|
| `--canvas` | `#0B0D10` | Page canvas |
| `--elevated` | `#171A20` | Nested wells, search fill, result box |
| `--card` | `#12151A` | Cards, panels |
| `--card-hover` | `#171A20` | Card hover |
| `--input` | `#171A20` | Form fields, prompt body |

### Borders and text

| Token | Hex | Role |
|---|---|---|
| `--line` | `rgb(255 255 255 / 0.08)` | Default hairline |
| `--line-strong` | `rgb(255 255 255 / 0.16)` | Hover, focus-adjacent |
| `--ink` | `#F5F7FA` | Headings, primary copy |
| `--mute` | `#9CA3AF` | Body, descriptions |
| `--faint` | `#6B7280` | Meta, placeholders, captions |
| `--inverse` | `#0B0D10` | Text on solid fills |

### Accent — use sparingly

The brand accent is **electric blue**. Violet is a highlight, not a theme.

| Token | Value | Role |
|---|---|---|
| `--accent` | `#4F7CFF` | Primary CTA, links, focus, active tab |
| `--accent-2` | `#8B5CF6` | Hover mix, featured glow, official badge only |
| `--accent-soft` | `rgb(79 124 255 / 0.14)` | Chip / icon well fill |
| `--accent-gradient` | `#4F7CFF` | Primary filled CTA: Build this workflow |

### Status (example output only)

| Token | Hex | Role |
|---|---|---|
| `--danger` | `#F87171` | Important change |
| `--warn` | `#FBBF24` | Notable, not urgent |
| `--ok` | `#34D399` | No change / success / copied |

### Rules

- One filled action per view. Everything else is ghost, hairline, or text.
- No colored body text. Body stays `--mute`.
- No gradient on cards, chips, or section backgrounds.
- Featured glow only: blue → violet at 5–10% opacity. No cyberpunk wash.
- One featured card may take two columns. Do not stripe every section.

---

## 3. Typography

**Sans:** Geist Sans (via `next/font`). Fallback: `ui-sans-serif, system-ui`.
**Mono:** Geist Mono. Prompts, slugs, keyboard hints, copy counts — never headings.

### Scale

| Role | Size | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|
| Display | clamp(40px, 6vw, 64px) | 500 | 1.05 | -0.035em | Homepage H1 only |
| Title | clamp(28px, 4vw, 40px) | 500 | 1.15 | -0.03em | Page heroes |
| Section | 24px / 28px | 500 | 1.25 | -0.02em | Section H2 |
| Card title | 16px / 17px | 500 | 1.3 | -0.015em | Use-case card |
| Body | 16px | 400 | 1.6 | -0.011em | Descriptions, learn articles |
| Small | 14px | 400 | 1.5 | -0.01em | Meta, chips, nav |
| Micro | 12px | 500 | 1.4 | 0.01em | Eyebrows, labels, badges |
| Prompt | 13px / 14px | 400 | 1.65 | 0 | Prompt box, mono |

### Rules

- Headings stay 500. Do not jump to 700 for “impact”.
- Display type is tight. Body is readable, never condensed.
- One sentence descriptions on cards. No two-paragraph cards.
- Learn pages: max ~68ch measure, generous paragraph spacing.

---

## 4. Layout

| Token | Value |
|---|---|
| Page max | `1240px` |
| Narrow (learn, submit, prompt well) | `760px` |
| Detail content | `800px` + optional 280px related rail on xl |
| Gutter | 20px mobile / 32px desktop |
| Section gap | 72px mobile / 104px desktop |
| Card gap | 16px mobile / 20px desktop |
| Header height | 56px |
| Radius card | 16px |
| Radius control | 10px |
| Radius chip / pill | 999px |
| Radius prompt | 12px |

Grid:

- Desktop use-case cards: 3 columns
- Tablet: 2
- Mobile: 1
- Category / app icon cards: 2 / 3 / 5

The homepage is a **single column of sections**, not a bento playground.

---

## 5. Motion

Subtle, springy, interruptible. No page-load theatre.

Use CSS transitions. No animation library in v1. Springs are remade as `cubic-bezier(0.34, 1.56, 0.64, 1)` on `--ease-spring`.

### Allowed (from Kinetics, remade in CSS)

| Interaction | Spec |
|---|---|
| Copy | Icon crossfades to check and pops. Label → “Copied”. Revert 1.4s. `--ease-spring` |
| Save | Heart scale 1 → 1.25. Fill `--danger` when saved |
| Card hover | Border brightens, lift `translateY(-2px)`, 220ms `--ease-spring` |
| Chip | Selected chip fills `--accent-soft`, 1px `--accent` border |
| Search | ⌘K / Ctrl+K focuses. Empty focus shows task suggestions. Arrow keys move. Enter opens. |
| Filter pill | Active pill uses `--accent-soft` + `--accent` text |
| Mobile drawer | Sheet rises 280ms. Dim overlay 0.5 black |

### Forbidden

- Cursor trails, magnetic buttons, liquid goo, orb menus
- Hero text split / scramble / 3D
- Auto-playing background video
- Staggered 20-card entrance on load
- `prefers-reduced-motion: reduce` must disable transform flourishes (`.spring-lift`, `.spring-press`, `.spring-pop`)

---

## 6. Components

### Header

Sticky, 56px, `--bg` at 80% + `backdrop-blur(16px)`, hairline bottom.

Left: wordmark. “UseGrokBot” in `--text`, with a 8px accent-gradient square mark.

Center / inline nav (desktop): Use Cases · Prompts · Categories · Apps · Learn
Weight 400, 13–14px, `--text-secondary`. Hover → `--text`.

Right: Saved (heart + count if any) · Submit a Use Case (ghost on desktop, text on mobile).

Mobile: wordmark + Saved + hamburger. Menu is a full-width sheet, not a tiny popover.

Do not make the header a fat marketing bar.

### Search

The most important control on the site.

- Height 56px desktop / 52px mobile
- Full width in hero, max 720px
- Icon left, rotating placeholder, optional ⌘K hint on desktop
- Surface `--bg-input`, border `--border`, focus ring 2px `--accent`
- Instant results. No Enter required
- Dropdown: 6–8 use cases, title + one line + category. Footer link “See all results”
- Empty: “No use cases found.” + try sales / email / competitor / research

Rotating placeholders (4s, fade):

- Find leads every morning
- Monitor my competitors
- Research trending topics
- Summarize my inbox
- Prepare me for sales meetings
- Monitor GitHub issues

### Category chips

Row under search. First chip is Popular (flame). Horizontal scroll on mobile, no wrapping into a messy wrap-stack if it overflows.

Idle: hairline + `--text-secondary`.
Active: `--accent-soft` fill, `--accent` text, 1px accent border.

### Use-case card

Quiet. One job: get the click or the copy.

```
[ BotFace ]                    [Category chip]
Title
One sentence
[App] [App] [Easy] [Daily]
[♡]                            [Copy Prompt]
```

- BotFace 28px. Category chip top-right.
- Title 16px / 500
- Description 13px / `--mute`, 2-line clamp
- Meta as compact elevated pills, not a run-on dotted line
- Footer: Save icon button + Copy Prompt ghost button
- Entire card is a link to the detail page except the two actions

Do not put more than 2 apps and 1 category on the card face.

### Category card / App card

Icon + name + one line. Same surface as use-case cards. No charts.

### Prompt box

This is a product surface, not a GitHub gist clone.

- `--bg-input` well, 12px radius, hairline
- Top bar: “Grok Bot prompt” label + Copy
- Body: Geist Mono 13–14px, `--text`, wrap, selectable
- Generous padding (20px)
- No line numbers
- On detail pages, sit directly under “Copy this Grok Bot prompt”

### Primary CTA

“Copy Prompt” on detail pages: filled accent-gradient, 12px radius, 14px / 500, height 44px, inverse text. One per hero.

Secondary: Save, outline / ghost.

### Filter panel

Desktop: horizontal filter bar under the page title, or a slim left column (220px) on `/use-cases` if the grid still fits 2–3 cards.

Groups: Category · Difficulty · Schedule · Apps
Multi-select. Clear all.

Mobile: “Filters” button opens a bottom sheet. Large tap targets. Apply + Reset.

### Workflow steps

Not a technical flowchart. A vertical list with a hairline connector.

```
1  Visit the sites you choose
2  Check the pages that matter
3  Compare with last time
4  Write a short briefing
```

Number in a 28px circle, accent-soft. Copy is a verb phrase a non-technical person would say.

### Example output

Looks like a received briefing, not a terminal.

- Card titled “Daily Competitor Brief” (or equivalent)
- Each item: status dot (red / amber / green) + short paragraph + “Why it matters” / “Recommended action” when useful
- This section is as important as the prompt. Do not shrink it.

### Customize prompt (“Make it yours”)

Simple stacked fields, not a form wizard.

Company · Industry · Competitors · How often · Where should results go

Button: “Generate my version” — client-side string splice into an editable prompt. No API.

### Empty states

Centered, short, one action.

Saved empty: “You haven’t saved anything yet.” → Explore Use Cases
Search empty: try four example queries, as buttons.

### Footer

Four columns on desktop (Brand · Explore · Learn · Community), stacked on mobile.

Disclaimer always visible, muted, 12px:

> UseGrokBot is an independent resource and is not affiliated with xAI. Grok is a trademark of its respective owner.

---

## 7. Page recipes

### Home

1. Header
2. Hero — H1 “What can Grok Bot do for you?” / sub “Discover real-world Grok Bot workflows, prompts and automations.” / search / chips
3. Popular use cases (6–9 cards)
4. Explore by job (10 category cards)
5. Works with the tools you already use (app cards)
6. New use cases (3–6)
7. How it works — 3 steps, no illustration pack
8. CTA — “Find a workflow” + “Submit a use case”
9. Footer

Hero is vertically centered-ish, lots of air. Search is the focal object. No product screenshot collage.

### `/use-cases`

Title + count + search + sort (Popular · Newest · Most copied · A–Z) + filters + grid.

### `/use-cases/[slug]`

Breadcrumb: Use Cases → Category → Title

Hero: title, one paragraph, meta pills (Easy · 5 min setup · Daily · apps), Copy Prompt + Save

Then, in this order:

1. What this Grok Bot does (steps)
2. Who should use this?
3. Copy this Grok Bot prompt
4. Make it yours
5. What you’ll get
6. You may also like (3–4 cards)

### `/categories/[slug]`, `/apps/[slug]`

Same listing organism as `/use-cases`, pre-filtered. Unique H1:

- “Grok Bot workflows for sales”
- “Best Grok Bot workflows for Gmail”

### `/prompts`

Prompt-first cards. Title, 3-line preview, category, Copy, link to use case.

### `/learn/*`

Editorial. Narrow measure. No card grid in the article body except related use cases at the end.

### `/saved`

Grid of saved cards, or the empty state. localStorage only.

### `/submit`

Polished form. Version 1 stores locally and shows a success state. Comment in code that a backend can replace this.

---

## 8. Iconography and imagery

- Lucide, 1.75 stroke, never mixed icon sets
- App marks: simple monochrome glyphs in a 36px well — not colorful official logos if licensing is unclear. Use recognizable lucide stand-ins (mail, sheet, calendar, hash, bookmark, github-style, etc.)
- No photography
- No generated “AI robot at a laptop” art
- Workflow diagrams, if any, are the step list above — not Mermaid, not 3D

---

## 9. Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `footer`
- Search is a real `<input>` with a label (visually hidden is fine)
- Buttons have names: “Copy prompt for Competitor Monitor”, “Save Competitor Monitor”
- Focus ring: 2px `--accent`, 2px offset, never `outline: none` without a replacement
- Contrast: body `#6b6b6b` on `#ffffff` is a floor — do not go lighter for body
- Keyboard: filters, cards, copy, save, drawer, dialogs
- `prefers-reduced-motion` respected

---

## 10. Implementation notes for this codebase

- Next.js App Router, TypeScript, Tailwind, React Server Components by default
- Interactive pieces (`SearchBar`, `CopyButton`, `SaveButton`, filters, customize prompt) are client components
- All use cases live in `data/` — pages never hard-code the catalog
- SEO: unique `title`, `description`, canonical, Open Graph on every template
- JSON-LD: WebSite + SearchAction on home; BreadcrumbList + Article-ish on detail; ItemList on listings
- `sitemap.ts` + `robots.ts`
- Clean URLs only: `/use-cases/competitor-monitor`

### Quality bar before ship

- Obvious in 5 seconds
- Search works without Enter
- Copy Prompt works on card and detail
- 390px looks designed, not shrunk
- Cards are consistent
- Prompts are usable, not filler
- No console errors, no dead links
- Disclaimer in the footer
