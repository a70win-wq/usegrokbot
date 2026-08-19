# ROLE

You are a senior full-stack product engineer, UX designer, SEO strategist, and SaaS product designer.

I want you to DESIGN AND BUILD a complete production-ready website for:

**UseGrokBot.com**

Do not only give me suggestions or code snippets.

Actually build the website structure, pages, components, content system, responsive UI, and SEO foundation.

---

# 1. PRODUCT IDEA

UseGrokBot.com is a practical library of:

- Grok Bot use cases
- Grok Bot prompts
- Grok Bot workflows
- Grok Bot automation examples
- Tutorials
- App-specific Grok Bot examples

The main purpose is:

> Help normal non-technical users discover what Grok Bot can do, then copy a ready-made prompt and use it immediately.

This should NOT feel like a news blog.

It should feel like:

**AI Workflow Marketplace + Prompt Library + Use Case Search Engine**

The user should be able to enter the website and find something useful within 10 seconds.

---

# 2. CORE POSITIONING

Brand:

# UseGrokBot

Primary headline:

# What can Grok Bot do for you?

Subheadline:

**Discover real-world Grok Bot workflows, prompts and automations.**

Secondary brand line:

> Find a task. Copy the prompt. Put your Grok Bot to work.

---

# 3. TARGET USERS

The site is primarily for NON-TECHNICAL users.

Examples:

- business owners
- salespeople
- marketers
- creators
- office workers
- researchers
- customer service teams
- recruiters
- developers
- entrepreneurs

Do NOT assume users understand APIs, agents, MCP, webhooks, cron jobs, JSON or automation terminology.

Use simple language.

Instead of:

> Implement autonomous browser orchestration.

Say:

> Let Grok Bot check competitor websites every morning.

---

# 4. DESIGN DIRECTION

Create a premium modern SaaS design.

Visual inspiration:

- xAI minimalism
- Linear
- Vercel
- Gumloop templates
- Relevance AI Marketplace
- modern AI SaaS products

Do NOT directly clone any website.

Use the references only for design principles.

## Overall visual style

Dark premium interface.

Background:

`#08090A`

Secondary background:

`#0D0E10`

Cards:

`#131518`

Borders:

subtle dark-gray / white opacity

Main text:

white

Secondary text:

soft gray

Accent:

Electric blue → violet

Example:

`#4F7CFF`
to
`#8B5CF6`

Use the gradient VERY sparingly.

The interface should feel:

- premium
- minimal
- fast
- clean
- professional
- modern
- slightly futuristic

Avoid:

- cyberpunk design
- excessive neon
- robot illustrations everywhere
- huge gradients
- excessive animations
- crowded cards
- overly technical dashboards
- generic AI-generated artwork

Use lots of spacing.

Typography should be large and readable.

---

# 5. TECH STACK

Build this using a modern stack suitable for Vercel.

Preferred:

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- reusable components
- Lucide icons
- local structured content/data initially

If a better modern equivalent is clearly appropriate, you may use it.

Keep architecture simple.

Do NOT overengineer version 1.

Initial version should NOT require:

- Supabase
- authentication
- complex backend
- paid APIs

unless absolutely necessary.

Use static/local structured data where possible.

The website must be easy to deploy to Vercel.

Domain:

**usegrokbot.com**

---

# 6. RESPONSIVE DESIGN

The website MUST be excellent on:

- desktop
- laptop
- tablet
- iPhone
- Android

Mobile is extremely important.

Do NOT simply shrink the desktop design.

Design mobile layouts intentionally.

On mobile:

- cards should stack cleanly
- search should be prominent
- filters should use drawer / modal / bottom-sheet style
- text must remain easily readable
- CTA buttons must be large enough to tap
- navigation should collapse cleanly

---

# 7. SITE STRUCTURE

Build the following architecture:

```text
/
│
├── /use-cases
│
├── /use-cases/[slug]
│
├── /categories
│   ├── /sales
│   ├── /marketing
│   ├── /content
│   ├── /research
│   ├── /operations
│   ├── /customer-support
│   ├── /hr
│   ├── /coding
│   ├── /finance
│   └── /productivity
│
├── /apps
│   ├── /gmail
│   ├── /google-sheets
│   ├── /google-calendar
│   ├── /slack
│   ├── /notion
│   ├── /github
│   ├── /salesforce
│   ├── /hubspot
│   ├── /linkedin
│   ├── /x
│   ├── /reddit
│   └── /youtube
│
├── /prompts
│
├── /learn
│   ├── /what-is-grok-bot
│   ├── /how-to-use-grok-bot
│   ├── /how-to-create-a-grok-bot
│   └── /grok-bot-examples
│
├── /saved
│
└── /submit
```

