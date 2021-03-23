require('dotenv').config();

module.exports = {
  schema: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
  generates: {
    './types/contentful.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};
