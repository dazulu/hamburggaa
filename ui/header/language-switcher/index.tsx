"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./styles.module.scss";
import flagEN from "@/public/images/flag_en.png";
import flagDE from "@/public/images/flag_de.png";

import { LOCALES } from "i18n";

import { useLang } from "@/hooks/use-lang";

import { Locale } from "@/types/i18n";

export const LanguageSwitcher: React.FC = () => {
  const lang = useLang();

  return (
    <div className={styles.links}>
      {LOCALES.map((locale) => {
        const image = locale === Locale.EN ? flagEN : flagDE;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            className={`${styles.link} ${lang === locale && styles.active}`}
            title={locale.toUpperCase()}
          >
            <Image alt="" src={image} width={30} height={30} />
          </Link>
        );
      })}
    </div>
  );
};
