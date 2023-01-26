import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import flagEN from '../../public/images/flag_en.png';
import flagDE from '../../public/images/flag_de.png';

export enum Locale {
  EN = 'en',
  DE = 'de',
}

export interface Locales {
  locale: Locale;
  name: string;
}

const localeNames: Record<Locale, string> = {
  [Locale.EN]: 'Website in English',
  [Locale.DE]: 'Website auf Deutsch',
};

export const LanguageSwitcher: FC = () => {
  const router = useRouter();
  const locales = router.locales.map(
    (locale: Locale): Locales => ({
      locale,
      name: localeNames[locale],
    })
  );

  return (
    <div className={styles.links}>
      {locales.map(({ locale, name }) => {
        const image = locale === Locale.EN ? flagEN : flagDE;
        return (
          <Link
            key={locale}
            href="/"
            locale={locale}
            className={`${styles.link} ${
              router.locale === locale && styles.active
            }`}
            title={name}
          >
            <Image alt="" src={image} width={30} height={30} />
          </Link>
        );
      })}
    </div>
  );
};
