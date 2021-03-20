import Head from 'next/head';
import { GetStaticPropsResult } from 'next';
import { fetchContent } from '@/utils/contentful';
import { Meta } from '@/components/meta';
import { Page as PageProps } from '@/types/contentful';

export const Home: React.FC<{ data: PageProps }> = ({ data }) => {
  const { metaInformation } = data;
  return (
    <>
      <Meta data={metaInformation} />
      <div className="container">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">
            Don't forget your shovel if you're going to go to work!
          </h1>
        </main>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ data: PageProps }>
> {
  const response = await fetchContent(
    `{
      navigationConfigCollection(where: {dir: "ROOT"}, limit: 1) {
        items {
          linkedFrom {
            pageCollection(limit: 1) {
              items {
                metaInformation {
                  metaTitle
                  metaDescription
                }
              }
            }
          }
        }
      }
    }`
  );
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
