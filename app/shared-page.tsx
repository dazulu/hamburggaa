import type { NavigationConfigCollection } from "@/types/contentful";
import Template from "@/ui/template/page";
import { getData } from "@/services/get-data";
import { query } from "@/queries/page";

export default async function Page({
  params: { locale, route },
}: {
  params: { locale: string; route: string };
}) {
  const data = await getData<NavigationConfigCollection>({
    query,
    variables: { locale, slug: route },
  });

  const pageData =
    data.navigationConfigCollection.items[0].linkedFrom.pageCollection.items[0];

  return <Template data={pageData} />;
}
