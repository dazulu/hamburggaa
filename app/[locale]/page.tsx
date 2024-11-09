import SharedPage from "@/app/shared-page";
import { getLocale } from "next-intl/server";

export async function generateStaticParams() {
  return [
    { locale: "en", route: "ROOT" },
    { locale: "de", route: "ROOT" },
  ];
}

export default async function Page() {
  const locale = await getLocale();

  return SharedPage({
    params: { locale, route: "ROOT" },
  });
}
