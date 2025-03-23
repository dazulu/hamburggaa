export const query = `
  query {
    configCollection(limit: 1) {
      items {
        socialMediaLinksCollection {
          items {
            sys {
              id
            }
            type
            link
          }
        }
      }
    }
  }
`;
