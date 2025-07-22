export const query = `
  fragment ExternalNavigationLinkFields on ExternalNavigationLink {
    __typename
    sys {
      id
    }
    url
    menuLabel
  }

  fragment PageLinkFields on Page {
    __typename
    sys {
      id
    }
    menuLabel
    slug
  }


  query($slug: String!, $locale: String!) {
    pageCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
      items{
        sys {
          id
        }
        slug
        seoTitle
        seoDescription
        seoImage {
          description
          url
          width
          height
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
                  ... on Page {
                    ...PageLinkFields
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
                ... on Page {
                  ...PageLinkFields
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
              headline
              text {
                json
              }
              image {
                description
                url
                width
                height
              }
              callToActionLink {
                ... on Page {
                  ...PageLinkFields
                }
                ... on ExternalNavigationLink {
                  ...ExternalNavigationLinkFields
                }
              }
            }
            ... on Showcase {
              sys {
                id
              }
              headline
              text {
                json
              }
              image {
                description
                url
                width
                height
              }
              callToActionLink {
                ... on Page {
                  ...PageLinkFields
                }
                ... on ExternalNavigationLink {
                  ...ExternalNavigationLinkFields
                }
              }
            }
            ... on Text {
              sys {
                id
              }
              text {
                json
              }
            }
            ... on Images {
              sys {
                id
              }
              headline
              text {
                json
              }
              imagesCollection(limit: 10) {
                items {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
              displayType
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
                  ... on Page {
                    ...PageLinkFields
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
`;
