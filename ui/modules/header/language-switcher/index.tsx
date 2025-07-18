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

	return (
		<div className={styles.links}>
			{LOCALES.map((locale) => {
				const image = locale === Locale.EN ? flagEN : flagDE;
				return (
					<Link
						key={locale}
						href="/"
						className={`${styles.link} ${activeLocale === locale && styles.active}`}
						title={locale.toUpperCase()}
						locale={locale}
					>
						<Image
							alt=""
							src={image}
							width={30}
							height={30}
						/>
					</Link>
				);
			})}
		</div>
	);
};
