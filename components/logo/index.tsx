import React, { VFC } from 'react';
import Link from 'next/link';
import { useConfig } from '@/context/config';

export const Logo: VFC<{ small?: boolean }> = ({ small }) => {
  const {
    logo: { description, url },
  } = useConfig();

  const src = small ? `${url}?fm=png&w=120&q=75` : `${url}?fm=png&w=280&q=75`;

  return (
    <Link href="/">
      <a>
        <img src={src} alt={description} width={small ? 60 : 140} />
      </a>
    </Link>
  );
};
