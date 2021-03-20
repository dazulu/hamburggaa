export const query = `
	query ($dir: String!)  {
		navigationConfigCollection(where: {dir: $dir}, limit: 1) {
			items {
				linkedFrom {
					pageCollection(limit: 1) {
						items {
							metaInformation {
								metaTitle
								metaDescription
							}
						}
					}
				}
			}
		}
	}
`;
