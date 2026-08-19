const KEY = "62d6505d7c4e672351306fbb847690dc";
const HOST = "usegrokbot.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const PATHS = [
  "/",
  "/discover",
  "/discover/competitor-monitor-jellypod",
  "/discover/overnight-sales-xai",
  "/discover/grok-bot-launch-bot",
  "/use-cases",
  "/use-cases/competitor-monitor",
  "/use-cases/lead-researcher",
  "/use-cases/daily-ai-news-brief",
  "/use-cases/inbox-organizer",
  "/use-cases/reddit-thread-scout",
  "/use-cases/travel-concierge",
  "/use-cases/youtube-comment-desk",
  "/use-cases/x-viral-scout",
  "/use-cases/monday-marketing-report",
  "/categories/sales",
  "/categories/marketing",
  "/categories/research",
  "/learn/what-is-grok-bot",
];

const LOCALES = ["en", "zh-hk", "zh-cn"];

function urlFor(path, locale) {
  if (path === "/") return `https://${HOST}/${locale}`;
  return `https://${HOST}/${locale}${path}`;
}

const urlList = LOCALES.flatMap((locale) => PATHS.map((path) => urlFor(path, locale)));

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
});

const endpoints = ["https://api.indexnow.org/indexnow", "https://www.bing.com/indexnow"];

for (const endpoint of endpoints) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body,
  });
  const text = await response.text();
  console.log(endpoint, response.status, text.slice(0, 300));
}
