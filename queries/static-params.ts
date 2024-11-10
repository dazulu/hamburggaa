export const query = `
  query($locale: String!) {
    navigationConfigCollection(limit: 50, locale: $locale) {
      items {
        slug
      }
    }
  }
`;
