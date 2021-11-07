import React, { VFC } from 'react';
import styles from './styles.module.scss';
import { useNavigation } from '@/context/navigation';
import { Logo } from '@/components/logo';
import { Navigation } from '@/components/nav';
import { SocialIcons } from '@/components/social';
import { LanguageSwitcher } from '@/components/language-switcher';

export const Sidebar: VFC = () => {
  const { navIsOpen } = useNavigation();
  return (
    <div className={`${styles.sidebar} ${navIsOpen ? styles.open : ''}`}>
      <Logo />
      <Navigation />
      <LanguageSwitcher />
      <SocialIcons />
    </div>
  );
};
