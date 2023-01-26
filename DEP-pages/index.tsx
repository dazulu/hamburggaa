import apolloClient from '@/utils/apollo-client';
import React, { FC } from 'react';
import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import { query as pageQuery } from '@/queries/page';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';
import { PageData } from '@/types/page';
import { Layout } from '@/components/layout';
import { GetStaticProps } from 'next';

export const Home: FC<PageData> = ({ data }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout data={data} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}): Promise<GetStaticPropsResult<PageData>> => {
  // Get page data for ROOT home page
  const { data: response } = await apolloClient.query({
    query: pageQuery,
    variables: {
      dir: 'ROOT',
      locale,
    },
  });

  // Get navigation data from Contentful
  const { data: navigationResponse } = await apolloClient.query({
    query: navigationQuery,
    variables: {
      locale,
    },
  });

  // Get site config theme data from Contentful
  const { data: configResponse } = await apolloClient.query({
    query: configQuery,
    variables: {
      locale,
    },
  });

  return {
    props: {
      data: {
        page: {
          ...response.navigationConfigCollection.items[0].linkedFrom
            .pageCollection.items[0],
        },
        navigation:
          navigationResponse.navigationMenuCollection.items[0].itemsCollection
            .items,
        config: configResponse.themeCollection.items[0],
      },
    },
    revalidate: 60, // ISR
  };
};

export default Home;
