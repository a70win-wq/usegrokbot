import { redirect } from "next/navigation";
import { localeFromParams } from "@/lib/i18n/paths";

export default async function DiscoverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale } = localeFromParams((await params).locale);
  redirect(`/${urlLocale}`);
}
