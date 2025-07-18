export const gqlEndpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`;

export const getOptions = (options) => {
	return {
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
		},
		body: JSON.stringify(options),
	};
};
