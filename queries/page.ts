export const query = `
  query($dir: String!, $locale: String) {
    navigationConfigCollection(where: { dir: $dir }, limit: 1) {
      items {
        linkedFrom {
          pageCollection(limit: 1) {
            items {
              metaInformation(locale: $locale) {
                metaTitle
                metaDescription
              }
              modulesCollection(locale: $locale) {
                items {
                  ... on Faqs {
                    sys {
                      id
                    }
                    title
                  }
                  ... on ImageText {
                    sys {
                      id
                    }
                    image {
                      alt
                      image {
                        url
                        width
                        height
                      }
                    }
                    text {
                      json
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
