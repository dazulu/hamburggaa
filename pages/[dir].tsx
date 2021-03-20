import React from 'react';
import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from 'next';
import { fetchContent } from '@/utils/contentful';
import { Meta } from '@/components/meta';
import { Page as PageProps } from '@/types/contentful';
import { PathParams } from '@/types/page';
import { query as pageQuery } from '@/queries/page';
import { query as pathsQuery } from '@/queries/paths';

export const Page: React.FC<{ data: PageProps }> = ({ data }) => {
  const { metaInformation } = data;
  return (
    <>
      <Meta data={metaInformation} />
      <div>Some Page</div>
    </>
  );
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
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<{ data: PageProps }>
> {
  const response = await fetchContent(pageQuery, {
    dir: params.dir,
  });
  return {
    props: {
      data: {
        ...response.navigationConfigCollection.items[0].linkedFrom
          .pageCollection.items[0],
      },
    },
  };
}

export default Page;
