export const query = `
  query($locale: String) {
    navigationConfigCollection(where: { dir_not_in: "ROOT" }, locale: $locale) {
      items {
        dir
        slug
      }
    }
  }
`;
