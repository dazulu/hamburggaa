export const query = `
	{
		navigationConfigCollection(where: {dir_not_in: "ROOT"}) {
				items {
				dir
				slug
				}
		}
	}
`;
