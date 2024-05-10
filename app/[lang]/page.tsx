import { query as pageQuery } from '@/queries/page';
import { query as navigationQuery } from '@/queries/navigation';
import { query as configQuery } from '@/queries/config';

import HomePage from './home-page';
import { LOCALES } from '../../i18n';

import type {
  NavigationMenuCollection,
  NavigationConfigCollection,
  ThemeCollection,
} from '@/types/contentful';

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

function getOptions(options) {
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(options),
  };
}
async function getData(lang) {
  const pageResponse = await fetch(
    endpoint,
    getOptions({ query: pageQuery, variables: { dir: 'ROOT', locale: lang } })
  );
  const page = await pageResponse
    .json()
    .then(
      ({ data }) =>
        (data.navigationConfigCollection as NavigationConfigCollection).items[0]
          .linkedFrom.pageCollection.items[0]
    );

  const navigationResponse = await fetch(
    endpoint,
    getOptions({
      query: navigationQuery,
      variables: {
        locale: lang,
      },
    })
  );
  const navigation = await navigationResponse
    .json()
    .then(
      ({ data }) =>
        (data.navigationMenuCollection as NavigationMenuCollection).items[0]
          .itemsCollection.items
    );

  const themeResponse = await fetch(
    endpoint,
    getOptions({
      query: configQuery,
      variables: {
        locale: lang,
      },
    })
  );
  const theme = await themeResponse
    .json()
    .then(({ data }) => (data.themeCollection as ThemeCollection).items[0]);

  return {
    page,
    navigation,
    theme,
  };
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Page({ params: { lang } }): Promise<JSX.Element> {
  // Fetch data directly in a Server Component
  const data = await getData(lang);
  // Forward fetched data to your Client Component
  return <HomePage data={data} />;
}
