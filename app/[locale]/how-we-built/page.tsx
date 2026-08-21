import { HowWeBuiltView } from "@/components/HowWeBuiltView";

export default async function HowWeBuiltPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HowWeBuiltView locale={locale} />;
}
