import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_URL_LOCALE,
  LOCALE_COOKIE,
  detectUrlLocaleFromHeader,
  isUrlLocale,
  type UrlLocale,
} from "@/lib/i18n/paths";

const SKIP = new Set(["sitemap.xml", "robots.txt", "icon", "favicon.ico", "apple-icon"]);

function detectUrlLocale(request: NextRequest): UrlLocale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isUrlLocale(cookie)) return cookie;
  return detectUrlLocaleFromHeader(request.headers.get("accept-language"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
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
  const response = NextResponse.redirect(url, 307);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|sitemap.xml|robots.txt|.*\\..*).*)"],
};
