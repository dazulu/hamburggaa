export const query = `
  {
    themeCollection(limit: 1) {
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
