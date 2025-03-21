import "@/styles/global.css";
import "@/styles/variables.css";

import Footer from "@/ui/footer";
import { Header } from "@/ui/header";
import { getLocale } from "next-intl/server";

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
      <Footer locale={locale} />
    </>
  );
}
