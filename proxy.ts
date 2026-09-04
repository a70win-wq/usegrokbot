import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_URL_LOCALE,
  LOCALE_COOKIE,
  detectUrlLocaleFromHeader,
  isUrlLocale,
  type UrlLocale,
} from "@/lib/i18n/paths";

const SKIP = new Set([
  "sitemap.xml",
  "robots.txt",
  "icon",
  "favicon.ico",
  "apple-icon",
  "opengraph-image",
  "twitter-image",
]);

const SOCIAL_CRAWLER =
  /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Slackbot|WhatsApp|TelegramBot|Discordbot|Iframely|Embedly|redditbot|Pinterest|Googlebot|bingbot|Applebot|SkypeUriPreview/i;

function isSocialCrawler(request: NextRequest) {
  return SOCIAL_CRAWLER.test(request.headers.get("user-agent") ?? "");
}

function detectUrlLocale(request: NextRequest): UrlLocale {
  if (isSocialCrawler(request)) return DEFAULT_URL_LOCALE;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isUrlLocale(cookie)) return cookie;
  return detectUrlLocaleFromHeader(request.headers.get("accept-language"));
}

const CANONICAL_HOST = "usegrokbot.com";

function apexRedirect(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0] ?? "";
  if (host !== `www.${CANONICAL_HOST}`) return null;
  const url = request.nextUrl.clone();
  url.hostname = CANONICAL_HOST;
  url.protocol = "https";
  url.port = "";
  return NextResponse.redirect(url, 301);
}

const DISCOVER_DETAIL_PATH = /^\/(?:(?:en|zh-hk|zh-cn)\/)?discover\/[^/]+\/?$/;

export async function proxy(request: NextRequest) {
  const hostRedirect = apexRedirect(request);
  if (hostRedirect) return hostRedirect;

  const { pathname } = request.nextUrl;
  if (DISCOVER_DETAIL_PATH.test(pathname)) {
    const { retiredDiscoverDestination } = await import("@/lib/retired-discover-redirects");
    const retiredDestination = retiredDiscoverDestination(pathname);
    if (retiredDestination) {
      return NextResponse.redirect(new URL(retiredDestination), 308);
    }
  }
  const last = pathname.split("/").filter(Boolean).pop() ?? "";

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || SKIP.has(last) || /\.[a-zA-Z0-9]+$/.test(last)) {
    return NextResponse.next();
  }

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isUrlLocale(first)) {
    const headers = new Headers(request.headers);
    headers.set("x-url-locale", first);
    const response = NextResponse.next({ request: { headers } });
    response.cookies.set(LOCALE_COOKIE, first, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const locale = detectUrlLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  // Crawlers often skip 307s and never see og:image. Serve the locale page in place.
  if (isSocialCrawler(request)) {
    const headers = new Headers(request.headers);
    headers.set("x-url-locale", locale);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  const response = NextResponse.redirect(url, 307);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
