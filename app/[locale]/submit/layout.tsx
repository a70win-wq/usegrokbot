import { messageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return messageMeta(locale, {
    path: "/submit",
    title: "submit.title",
    description: "submit.body",
  });
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
