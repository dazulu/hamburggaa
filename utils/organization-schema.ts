import { query } from "@/queries/config";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";

export async function getOrganizationSchema(locale: string) {
	const data = await getData<{ configCollection: ConfigCollection }>({
		query,
		variables: { locale },
	});

	const config = data.configCollection.items[0];

	const sameAs = config.socialMediaLinksCollection?.items
		?.map((item) => item?.link)
		.filter((link): link is string => Boolean(link));

	return {
		"@type": "SportsOrganization",
		"@id": `${process.env.NEXT_PUBLIC_BASE_URL}/#organization`,
		name: config.name,
		url: process.env.NEXT_PUBLIC_BASE_URL,
		foundingDate: config.foundingYear,
		sport: config.activities?.join(", "),
		location: config.location,
		email: config.emailAddress || undefined,
		telephone: config.phoneNumber || undefined,
		logo: config.logo?.url
			? {
					"@type": "ImageObject",
					url: config.logo.url,
				}
			: undefined,
		address: {
			"@type": "PostalAddress",
			addressLocality: "Hamburg",
			addressCountry: "DE",
		},
		sameAs: sameAs?.length ? sameAs : undefined,
	};
}
