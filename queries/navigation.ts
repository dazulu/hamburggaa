export const query = `
  {
    navigationMenuCollection(where: { location: "main"}) {
      items {
        itemsCollection {
          items {
            dir
            slug
            menuLabel
          }
        }
      }
    }
  }
`;
