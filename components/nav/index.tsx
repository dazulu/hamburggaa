import React, { VFC } from 'react';
import Image from 'next/image';
import { useLinks } from '@/context/links';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Navigation: VFC = () => {
  const { navigation } = useLinks();
  const filteredNavigation = navigation.filter((item) => item.dir !== 'ROOT');
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">
            <a className={styles.link}>Home</a>
          </Link>
        </li>
        {filteredNavigation.map((item) => {
          if (item.dir) {
            return (
              <li key={item.sys.id} className={styles.item}>
                <Link href={`/${item.slug}`}>
                  <a className={styles.link}>{item.menuLabel}</a>
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
