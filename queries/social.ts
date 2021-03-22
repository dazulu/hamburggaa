export const query = `
  {
    socialMediaLinkCollection(order: type_ASC) {
      items {
        sys {
          id
        }
        type
        link
      }
    }
  }
`;
