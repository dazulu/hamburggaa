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
              modulesCollection(limit: 10) {
                items {
                  __typename
                  ... on Header {
                    sys {
                      id
                    }
                    navigationLinksCollection(limit: 7) {
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
                      description
                      url
                      width
                      height
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
                      description
                      url
                      width
                      height
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
                  ... on Person {
                    sys {
                      id
                    }
                    name
                    role
                    image {
                      description
                      url
                      width
                      height
                    }
                  }
                  ... on PersonList {
                    sys {
                      id
                    }
                    headline
                    text {
                      json
                    }
                    peopleCollection(limit: 10) {
                      items {
                        sys {
                          id
                        }
                        name
                        role
                        image {
                          description
                          url
                          width
                          height
                        }
                      }
                    }
                  }
                  ... on Footer {
                    sys {
                      id
                    }
                    headline
                    navigationLinksCollection(limit: 10) {
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
