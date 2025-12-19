import { query } from "@/queries/page";
import { getData } from "@/services/get-data";
import type { PageCollection } from "@/types/contentful";
import Template from "@/ui/template/page";

export default async function PageRenderer({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
	const data = await getData<{ pageCollection: PageCollection }>({
		query,
		variables: { locale, slug },
	});

	const pageData = data.pageCollection.items[0];

	return <Template data={pageData} />;
}
