import { JsonLd } from "@/components/json-ld";
import { i18n } from "@/i18n/translations";
import { query } from "@/queries/page";
import { getData } from "@/services/get-data";
import type { PageCollection } from "@/types/contentful";
import Template from "@/ui/template/page";
import { BASE_URL } from "@/utils/constants";
import { getOrganizationSchema } from "@/utils/organization-schema";

export default async function PageRenderer({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
	const data = await getData<{ pageCollection: PageCollection }>({
		query,
		variables: { locale, slug },
	});

	const pageData = data.pageCollection.items[0];

	const isHomepage = slug === "ROOT";
	const pageUrl = isHomepage ? `${BASE_URL}/${locale}` : `${BASE_URL}/${locale}/${slug}`;
	const organizationSchema = await getOrganizationSchema(locale);

	const webPageJsonLd = {
		"@context": "https://schema.org",
		"@type": isHomepage ? "WebSite" : "WebPage",
		name: pageData.seoTitle || undefined,
		description: pageData.seoDescription || undefined,
		url: pageUrl,
		inLanguage: locale,
		image: pageData.seoImage?.url || undefined,
		publisher: organizationSchema,
		...(isHomepage && {
			mainEntity: { "@id": `${BASE_URL}/#organization` },
		}),
	};

	const breadcrumbJsonLd = !isHomepage
		? {
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: i18n[locale].breadcrumb.home,
						item: `${BASE_URL}/${locale}`,
					},
					{
						"@type": "ListItem",
						position: 2,
						name: pageData.seoTitle || pageData.menuLabel || slug,
						item: pageUrl,
					},
				],
			}
		: null;

	return (
		<>
			<JsonLd data={webPageJsonLd} />
			{breadcrumbJsonLd && <JsonLd data={breadcrumbJsonLd} />}
			<Template data={pageData} />
		</>
	);
}
