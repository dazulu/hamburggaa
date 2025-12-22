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
        foundingYear
        location
        activities
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