---

# 8. HEADER

Desktop header:

Left:

**UseGrokBot**

Navigation:

- Use Cases
- Prompts
- Categories
- Apps
- Learn

Right:

- Saved
- Submit a Use Case

Optional small theme toggle.

Header should be sticky but subtle.

Do not make it oversized.

---

# 9. HOMEPAGE HERO

The homepage hero should be extremely simple.

Main headline:

# What can Grok Bot do for you?

Subheadline:

**Discover real-world Grok Bot workflows, prompts and automations.**

Large search bar:

Placeholder:

**What do you want Grok Bot to do?**

Example rotating search suggestions:

- Find leads every morning
- Monitor my competitors
- Research trending topics
- Summarize my inbox
- Prepare me for sales meetings
- Monitor GitHub issues

Below the search:

quick category chips:

- 🔥 Popular
- Sales
- Marketing
- Research
- Content
- Office
- Coding

The search box is one of the MOST IMPORTANT elements on the website.

---

# 10. SEARCH

Implement instant client-side search.

Search should match:

- title
- short description
- category
- app
- tags
- problem solved

Example:

User searches:

`email`

Results may include:

- Inbox Organizer
- Email Summarizer
- Follow-up Email Writer
- Support Email Assistant
- Newsletter Summarizer

User searches:

`competitor`

Results:

- Competitor Monitor
- Competitor Price Monitor
- Competitor Social Monitor
- SEO Competitor Research

Do not require Enter.

Results should update immediately.

---

# 11. HOMEPAGE — POPULAR SECTION

After Hero:

# Popular Grok Bot Use Cases

Use a clean responsive card grid.

Desktop:

3 columns

Tablet:

2 columns

Mobile:

1 column

Example card:

---

Icon

### Competitor Monitor

Automatically check competitor websites and alert you when something important changes.

Apps:

Browser · Slack

Tags:

Research

Difficulty:

Easy

Schedule:

Daily

CTA:

**View use case**

Secondary small button:

**Copy Prompt**

---

Keep cards concise.

---

# 12. USE CASE CARD

Each card should contain:

1. icon
2. title
3. one-sentence description
4. category
5. apps involved
6. difficulty
7. frequency / schedule if relevant
8. Copy Prompt action
9. Save icon
10. optional popularity / copy count

Example:

### Lead Researcher

Find and summarize potential customers before your sales team contacts them.

🌐 Browser  
📊 Google Sheets

Easy · Daily

♡ Save

**Copy Prompt**

---

# 13. CATEGORY SECTION

Homepage section:

# Explore by job

Categories:

## Sales
Find leads, research prospects and prepare follow-ups.

## Marketing
Monitor competitors, campaigns and market trends.

## Content
Research topics and create better content faster.

## Research
Turn hours of online research into short useful reports.

## Operations
Handle repetitive daily office tasks.

## Customer Support
Organize feedback and support requests.

## HR
Research candidates and organize hiring tasks.

## Coding
Help investigate issues, bugs and GitHub work.

## Finance
Organize simple finance and reporting tasks.

## Productivity
Help manage everyday work and personal tasks.

Use attractive icon cards.

---

# 14. BROWSE BY APP

Create:

# Works with the tools you already use

Cards/icons for:

- Gmail
- Google Sheets
- Google Calendar
- Slack
- Notion
- GitHub
- Salesforce
- HubSpot
- LinkedIn
- X
- Reddit
- YouTube

Each app should link to:

`/apps/[slug]`

Example:

`/apps/gmail`

Page title:

# Best Grok Bot workflows for Gmail

Display relevant use cases.

---

# 15. USE CASE DETAIL PAGE

This is the most important page template.

Example URL:

`/use-cases/competitor-monitor`

Layout:

Breadcrumb:

Use Cases → Research → Competitor Monitor

Hero:

# Competitor Monitor

Description:

Automatically monitor competitor websites and tell you when something important changes.

Metadata:

- Easy
- 5 min setup
- Daily
- Browser
- Slack

Primary CTA:

# Copy Prompt

Secondary CTA:

♡ Save

---

# 16. WHAT THIS BOT DOES

Section:

# What this Grok Bot does

Explain in simple language.

Example:

