[![Netlify Status](https://api.netlify.com/api/v1/badges/bc1594ee-13a6-4cf8-bd60-512bcf1ef417/deploy-status)](https://app.netlify.com/sites/kind-shannon-a2568b/deploys)

Development Preview: https://hamburggaa.netlify.app

This is a static [Next.js](https://nextjs.org/) project, deployed to [Netlify](https://www.netlify.com/). Content, pages, theme and translations are defined in [Contentful](https://www.contentful.com/) (headless CMS). The site is localised in English and German, including fully localised url slugs.

## Uses

- Next.js
- React
- TypeScript
- GraphQL
- Contentful
- ESLint
- Prettier

## Getting Started

Development server:

```bash
yarn dev # Run a local dev server
```

```bash
yarn build # Generate a static website for deployment
```

## Contentful

This project fetches data from [Contentful](https://www.contentful.com/) via [GraphQL](https://graphql.org/) queries over `fetch`.

### Typings

Types need to be generated from the Contentful API Schema, as they are used throughout the project. They are auto-generated on `predev` and `prebuild` but can be generated as needed by running

```bash
yarn generate-types
```

### Environment

Required environment variables to fetch data from the Contentful API

```env
CONTENTFUL_SPACE_ID
CONTENTFUL_ACCESS_TOKEN
```

## Utils

To speed up bootstrapping new page module components, you can run `node create-module.js name`, where `name` should be replaced with your component name.

This will create a new folder inside `/ui/modules/` including a skeleton `index.tsx`and `styles.module.css`.
