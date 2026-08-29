const KEY = "62d6505d7c4e672351306fbb847690dc";
const HOST = "usegrokbot.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const PATHS = [
  "/",
  "/discover",
  "/discover/clear-email-elon",
  "/discover/week-of-hacks-nate-herk",
  "/discover/household-bots-blake-king",
  "/discover/overnight-sales-xai",
  "/discover/grok-bot-launch-bot",
  "/categories/sales",
  "/categories/marketing",
  "/categories/research",
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
