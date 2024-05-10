import React from 'react';
import Image from 'next/image';
import { useLinks } from '@/context/links';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Navigation = () => {
  const { navigation } = useLinks();
  const filteredNavigation = navigation.filter((item) => item.dir !== 'ROOT');
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </li>
        {filteredNavigation.map((item) => {
          if (item.dir) {
            return (
              <li key={item.sys.id} className={styles.item}>
                <Link href={`/${item.slug}`} className={styles.link}>
                  {item.menuLabel}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.sys.id} className={styles.item}>
              <a
                href={item.url}
                target="_blank"
                className={styles.link}
                rel="noopener noreferrer"
              >
                {item.menuLabel}
                <Image
                  className={styles.icon}
                  src="/icons/external.svg"
                  width="16"
                  height="16"
                  alt=""
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
