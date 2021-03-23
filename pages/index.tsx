import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import { query as pageQuery } from '@/queries/page';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';
import { PageData } from '@/types/page';
import { fetchContent } from '@/utils/contentful';
import { Layout } from '@/components/layout';

export const Home: React.FC<PageData> = ({ data }) => {
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
  GetStaticPropsResult<PageData>
> {
  const response = await fetchContent(pageQuery, {
    dir: 'ROOT',
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

export default Home;
