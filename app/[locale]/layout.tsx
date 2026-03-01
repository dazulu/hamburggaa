import "@/styles/global.css";
import "@/styles/variables.css";

import type { ReactNode } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { CSSVariables } from "@/components/css-variables";
import { routing } from "@/i18n/routing";
import { query } from "@/queries/config";
import { getData } from "@/services/get-data";
import { bodyFont, headlineFont } from "@/styles/fonts";
import type { ConfigCollection } from "@/types/contentful";
import { THEME_STORAGE_KEY } from "@/ui/modules/header/theme-toggle";
import { BoxShadowToggler } from "@/utils/debug";

export const metadata: Metadata = {
	title: {
		template: "%s | Hamburg GAA",
		default: "Hamburg GAA | Hurling, Camogie and Gaelic Football club in Hamburg, Germany",
	},
};

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
			<head>
				{/* Inline script to set theme before first paint, preventing flash of wrong theme */}
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: required for inline theme init script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
					}}
				/>
			</head>
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
