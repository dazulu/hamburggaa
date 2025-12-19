export const query = `
  query {
    enPages: pageCollection(limit: 100, locale: "en") {
      items {
        __typename
        slug
        sys {
          id
          locale
        }
      }
    }
    dePages: pageCollection(limit: 100, locale: "de") {
      items {
        __typename
        slug
        sys {
          id
          locale
        }
      }
    }
    enBlogPosts: blogPostCollection(limit: 100, locale: "en") {
      items {
        __typename
        slug
        sys {
          id
          locale
        }
      }
    }
    deBlogPosts: blogPostCollection(limit: 100, locale: "de") {
      items {
        __typename
        slug
        sys {
          id
          locale
        }
      }
    }
  }
`;
