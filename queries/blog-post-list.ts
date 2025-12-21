export const query = `
  query($limit: Int!, $locale: String!, $where: BlogPostFilter) {
    blogPostCollection(limit: $limit, locale: $locale, where: $where, order: sys_firstPublishedAt_DESC) {
      items {
        __typename
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
        labelsCollection {
          items {
            name
            color
          }
        }
        author {
          sys {
            id
          }
          name
          image {
            description
            url
            width
            height
          }
        }
      }
    }
  }
`;
