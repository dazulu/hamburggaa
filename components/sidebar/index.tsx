import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/nav';
import { SocialIcons } from '@/components/social';

export const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Navigation />
      <SocialIcons />
    </div>
  );
};
