import { gql } from '@apollo/client';

export const query = gql`
  query($locale: String) {
    navigationMenuCollection(where: { location: "main" }, locale: $locale) {
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
