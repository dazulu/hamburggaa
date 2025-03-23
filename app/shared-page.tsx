import type { PageCollection } from "@/types/contentful";
import Template from "@/ui/template/page";
import { getData } from "@/services/get-data";
import { query } from "@/queries/page";

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const data = await getData<PageCollection>({
    query,
    variables: { locale, slug },
  });

  const pageData = data.pageCollection.items[0];

  return <Template data={pageData} />;
}
