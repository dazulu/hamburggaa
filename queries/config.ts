import { gql } from '@apollo/client';

export const query = gql`
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