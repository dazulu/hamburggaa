import { Header } from "@/ui/header";
import { getLocale } from "next-intl/server";

import "@/styles/global.css";
import "@/styles/variables.css";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <>
      <Header locale={locale} />
      {children}
    </>
  );
}
