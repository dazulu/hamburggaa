"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

import { LOCALES } from "@/i18n/locales";
import { Link } from "@/i18n/routing";
import flagDE from "@/public/images/flag_de.png";
import flagEN from "@/public/images/flag_en.png";
import { Locale } from "@/types/i18n";

import styles from "./styles.module.css";

export const LanguageSwitcher = () => {
	const activeLocale = useLocale();

	const getLanguageLabel = (locale: string) => {
		return locale === Locale.EN ? "Switch to English" : "Auf Deutsch wechseln";
	};

	return LOCALES.filter((locale) => locale !== activeLocale).map((locale) => {
		const image = locale === Locale.EN ? flagEN : flagDE;
		const languageLabel = getLanguageLabel(locale);

		return (
			<Link
				key={locale}
				href="/"
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
