import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import { fetchContent } from '@/utils/contentful';
import { Layout } from '@/components/layout';
import { Page as PageProps } from '@/types/contentful';
import { query as pageQuery } from '@/queries/page';

export const Home: React.FC<{ data: PageProps }> = ({ data }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout data={data} />
    </>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ data: PageProps }>
> {
  const response = await fetchContent(pageQuery, {
    dir: 'ROOT',
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

export default Home;
