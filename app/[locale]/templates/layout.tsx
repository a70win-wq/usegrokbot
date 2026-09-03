import { templateIdentityUiCopy } from "@/data/template-identities";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const { urlLocale, locale } = localeFromParams(raw);
  const copy = templateIdentityUiCopy[locale];
  return pageMeta({
    path: "/templates",
    title: copy.title,
    description: copy.intro,
    urlLocale,
  });
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
