export const query = `
  query {
    themeCollection(limit: 1) {
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
