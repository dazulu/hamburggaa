import SharedPage from "@/app/shared-page";
import { LOCALES } from "@/i18n/locales";
import { getLocale } from "next-intl/server";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale, route: "/" }));
}

export default async function Page() {
  const locale = await getLocale();

  return SharedPage({
    params: { locale, route: "ROOT" },
  });
}
