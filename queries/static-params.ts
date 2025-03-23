export const query = `
  query($locale: String!) {
    pageCollection(limit: 50, locale: $locale) {
      items {
        slug
      }
    }
  }
`;
