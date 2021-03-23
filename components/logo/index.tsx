import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useConfig } from '@/context/config';

export const Logo: React.FC = () => {
  const {
    logo: { description, url },
  } = useConfig();
  return (
    <Link href="/">
      <a className={styles.link}>
        <img
          src={`${url}?fm=png&w=280&q=75`}
          className={styles.crest}
          alt={description}
          width="140"
        />
      </a>
    </Link>
  );
};
