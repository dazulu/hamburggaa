import { query } from "@/queries/config";
import { getData } from "@/services/get-data";
import type { ConfigCollection } from "@/types/contentful";

export async function getOrganizationSchema(locale: string) {
	const data = await getData<{ configCollection: ConfigCollection }>({
		query,
		variables: { locale },
	});

	const config = data.configCollection.items[0];

	return {
		"@type": "SportsOrganization",
		name: config.name,
		foundingDate: config.foundingYear,
		sport: config.activities?.join(", "),
		location: config.location,
		logo: config.logo?.url
			? {
					"@type": "ImageObject",
					url: config.logo.url,
				}
			: undefined,
	};
}
