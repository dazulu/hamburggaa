# Hamburg GAA Club Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/bc1594ee-13a6-4cf8-bd60-512bcf1ef417/deploy-status)](https://app.netlify.com/sites/kind-shannon-a2568b/deploys)
[![Built with Next.js](https://img.shields.io/badge/-Next.js%20-000000?style=flat&logo=next.js)](https://nextjs.org/)
[![Checked with Biome](https://img.shields.io/badge/-Biome-60a5fa?style=flat&logo=biome&logoColor=white)](https://biomejs.dev)
[![Powered by Contentful](https://img.shields.io/badge/-Contentful-2478CC?style=flat&logo=contentful&logoColor=white)](https://www.contentful.com/)
[![Powered by TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Powered by GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=flat&logo=graphql&logoColor=white)](https://graphql.org/)
[![Node.js](https://img.shields.io/badge/Node.js%20-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

The official website for Hamburg GAA (Gaelic Athletic Association) Club - showcasing club information, events, and community content for Gaelic sports enthusiasts in Hamburg, Germany.

## Architecture

This is a statically-generated website built with **Next.js App Router** and powered by **Contentful CMS**. The architecture enables non-technical users to manage all content while maintaining excellent performance and SEO.

**Key Features:**
- 🌐 **Fully internationalized** (English/German) with localized URLs
- ♿ **Accessibility-focused** - follows WCAG 2.1 AA guidelines
- ⚡ **Static generation** for optimal performance
- 🎨 **Modular content system** - all page content managed via Contentful
- 🔒 **Type-safe** with auto-generated TypeScript types from GraphQL schema
- 🚀 **Deployed on Netlify** with continuous deployment

## Tech Stack

**Frontend:**
- Next.js v16+ (App Router)
- React 19+
- TypeScript
- CSS Modules

**Content & Data:**
- Contentful (Headless CMS)
- GraphQL with auto-generated types
- `next-intl` for internationalization

**Development:**
- Biome (linting/formatting)
- GraphQL Codegen
- Turbopack

## Getting Started

### Prerequisites

- Node.js 24+ and Yarn (see `.nvmrc` for exact version)
- Contentful account with space ID and access token

### Environment Setup

Create a `.env.local` file in the root directory:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token

# Optional: Monitor GraphQL query complexity
# CONTENTFUL_LOG_COMPLEXITY=true
```

**Optional Environment Variables:**
- `CONTENTFUL_LOG_COMPLEXITY` - Set to `true` to log GraphQL query complexity in the console. Useful for debugging and ensuring queries stay under Contentful's 11,000 complexity limit.

### Installation & Development

```bash
# Install dependencies
yarn install

# Generate types from Contentful schema
yarn generate-types

# Start development server
yarn dev
```

Visit `http://localhost:3000` to see the site.

### Building for Production

```bash
# Build static site
yarn build

# Preview production build
yarn start
```

## How It Works

The application follows a **content-first architecture**:

1. **Content Management**: All page content, navigation, and site configuration is managed in Contentful
2. **Type Generation**: TypeScript types are auto-generated from the Contentful GraphQL schema
3. **Page Rendering**: Next.js fetches content at build time and generates static pages
4. **Modular Components**: Each content type (Hero, Text, Images, etc.) has its own React component
5. **Internationalization**: Content is fetched based on locale, with fully localized URLs

## Development

### Content Management

All content is managed through [Contentful](https://www.contentful.com/). The site uses a modular approach where pages are composed of reusable content modules.

### Type Safety

TypeScript types are automatically generated from the Contentful GraphQL schema:

```bash
yarn generate-types
```

This ensures type safety across the entire application and catches content structure changes at build time.

### Creating New Modules

To quickly scaffold a new content module:

```bash
node create-module.js ModuleName
```

This creates a new folder in `/ui/modules/` with skeleton files.

### Available Scripts

```bash
yarn dev          # Development server with Turbopack
yarn build        # Production build
yarn type-check   # TypeScript validation
yarn biome        # Lint and format code
yarn test-all     # Run all checks
```
