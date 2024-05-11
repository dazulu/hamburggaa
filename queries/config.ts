export const query = `
  query($locale: String) {
    themeCollection(limit: 1, locale: $locale) {
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
        primaryColor
        secondaryColor
      }
    }
  }
`;