1. Visits the competitor websites you choose
2. Checks important pages for changes
3. Compares the new information with the previous check
4. Highlights important differences
5. Sends you a short summary

Use a simple visual workflow.

Example:

Visit competitors

↓

Check changes

↓

Analyse differences

↓

Send briefing

This should NOT look overly technical.

---

# 17. WHO THIS IS FOR

Section:

# Who should use this?

Example:

- marketing teams
- business owners
- founders
- sales teams
- product managers

---

# 18. READY-MADE PROMPT

Section:

# Copy this Grok Bot prompt

Use a premium code/prompt style box.

Top-right button:

**Copy**

Example prompt:

```text
You are my Competitor Monitoring Bot.

Your job is to monitor the competitors I provide and give me a concise report whenever something important changes.

Check these areas:

- homepage
- pricing
- product pages
- blog / news
- major announcements

For every check:

1. Visit each competitor.
2. Look for meaningful changes.
3. Ignore minor design or formatting changes.
4. Explain what changed.
5. Explain why the change may matter to my business.
6. Suggest one action I should consider.

Return the result in this format:

Competitor:
Change:
Why it matters:
Recommended action:

If nothing important changed, say:
"No important competitor changes detected."
```

All prompts should be easily readable and genuinely useful.

---

# 19. CUSTOMIZE PROMPT

Under the ready-made prompt add a simple interface:

# Make it yours

Fields may include:

Company:

Industry:

Competitors:

How often should it run?

Result destination:

Initially, it does NOT need an AI API.

The feature can simply combine structured inputs into an improved editable prompt on the frontend.

Button:

**Generate my version**

Then display the customized prompt.

---

# 20. EXAMPLE OUTPUT

Each use case should include:

# What you'll get

Example:

### Daily Competitor Brief

**Competitor A**

🔴 Pricing changed.

New pricing starts at $49/month instead of $39/month.

**Why it matters**

The competitor appears to be moving upmarket.

**Recommended action**

Review whether your current price positioning still gives you an advantage.

---

**Competitor B**

🟡 Published three new articles about AI automation.

---

**Competitor C**

🟢 No important changes.

---

This section is very important because non-technical users need to SEE the final result.

---

# 21. RELATED USE CASES

At the bottom of every use-case detail page:

# You may also like

Show 3-4 related cards.

Example for Competitor Monitor:

- Competitor Price Monitor
- Competitor Social Monitor
- Industry News Monitor
- SEO Competitor Research

---

# 22. SAVE FUNCTION

Implement Save / Favourite.

Version 1:

Use browser localStorage.

No login required.

Saved page:

`/saved`

Show all saved use cases.

Heart outline:

♡ Save

Saved:

♥ Saved

---

# 23. COPY PROMPT FUNCTION

Every use case card and detail page should support:

**Copy Prompt**

After clicking:

Change temporarily to:

✓ Copied

Use browser clipboard.

No backend required.

---

# 24. FILTERS

On `/use-cases`, add filters.

## Category

- Sales
- Marketing
- Content
- Research
- Operations
- Customer Support
- HR
- Coding
- Finance
- Productivity

## Difficulty

- Easy
- Medium
- Advanced

## Schedule

- One-time
- Daily
- Weekly
- Always-on

## Apps

- Browser
- Gmail
- Sheets
- Slack
- Notion
- GitHub
- Salesforce
- HubSpot
- X
- LinkedIn
- Reddit

Desktop:

left sidebar or polished filter bar.

Mobile:

Filters button opens drawer / bottom sheet.

---

# 25. SORT

Allow:

- Popular
- Newest
- Most copied
- A-Z

---

# 26. INITIAL 50 USE CASES

Create structured content for these initial use cases.

## SALES

1. Lead Researcher
2. Prospect Research
3. Lead Qualification
4. Sales Meeting Prep
5. CRM Updater
6. Follow-up Email Writer
7. Lost Lead Re-engagement
8. Daily Sales Brief

## MARKETING

9. Competitor Monitor
10. Competitor Price Monitor
11. Ad Monitor
12. SEO Researcher
13. Keyword Researcher
14. Brand Mention Monitor
15. Marketing Campaign Report
16. Customer Review Analyzer

## CONTENT

17. Trending Topic Finder
18. X Content Researcher
19. LinkedIn Post Researcher
20. YouTube Idea Researcher
21. Newsletter Creator
22. Blog Research Assistant
23. Content Repurposing Bot
24. Viral Content Researcher

## RESEARCH

