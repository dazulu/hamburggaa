import { ApolloClient, InMemoryCache } from '@apollo/client';

const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  cache: new InMemoryCache(),
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default client;
