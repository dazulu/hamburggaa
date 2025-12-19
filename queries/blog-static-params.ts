export const query = `
  query($locale: String!) {
    blogPostCollection(limit: 100, locale: $locale) {
      items {
        slug
      }
    }
  }
`;
