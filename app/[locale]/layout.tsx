import "@/styles/global.css";
import "@/styles/variables.css";

import type { ReactNode } from "react";

import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { CSSVariables } from "@/components/css-variables";
import { routing } from "@/i18n/routing";
import { query } from "@/queries/config";
import { getData } from "@/services/get-data";
import { bodyFont, headlineFont } from "@/styles/fonts";
import type { ConfigCollection } from "@/types/contentful";
import { BoxShadowToggler } from "@/utils/debug";

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({ children, params }: Props) {
	const data = await getData<{ configCollection: ConfigCollection }>({ query });
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
