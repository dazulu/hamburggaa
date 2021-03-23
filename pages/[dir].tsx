import React from 'react';
import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from 'next';
import { fetchContent } from '@/utils/contentful';
import { PageData, PathParams } from '@/types/page';
import { query as pageQuery } from '@/queries/page';
import { query as pathsQuery } from '@/queries/paths';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';
import { Layout } from '@/components/layout';

export const Page: React.FC<PageData> = ({ data }) => {
  return <Layout data={data} />;
};

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const response = await fetchContent(pathsQuery);

  const paths = response.navigationConfigCollection.items.map(
    ({ dir, slug }: PathParams) => ({
      params: { dir, slug },
    })
  );
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<PageData>> {
  const response = await fetchContent(pageQuery, {
    dir: params.dir,
  });
  const navigationResponse = await fetchContent(navigationQuery);
  const configResponse = await fetchContent(configQuery);

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
