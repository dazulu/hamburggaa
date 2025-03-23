import { LOCALES } from "@/i18n/locales";
import SharedPage from "@/app/shared-page";
import { getLocale } from "next-intl/server";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale, slug: "/" }));
}

export default async function Page() {
  const locale = await getLocale();

  return SharedPage({
    params: { locale, slug: "ROOT" },
  });
}
