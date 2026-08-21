import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/how-we-built",
    title: "pages.builtTitle",
    description: "pages.builtBody",
  });
}

export default function HowWeBuiltLayout({ children }: { children: React.ReactNode }) {
  return children;
}
