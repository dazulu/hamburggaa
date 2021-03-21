import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/nav';

export const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Navigation />
    </div>
  );
};