25. Daily AI News Brief
26. Industry News Monitor
27. Company Researcher
28. Product Researcher
29. Market Research Bot
30. Reddit Researcher
31. X Sentiment Research
32. Research Report Builder

## OPERATIONS

33. Inbox Organizer
34. Email Summarizer
35. Meeting Prep Assistant
36. Meeting Follow-up Assistant
37. Daily Work Brief
38. Weekly Report Generator
39. Calendar Organizer

## CUSTOMER SUPPORT

40. Support Email Assistant
41. Customer Complaint Analyzer
42. FAQ Research Bot
43. Feedback Collector
44. Customer Sentiment Monitor

## HR

45. Candidate Researcher
46. Resume Screener
47. Interview Prep Bot
48. New Employee Onboarding

## CODING

49. GitHub Issue Researcher
50. Bug Reproduction Assistant

Also create placeholder support for future use cases such as:

- PR Reviewer
- Website QA Bot
- Error Monitor

---

# 27. DATA MODEL

Store use cases in structured data.

For example:

```ts
{
  slug: "competitor-monitor",
  title: "Competitor Monitor",
  shortDescription: "...",
  description: "...",
  category: "marketing",
  tags: [],
  apps: [],
  difficulty: "easy",
  schedule: "daily",
  setupTime: "5 min",
  featured: true,
  popular: true,
  prompt: "...",
  steps: [],
  targetUsers: [],
  exampleOutput: "...",
  related: []
}
```

Do not hard-code every use case directly inside page components.

Use reusable data structures.

---

# 28. CONTENT QUALITY

For each initial use case create:

- clear title
- simple description
- category
- relevant apps
- difficulty
- schedule
- setup time
- 4-6 workflow steps
- suitable target users
- useful ready-made Grok Bot prompt
- example output
- related use cases

Do not use meaningless placeholder lorem ipsum.

Content should be usable.

---

# 29. PROMPTS PAGE

Create:

`/prompts`

Hero:

# Grok Bot Prompts

Subtitle:

Ready-to-use instructions for real work.

Provide search.

Prompt cards should connect back to use cases.

Categories:

- Sales
- Marketing
- Research
- Writing
- Office
- Coding

Each prompt should support Copy.

---

# 30. LEARN SECTION

Create SEO-friendly educational pages.

## What is Grok Bot?

URL:

`/learn/what-is-grok-bot`

Explain simply.

## How to use Grok Bot

`/learn/how-to-use-grok-bot`

## How to create a Grok Bot

`/learn/how-to-create-a-grok-bot`

## Grok Bot examples

`/learn/grok-bot-examples`

Keep articles useful and readable.

Avoid keyword stuffing.

---

# 31. SUBMIT PAGE

Create:

`/submit`

Title:

# Share a Grok Bot use case

Fields:

- Use case name
- What does it do?
- Category
- Apps used
- Prompt
- Your name
- Website / X optional

Version 1 does not need actual database submission.

It can show a polished form and either:

- save locally
or
- prepare for a future backend

Make this clear in the code.

---

# 32. SEO

SEO is a very high priority.

Target keyword families:

- Grok Bot use cases
- Grok Bot examples
- Grok Bot prompts
- Grok Bot workflows
- Grok Bot automation
- Grok Bot ideas
- Grok Bot for sales
- Grok Bot for marketing
- Grok Bot for research
- Grok Bot for Gmail
- Grok Bot GitHub
- Grok Bot competitor research

Create unique:

- title
- description
- canonical
- Open Graph metadata

for dynamic use-case pages.

Example:

Title:

**Competitor Monitor Grok Bot Workflow | UseGrokBot**

Description:

**Use Grok Bot to automatically monitor competitor websites, identify important changes and send you a concise daily report. Copy the prompt and get started.**

---

# 33. STRUCTURED DATA

Where appropriate add:

- BreadcrumbList
- Article
- WebSite
- SearchAction
- ItemList

Do not abuse structured data.

---

# 34. SITEMAP

Automatically generate:

`sitemap.xml`

Include:

- homepage
- category pages
- app pages
- prompts
- learn pages
- every use case

---

# 35. ROBOTS

Create proper:

`robots.txt`

Make site indexable.

---

# 36. URL RULES

Use clean URLs.

Good:

`/use-cases/competitor-monitor`

Bad:

`/use-cases?id=38293`

Good:

`/categories/sales`

Good:

`/apps/gmail`

---

# 37. FOOTER

Footer:

UseGrokBot

