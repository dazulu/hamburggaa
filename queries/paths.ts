import { gql } from '@apollo/client';

export const query = gql`
  query($locale: String) {
    navigationConfigCollection(where: { dir_not_in: "ROOT" }, locale: $locale) {
      items {
        dir
        slug
      }
    }
  }
`;
