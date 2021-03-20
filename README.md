This is a static [Next.js](https://nextjs.org/) project.

## Features

- NextJS
- TypeScript
- GraphQL
- Contentful
- ESLint
- Prettier
- Emotion
- Jest

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
NEXT_PUBLIC_CONTENTFUL_SPACE_ID
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
```
