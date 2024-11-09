import SharedPage from "@/app/shared-page";
import { getLocale } from "next-intl/server";

export async function generateStaticParams() {
  return [
    { locale: "en", route: "about" },
    { locale: "de", route: "ueber-uns" },
  ];
}

export default async function Page({ params }) {
  const { route } = await params;
  const locale = await getLocale();
  return SharedPage({ params: { locale, route } });
}
