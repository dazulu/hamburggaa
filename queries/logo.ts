export const query = `
  query($locale: String) {
    configCollection(limit: 1, locale: $locale) {
      items {
        logo {
          description
          url
          width
          height
        }
      }
    }
  }
`;
