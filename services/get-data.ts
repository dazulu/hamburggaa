export const getData = async <T>({
	query,
	variables = {},
}: {
	query: string;
	variables?: Record<string, string | string[] | number | number[]>;
}): Promise<{ [key: string]: T }> => {
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

	const json = await response.json();

	return json.data;
};
