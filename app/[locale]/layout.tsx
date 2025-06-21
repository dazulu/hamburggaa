import "@/styles/global.css";
import "@/styles/variables.css";

import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { bodyFont, headlineFont } from "@/services/fonts";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { BoxShadowToggler } from "@/utils/debug";
import { CSSVariables } from "@/components/css-variables";
import { ConfigCollection } from "@/types/contentful";
import { ReactNode } from "react";
import { getData } from "@/services/get-data";
import { notFound } from "next/navigation";
import { query } from "@/queries/config";
import { routing } from "@/i18n/routing";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: Props) {
  const data = await getData<ConfigCollection>({ query });
  const { primaryColour, secondaryColour } = data.configCollection.items[0];

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${headlineFont.variable}`}
    >
      <body>
        <CSSVariables
          primaryColour={primaryColour}
          secondaryColour={secondaryColour}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <BoxShadowToggler />
      </body>
    </html>
  );
}
