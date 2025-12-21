export const staticParamsQuery = `
  query($locale: String!) {
    blogPostCollection(limit: 100, locale: $locale) {
      items {
        slug
      }
    }
  }
`;

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
    headerCollection(limit: 1, locale: $locale) {
      items {
        __typename
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
    }
    footerCollection(limit: 1, locale: $locale) {
      items {
        __typename
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
    blogPostCollection(where: { slug: $slug }, limit: 1, locale: $locale) {
      items {
        sys {
          id
          firstPublishedAt
        }
        headline
        hook
        slug
        image {
          url
          description
          width
          height
        }
        content {
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
        labelsCollection {
          items {
            sys {
              id
            }
            name
            color
          }
        }
        author {
          ...PersonLinkFields
        }
      }
    }
  }
`;
