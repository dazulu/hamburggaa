'use client';

import styles from './styles.module.scss';

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.crest}>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Learn</a>
        </li>
        <li>
          <a href="/">Join Us</a>
        </li>
        <li>
          <a href="/">Shop</a>
        </li>
        <li>
          <a href="/">Contact</a>
        </li>
      </ul>
    </nav>
  );
};