Short description:

**Practical Grok Bot use cases, prompts and workflows for real work.**

Navigation:

Explore

- Use Cases
- Categories
- Apps
- Prompts

Learn

- What is Grok Bot?
- How to use Grok Bot
- Grok Bot Examples

Community

- Submit a Use Case

Bottom:

UseGrokBot.com

Also include a clear disclaimer:

**UseGrokBot is an independent resource and is not affiliated with xAI. Grok is a trademark of its respective owner.**

Do not imply this site is officially owned by xAI.

---

# 38. IMPORTANT UX PRINCIPLE

Every page must answer:

> What can I actually do with Grok Bot?

Do NOT fill the website with abstract explanations.

The flow should be:

DISCOVER

↓

UNDERSTAND

↓

SEE RESULT

↓

COPY PROMPT

↓

USE IT

---

# 39. HOMEPAGE FINAL STRUCTURE

Build homepage approximately in this order:

1. Header
2. Hero
3. Main Search
4. Popular category chips
5. Popular Grok Bot Use Cases
6. Explore by Job
7. Browse by App
8. New Use Cases
9. “How it works”
10. CTA
11. Footer

---

# 40. HOW IT WORKS

Simple 3 steps:

## 1. Find a task

Search for something you want Grok Bot to do.

## 2. Copy the prompt

Use one of our ready-made Grok Bot instructions.

## 3. Put Grok Bot to work

Customize it and let your Bot handle the task.

---

# 41. EMPTY STATES

Create polished empty states.

Examples:

Search returns nothing:

> No use cases found.

> Try “sales”, “email”, “competitor” or “research”.

Saved page empty:

> You haven't saved anything yet.

Button:

**Explore Use Cases**

---

# 42. INTERACTIONS

Use subtle animations only.

Examples:

- card hover
- button hover
- search dropdown
- copy confirmation
- save animation
- filter transitions

Avoid animation overload.

The site should remain fast.

---

# 43. ACCESSIBILITY

Include:

- semantic HTML
- keyboard navigation
- visible focus states
- proper button labels
- adequate contrast
- accessible forms
- alt text where applicable

---

# 44. PERFORMANCE

Prioritize:

- fast first load
- minimal JavaScript
- server components where appropriate
- optimized fonts
- optimized images
- no unnecessary libraries
- good Lighthouse performance

---

# 45. IMPORTANT DEVELOPMENT RULES

Do not just build a pretty homepage.

Build the reusable system behind it.

Components should include things like:

- Header
- Footer
- SearchBar
- UseCaseCard
- CategoryCard
- AppCard
- PromptBox
- CopyButton
- SaveButton
- FilterPanel
- MobileFilterDrawer
- WorkflowSteps
- ExampleOutput
- RelatedUseCases
- Breadcrumbs

Keep the code organized.

---

# 46. FIRST VERSION PRIORITY

If you need to prioritize development, use this order:

### P0

- homepage
- responsive design
- use cases listing
- use-case detail page
- 50 structured use cases
- search
- filters
- Copy Prompt
- SEO

### P1

- saved use cases
- app pages
- category pages
- prompts page
- learn pages

### P2

- customized prompt generator
- submit page enhancements
- copy counts
- trending system

Do NOT sacrifice the P0 experience for unnecessary features.

---

# 47. QUALITY BAR

Before considering the site finished, check it yourself.

Ask:

- Is the homepage attractive?
- Is it obvious what the website does in 5 seconds?
- Can a non-technical person understand it?
- Can I find an example quickly?
- Does search work?
- Can I copy a prompt?
- Does mobile look intentionally designed?
- Are cards visually consistent?
- Are detail pages genuinely useful?
- Are the prompts useful rather than filler?
- Does it feel like a real product instead of a template?
- Does it look good at 390px width?
- Does it look good on desktop?
- Are SEO pages indexable?
- Are there broken links?
- Are there console errors?

Fix any obvious issues you find.

---

# 48. FINAL RESULT

I want the end result to feel like:

**“The easiest place on the internet to discover what Grok Bot can actually do.”**

The site should combine:

- the discoverability of a template marketplace
- the simplicity of a prompt library
- the usefulness of a workflow directory
- the polish of a premium SaaS website

Most importantly:

A visitor should be able to go from:

> “I don't know what Grok Bot can do”

to:

> “I found something useful and copied the prompt”

within approximately 30 seconds.

Start building the complete first version now.

Do not stop at planning.

Create the actual implementation.