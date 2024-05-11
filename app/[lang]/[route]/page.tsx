import Template from '@/ui/template/page';
import { LOCALES } from '../../../i18n';
import { query as pageQuery } from '@/queries/page';

import type { NavigationConfigCollection } from '@/types/contentful';

async function getData(lang, route) {
  const pageResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: pageQuery,
        variables: { dir: route, locale: lang },
      }),
    }
  );
  const page = await pageResponse
    .json()
    .then(
      ({ data }) =>
        (data.navigationConfigCollection as NavigationConfigCollection).items[0]
          .linkedFrom.pageCollection.items[0]
    );

  return {
    page,
  };
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Page({
  params: { lang, route },
}): Promise<JSX.Element> {
  // Fetch data directly in a Server Component
  const data = await getData(lang, route);
  // Forward fetched data to your Client Component
  return <Template data={data} />;
}
