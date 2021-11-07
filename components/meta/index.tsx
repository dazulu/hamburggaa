import React, { VFC } from 'react';
import Head from 'next/head';
import { MetaTags } from '@/types/contentful';

export const Meta: VFC<{ data: MetaTags }> = ({ data }) => {
  const { metaTitle, metaDescription } = data;
  return (
    <Head>
      {metaTitle && (
        <>
          <title key="title">{metaTitle}</title>
          <meta key="og-title" property="og:title" content={metaTitle} />
        </>
      )}

      {metaDescription && (
        <>
          <meta
            key="description"
            name="description"
            content={metaDescription}
          />
          <meta
            key="og-description"
            property="og:description"
            content={metaDescription}
          />
        </>
      )}
    </Head>
  );
};
