import Template from '@/ui/template/page';
import { LOCALES } from '../../i18n';
import { query as pageQuery } from '@/queries/page';

import type { NavigationConfigCollection } from '@/types/contentful';

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

  return {
    page,
  };
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Page({ params: { lang } }): Promise<JSX.Element> {
  // Fetch data directly in a Server Component
  const data = await getData(lang);
  // Forward fetched data to your Client Component
  return <Template data={data} />;
}
