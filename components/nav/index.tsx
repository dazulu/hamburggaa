import React from 'react';
import { useLinks } from '@/context/links';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Navigation: React.FC = () => {
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
                <img
                  className={styles.icon}
                  src="/icons/external.svg"
                  width="16"
                  height="16"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
