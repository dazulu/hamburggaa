import React from 'react';
import { useNavigation } from '@/context/navigation';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Navigation: React.FC = () => {
  const navigation = useNavigation();
  const filteredNavigation = navigation.filter((item) => item.dir !== 'ROOT');
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href="/">
            <a className={styles.link}>Home</a>
          </Link>
        </li>
        {filteredNavigation.map((item) => {
          return (
            <li key={item.dir} className={styles.item}>
              <Link href={`/${item.slug}`}>
                <a className={styles.link}>{item.menuLabel}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
