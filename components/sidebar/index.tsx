import React from 'react';
import styles from './styles.module.scss';
import { useNavigation } from '@/context/navigation';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/nav';
import { SocialIcons } from '@/components/social';

export const Sidebar: React.FC = () => {
  const { navIsOpen } = useNavigation();
  return (
    <div className={`${styles.sidebar} ${navIsOpen ? styles.open : ''}`}>
      <Logo />
      <Navigation />
      <SocialIcons />
    </div>
  );
};
