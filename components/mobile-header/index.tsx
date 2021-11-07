import React, { VFC } from 'react';
import styles from './styles.module.scss';
import { Logo } from '@/components/logo';
import { BurgerButton } from '@/components/burger-button';

export const MobileHeader: VFC = () => {
  return (
    <div className={styles.header}>
      <Logo small />
      <BurgerButton />
    </div>
  );
};
