import Template from "@/ui/template/page";
import { query } from "@/queries/page";
import type { NavigationConfigCollection } from "@/types/contentful";

async function getData(locale: string, slug: string) {
  const pageResponse = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { slug, locale },
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

export default async function Page({
  params: { locale, route },
}: {
  params: { locale: string; route: string };
}) {
  const data = await getData(locale, route);

  return <Template data={data} />;
}
