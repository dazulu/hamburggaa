export const query = `
  query {
    en: pageCollection(limit: 100, locale: "en") {
      items {
        slug
        sys {
          id
          locale
        }
      }
    }
    de: pageCollection(limit: 100, locale: "de") {
      items {
        slug
        sys {
          id
          locale
        }
      }
    }
  }
`;
