"use client";

import Image from "next/image";

import flagEN from "@/public/images/flag_en.png";
import flagDE from "@/public/images/flag_de.png";

import { useLang } from "@/hooks/use-lang";
import { Link } from "@/i18n/routing";
import { LOCALES } from "@/i18n/locales";

import { Locale } from "@/types/i18n";

import styles from "./styles.module.css";

export const LanguageSwitcher = () => {
  const activeLocale = useLang();

  return (
    <div className={styles.links}>
      {LOCALES.map((locale) => {
        const image = locale === Locale.EN ? flagEN : flagDE;
        return (
          <Link
            key={locale}
            href="/"
            className={`${styles.link} ${
              activeLocale === locale && styles.active
            }`}
            title={locale.toUpperCase()}
            locale={locale}
          >
            <Image alt="" src={image} width={30} height={30} />
          </Link>
        );
      })}
    </div>
  );
};
