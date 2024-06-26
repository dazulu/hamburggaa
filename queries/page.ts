export const query = `
  query($slug: String!, $locale: String!) {
    navigationConfigCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
      items {
        linkedFrom(allowedLocales: ["en","de"]) {
          pageCollection(limit: 1) {
            items {
              metaInformation {
                metaTitle
                metaDescription
              }
              modulesCollection {
                items {
                  __typename
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
