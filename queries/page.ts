export const query = `
  fragment NavigationConfigFields on NavigationConfig {
      sys {
      id
    }
    slug
    menuLabel
  }

  fragment ExternalNavigationLinkFields on ExternalNavigationLink {
    sys {
      id
    }
    url
    menuLabel
  }

  fragment ImageFields on Image {
    alt
    image {
      url
      width
      height
    }
  }

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
                  ... on Header {
                    sys {
                      id
                    }
                    navigationLinksCollection {
                      items {
                        ... on NavigationConfig {
                          ...NavigationConfigFields
                        }
                        ... on ExternalNavigationLink {
                          ...ExternalNavigationLinkFields
                        }
                      }
                    }
                  }
                  ... on Hero {
                    sys {
                      id
                    }
                    headline
                    image {
                      ...ImageFields
                    }
                    callToActionLink {
                      ... on NavigationConfig {
                        ...NavigationConfigFields
                      }
                      ... on ExternalNavigationLink {
                        ...ExternalNavigationLinkFields
                      }
                    }
                    type
                  }
                  ... on Faqs {
                    sys {
                      id
                    }
                    title
                    description {
                      json
                    }
                    questions
                  }
                  ... on ImageText {
                    sys {
                      id
                    }
                    image {
                      ...ImageFields
                    }
                    text {
                      json
                    }
                    callToActionLink {
                      ... on NavigationConfig {
                        ...NavigationConfigFields
                      }
                      ... on ExternalNavigationLink {
                        ...ExternalNavigationLinkFields
                      }
                    }
                  }                   
                  ... on Footer {
                    sys {
                      id
                    }
                    headline
                    navigationLinksCollection {
                      items {
                        ... on NavigationConfig {
                          ...NavigationConfigFields
                        }
                        ... on ExternalNavigationLink {
                          ...ExternalNavigationLinkFields
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
    }
  }
`;
