"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { LOCALES } from "@/i18n/locales";
import { Link, usePathname } from "@/i18n/routing";
import flagDE from "@/public/images/flag_de.png";
import flagEN from "@/public/images/flag_en.png";
import { Locale } from "@/types/i18n";
import type { AllSlugs } from "@/utils/alternate-language-slugs";
import { getAlternateSlug } from "@/utils/alternate-language-slugs";

import styles from "./styles.module.css";

interface LanguageSwitcherProps {
	allPageSlugs: AllSlugs;
}

export const LanguageSwitcher = ({ allPageSlugs }: LanguageSwitcherProps) => {
	const activeLocale = useLocale();
	const pathname = usePathname();

	const getLanguageLabel = (locale: string) => {
		return locale === Locale.EN ? "Switch to English" : "Auf Deutsch wechseln";
	};

	const currentSlug = pathname.replace(/^\//, "") || "ROOT";

	return LOCALES.filter((locale) => locale !== activeLocale).map((locale) => {
		const image = locale === Locale.EN ? flagEN : flagDE;
		const languageLabel = getLanguageLabel(locale);
		const href = getAlternateSlug(currentSlug, activeLocale, locale, allPageSlugs);

		return (
			<Link
				key={locale}
				href={href}
				className={styles.link}
				aria-label={languageLabel}
				title={languageLabel}
				locale={locale}
			>
				<Image
					aria-hidden="true"
					alt=""
					src={image}
					width={38}
					height={38}
				/>
			</Link>
		);
	});
};
