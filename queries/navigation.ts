export const query = `
  {
    navigationMenuCollection(where: {location: "main"}) {
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
