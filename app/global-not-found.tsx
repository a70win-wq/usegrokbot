import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Page not found",
  description: "That URL is not in the library.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink antialiased">
        <div className="mx-auto max-w-[640px] px-5 py-24 text-center">
          <BlobatarAvatar name="usegrokbot-lost-bot" size={104} expression="sad" className="mx-auto mb-6" />
          <h1 className="text-3xl font-medium tracking-tight text-ink">Page not found</h1>
          <p className="mt-3 text-mute">That URL is not in the library.</p>
          <Link
            href="/en"
            className="accent-gradient mt-8 inline-flex h-11 items-center rounded-[10px] px-5 text-sm font-medium text-inverse"
          >
            Browse posts
          </Link>
        </div>
      </body>
    </html>
  );
}
