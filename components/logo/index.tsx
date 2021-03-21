import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <img
          src="/crest.png"
          className={styles.crest}
          alt="Hamburg GAA crest"
          width="140"
          height="136"
        />
      </a>
    </Link>
  );
};
