import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { messages } from "@/lib/i18n/messages";
import { URL_LOCALES, htmlLang, isUrlLocale, ogLocale, urlToLocale } from "@/lib/i18n/paths";
import { site } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return URL_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isUrlLocale(raw)) return {};
  const locale = urlToLocale[raw];
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${messages[locale].home.title}`,
      template: `%s | ${site.name}`,
    },
    description: messages[locale].home.subtitle,
    applicationName: site.name,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: ogLocale[raw],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isUrlLocale(locale)) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink antialiased">
        <Providers>
          <Suspense fallback={<div className="h-12 border-b border-line bg-canvas/90" />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
