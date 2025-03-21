export const query = `
  query($locale: String, $location: String) {
    navigationMenuCollection(where: { location: $location }, locale: $locale) {
      items {
        itemsCollection {
          items {
            ... on NavigationConfig {
              sys {
                id
              }
              dir
              slug
              menuLabel
            }
            ... on ExternalNavigationLink {
              sys {
                id
              }
              url
              menuLabel
            }
          }
        }
      }
    }
  }
`;
