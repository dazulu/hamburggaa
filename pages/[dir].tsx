import apolloClient from '@/utils/apollo-client';
import React from 'react';
import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from 'next';
import { PageData, PathParams } from '@/types/page';
import { query as pageQuery } from '@/queries/page';
import { query as pathsQuery } from '@/queries/paths';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';
import { Layout } from '@/components/layout';

export const Page: React.FC<PageData> = ({ data }) => {
  return <Layout data={data} />;
};

// ToDo: Calls based on locales from getStaticPaths context
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const {
    data: {
      navigationConfigCollection: { items: navigationEN },
    },
  } = await apolloClient.query({
    query: pathsQuery,
    variables: {
      locale: 'en',
    },
  });

  const {
    data: {
      navigationConfigCollection: { items: navigationDE },
    },
  } = await apolloClient.query({
    query: pathsQuery,
    variables: {
      locale: 'de',
    },
  });

  const pathsEN = navigationEN.reduce(
    (acc, { dir, slug }) => [...acc, { params: { dir, slug }, locale: 'en' }],
    []
  );
  const pathsDE = navigationDE.reduce(
    (acc, { dir, slug }) => [...acc, { params: { dir, slug }, locale: 'de' }],
    []
  );

  return {
    paths: [...pathsEN, ...pathsDE],
    fallback: true,
  };
}

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<PageData>> {
  // Get all paths from Contentful navigation configuration
  const {
    data: {
      navigationConfigCollection: { items: paths },
    },
  } = await apolloClient.query({
    query: pathsQuery,
    variables: {
      locale,
    },
  });

  // Find current path matching localised slug passed in from context
  const path = paths.find(({ slug }) => slug === params.dir);
  const { data: response } = await apolloClient.query({
    query: pageQuery,
    variables: {
      dir: path.dir,
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
  };
}

export default Page;
