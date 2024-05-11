import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useConfig } from '@/context/config';

export const Logo = ({ small }: { small?: boolean }) => {
  const {
    logo: { description, url },
  } = useConfig();

  const src = small ? `${url}?fm=png&w=120&q=75` : `${url}?fm=png&w=280&q=75`;

  return (
    <Link href="/">
      <Image
        src={src}
        width={small ? 60 : 140}
        height={small ? 56 : 135}
        alt={description}
      />
    </Link>
  );
};
