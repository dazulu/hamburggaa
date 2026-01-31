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

  fragment EntryLinkFields on Entry {
    sys {
      id
    }
    __typename
    ... on Page {
      ...PageLinkFields
    }
  }

  fragment PersonLinkFields on Person {
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
        modulesCollection(limit: 20) {
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
              mediaCollection {
                items {
                  contentType
                  description
                  url
                  width
                  height
                }
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
            ... on RepeatingItems {
              sys {
                id
              }
              title
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
              }
              displayType
              items
            }
            ... on ImageText {
              sys {
                id
              }
              headline
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
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
            ... on Quote {
              sys {
                id
              }
              quoteText
              person {
                ...PersonLinkFields
              }
            }
            ... on BlogPostList {
              sys {
                id
              }
              headline             
              richTextContent {
                json
              }
              filterByLabelsCollection {
                items {
                  sys {
                    id
                  }
                }
              }
              numPosts
            }
            ... on FollowUs {
              sys {
                id
              }
              headline
            }
            ... on Showcase {
              sys {
                id
              }
              headline
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
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
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
              }
              centerText
            }
            ... on Images {
              sys {
                id
              }
              headline
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
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
              ...PersonLinkFields
            }
            ... on PersonList {
              sys {
                id
              }
              headline
              richTextContent {
                json
                links {
                  entries {
                    inline {
                      ...EntryLinkFields
                    }
                    hyperlink {
                      ...EntryLinkFields
                    }
                  }
                }
              }
              peopleCollection(limit: 10) {
                items {
                  ...PersonLinkFields
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
