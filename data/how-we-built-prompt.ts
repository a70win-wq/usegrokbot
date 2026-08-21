export const howWeBuiltPrompt = `You are building UseGrokBot from scratch with Grok Bot.

UseGrokBot is a public discovery site: how people actually use Grok Bot on X. Every card is a real public post. Cards open the original X post. Do not invent authors, handles, tweet IDs, view counts, or result numbers.

Site to build: https://usegrokbot.com
GitHub: https://github.com/a70win-wq/usegrokbot

Languages: English, Traditional Chinese (written 書面語, not spoken Cantonese), Simplified Chinese.

## 0. Start from zero

1. If Grok Build is not installed, install it now. Confirm it can search X.
2. Grok Build is how you find posts on X. Do not invent a catalog from memory.
3. After Grok Build works, build the site and keep filling it from X.

## 1. Install Grok Build, then search X

Use Grok Build to search X for every public post about Grok Bot / @bot.

Include:
- People using Grok Bot to do real work
- Official @bot posts
- Original posts that Elon Musk (@elonmusk) reposted or quoted, if the original is about Grok Bot

Exclude:
- Grok the model only (not the Bot)
- Grok Build tutorials that never mention Grok Bot
- Posts that do not talk about Grok Bot
- Deleted or private posts

X search only shows a slice each time. Keep everything you found this run. Do not claim the list is worldwide-complete.

For each post save:
- original URL: https://x.com/{handle}/status/{id}
- handle
- a short summary taken from the post text
- if Elon boosted it: Elon's URL too, but ingest the ORIGINAL URL

## 2. Put posts into the catalog

File GitHub issues on a70win-wq/usegrokbot.

Title must be exactly: Ingest posts:
Max 15 original URLs per issue. More posts = more issues.

Body:

https://x.com/...
https://x.com/...

## Elon liked

List ORIGINAL URLs Elon reposted or quoted. Cards open the original, not Elon's post.

## Notes

Found with Grok Build on X. Window: 2026-08-11 (Grok Bot public launch) to today.
No invented numbers.

## 3. Build the website

Build a Grok Bot discovery hub with these pages:

- Home \`/\` — search + tabs:
  - Latest: all posts, newest first
  - Elon liked: originals Elon reposted or quoted, newest Elon boost first
  - Learn: the 5 most-viewed long-form X articles
- Categories \`/categories\` — same posts, grouped by what the Bot was doing (sales, marketing, research, content, coding, operations, personal)
- Ranking \`/rankings\` — same posts by public X view counts (not live; refresh a couple of times a day)
- Articles \`/articles\` — long-form X posts / X Articles
- Submit \`/submit\` — paste a public X URL
- How we built this \`/how-we-built\` — this exact method: install Grok Build, search X for Grok Bot posts, ingest originals, ship the catalog. Put a link to this page right after the homepage kicker "The Grok Bot Discovery Hub".

Homepage kicker: The Grok Bot Discovery Hub
Homepage title: How people use Grok Bot.

Cards:
- Author name + @handle from the real post
- Title/summary from the post
- Link: View on X
- No fake view counts. If views exist from public X data, show them.

## 4. Rules

- Original URL only. Never ingest Elon's repost URL as the card.
- If a number is not in the post, do not write a Result number. Use Output.
- Do not mark posts Featured or Trending by hand.
- Do not restore prompt libraries or Official / Tested / Community trust tabs.
- zh-hk / zh-Hant copy is written Chinese, matching Simplified, not Cantonese speech.

## 5. Loop

1. Install Grok Build
2. Search X for Grok Bot posts
3. File Ingest posts: issues
4. Publish the catalog pages
5. Repeat daily for new posts

Start now: install Grok Build, search X, file the first ingest issue, then build the pages above.
`;
