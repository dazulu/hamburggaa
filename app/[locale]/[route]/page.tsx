import SharedPage from "@/app/shared-page";
import { getLocale } from "next-intl/server";
import { query } from "@/queries/static-params";
import { LOCALES } from "@/i18n/locales";
import type { NavigationConfigCollection } from "@/types/contentful";

async function getData(locale: string) {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables: { locale },
        }),
      }
    );

    return await response.json().then(({ data }) =>
      (data.navigationConfigCollection as NavigationConfigCollection).items
        .filter(({ slug }) => slug !== "ROOT")
        .reduce((acc, { slug }) => {
          return [...acc, { locale, route: slug === "ROOT" ? "/" : slug }];
        }, [])
    );
  } catch {
    console.error("Failed to fetch data for [route] generateStaticParams");
    return [];
  }
}

export async function generateStaticParams() {
  const promises = LOCALES.map((locale) => getData(locale));
  const data = await Promise.all(promises);
  return data.flat();
}

export default async function Page({ params }) {
  const { route } = await params;
  const locale = await getLocale();
  return SharedPage({ params: { locale, route } });
}
