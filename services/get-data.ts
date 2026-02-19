const minifyQuery = (query: string) =>
	// If this stops working, consider https://www.npmjs.com/package/gqlmin
	query
		.replace(/\s+/g, " ")
		.replace(/\s*([{}(),:])\s*/g, "$1")
		.trim();

export const getData = async <T>({
	query,
	variables = {},
}: {
	query: string;
	// biome-ignore lint/suspicious/noExplicitAny: not worth typing this
	variables?: any;
}): Promise<T> => {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({ query: minifyQuery(query), variables, preview: false }),
				// next: {
				// 	// Cache for 1 hour in production
				// 	revalidate: process.env.NODE_ENV === "production" ? 3600 : 0,
				// },
			},
		);

		if (process.env.CONTENTFUL_LOG_COMPLEXITY === "true") {
			const queryCost = response.headers.get("X-Contentful-Graphql-Query-Cost");
			if (queryCost) {
				console.info(`GraphQL complexity: ${queryCost}/11000`);
			}
		}

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Contentful API Error Response:", errorText);
			throw new Error(`Contentful API error: ${response.status} ${response.statusText} - ${errorText}`);
		}

		const json = await response.json();

		if (json.errors) {
			const hasUnresolvableLinks = json.errors.some(
				(error: { extensions?: { contentful?: { code?: string } } }) =>
					error.extensions?.contentful?.code === "UNRESOLVABLE_LINK",
			);

			if (hasUnresolvableLinks) {
				console.warn("GraphQL unresolvable link warnings (draft content):", JSON.stringify(json.errors, null, 2));
			} else {
				console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
				throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
			}
		}

		if (!json.data) {
			throw new Error("No data returned from Contentful API");
		}

		return json.data;
	} catch (error) {
		console.error("Error fetching data from Contentful:", error);
		throw error;
	}
};
