export const query = `
  query($locale: String) {
    configCollection(limit: 1, locale: $locale) {
      items {
        sys {
          id
        }
        name
        emailAddress
        phoneNumber
        logo {
          description
          url
          width
          height
        }
        primaryColour
        secondaryColour
      }
    }
  }
`;
