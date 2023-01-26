import apolloClient from '@/utils/apollo-client';
import { query as pageQuery } from '@/queries/page';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';

import HomePage from './homePage';

async function getData(lang) {
  const { data: response } = await apolloClient.query({
    query: pageQuery,
    variables: {
      dir: 'ROOT',
      locale: lang,
    },
  });

  // Get navigation data from Contentful
  const { data: navigationResponse } = await apolloClient.query({
    query: navigationQuery,
    variables: {
      locale: lang,
    },
  });

  // Get site config theme data from Contentful
  const { data: configResponse } = await apolloClient.query({
    query: configQuery,
    variables: {
      locale: lang,
    },
  });

  return {
    page: {
      ...response.navigationConfigCollection.items[0].linkedFrom.pageCollection
        .items[0],
    },
    navigation:
      navigationResponse.navigationMenuCollection.items[0].itemsCollection
        .items,
    config: configResponse.themeCollection.items[0],
  };
}

export default async function Page({ params: { lang } }): Promise<JSX.Element> {
  // Fetch data directly in a Server Component
  const data = await getData(lang);
  // Forward fetched data to your Client Component
  return <HomePage data={data} />;
}
