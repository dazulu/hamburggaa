import React from 'react';
import styles from './styles.module.scss';
import { Logo } from '@/components/logo';
import { BurgerButton } from '@/components/burger-button';

export const MobileHeader = () => {
  return (
    <div className={styles.header}>
      <Logo small />
      <BurgerButton />
    </div>
  );
};
