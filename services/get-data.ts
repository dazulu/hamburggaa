export const getData = async <T>({
	query,
	variables = {},
}: {
	query: string;
	variables?: Record<string, string | string[] | number | number[]>;
}): Promise<{ [key: string]: T }> => {
	try {
		const response = await fetch(
			`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
					Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
				},
				body: JSON.stringify({ query, variables }),
			},
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Contentful API Error Response:", errorText);
			throw new Error(`Contentful API error: ${response.status} ${response.statusText} - ${errorText}`);
		}

		const json = await response.json();

		if (json.errors) {
			console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
			throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
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
