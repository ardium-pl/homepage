# Homepage Sanity Studio

Sanity Studio for the Ardium homepage.

## Setup

After cloning the repository, install dependencies and start the Studio:

```bash
cd studio
npm ci
npm run dev
```

Studio will be available at:

```text
http://localhost:3333
```

Log in with an account that has access to the `Homepage` project in Sanity.

## Environments

The project uses two Sanity datasets:

- `development` – local development and testing
- `production` – production content

Environment configuration is stored in:

```text
.env.development
.env.production
```

Running:

```bash
npm run dev
```

uses `.env.development` and connects the Studio to the `development` dataset.

Production build and deployment use `.env.production` and connect to the `production` dataset.

Do not use the production dataset for local development or testing.

## Useful commands

Install dependencies:

```bash
npm ci
```

Run Studio locally:

```bash
npm run dev
```

Build Studio:

```bash
npm run build
```

Deploy Studio:

```bash
npm run deploy
```

Check the currently resolved Sanity configuration:

```bash
npx sanity@latest debug
```

For local development, the output should contain:

```text
Project ID: abw6d3at
Dataset: development
```

## Development workflow

The main integration branch is:

```text
development
```

New changes should be developed on separate task branches and merged through a Pull Request:

```text
task branch
    ↓
development
    ↓
main
```

Examples of task branches:

```text
sanity-core
homepage-sanity
services-sanity
blog-sanity
```

`development` is used for the development environment.

`main` is used for production.

Changes should be tested on the `development` branch before being merged into `main`.

## Schema structure

Sanity schema types are located in:

```text
schemaTypes/
├── documents/
├── objects/
└── index.ts
```

Use:

- `documents/` for standalone content stored in Sanity, such as pages, services, posts or client logos.
- `objects/` for reusable structures used inside documents, such as localized fields, SEO data or reusable content blocks.
- `index.ts` to register all schema types used by the Studio.

Every new schema type must be imported and added to:

```text
schemaTypes/index.ts
```

Example:

```ts
import {homePage} from './documents/homePage'
import {localizedString} from './objects/localizedString'
import {localizedText} from './objects/localizedText'

export const schemaTypes = [
  localizedString,
  localizedText,
  homePage,
]
```

### Documents

Documents represent standalone content stored in Sanity.

Examples:

```text
homePage
service
clientLogo
post
caseStudy
```

A document has its own ID and can be created, edited, drafted and published.

### Objects

Objects are reusable structures used inside documents.

Examples:

```text
localizedString
localizedText
seo
```

Objects are not standalone content and do not appear as separate document types in the Studio.

## Localization

Marketing content uses field-level localization.

For short translated values, use:

```ts
type: 'localizedString'
```

For longer translated content, use:

```ts
type: 'localizedText'
```

Both types store English and Polish values inside the same field:

```ts
{
  en: 'English value',
  pl: 'Polish value',
}
```

Example:

```ts
defineField({
  name: 'title',
  title: 'Title',
  type: 'localizedString',
})
```

Do not create separate language-specific fields such as:

```text
titleEn
titlePl
descriptionEn
descriptionPl
```

Use the shared localization types instead.

Current localization strategy:

- Homepage uses field-level localization.
- Services use field-level localization.
- Site settings use field-level localization.
- SEO uses field-level localization.
- Blog and case study localization will be decided separately when those features are implemented.

## Singleton documents

Some content types should exist only once.

Examples:

```text
Homepage
Site settings
```

These document types should be configured as singletons.

Singleton types are registered in:

```text
structure/singletons.ts
```

Example:

```ts
export const singletonTypes = new Set([
  'homePage',
])
```

When adding another singleton, add its schema type to the same set:

```ts
export const singletonTypes = new Set([
  'homePage',
  'siteSettings',
])
```

Singleton documents must also be added to the custom Studio structure in:

```text
structure/index.ts
```

with a fixed document ID.

Example:

```ts
S.listItem()
  .id('homePage')
  .schemaType('homePage')
  .title('Homepage')
  .child(
    S.editor()
      .id('homePage')
      .schemaType('homePage')
      .documentId('homePage'),
  )
```

This ensures that Studio always opens the same document instead of allowing multiple copies of it to be created.

Do not use the singleton pattern for content that can contain multiple entries.

Examples of regular multi-document content:

```text
services
posts
case studies
client logos
team members
```

## Adding a new schema type

When implementing a new Sanity feature:

1. Decide whether the schema is a standalone `document` or a reusable `object`.
2. Create the schema file in the appropriate folder.
3. Use the shared localization types for translated content.
4. Register the new schema in `schemaTypes/index.ts`.
5. If the document should exist only once, configure it as a singleton.
6. Run Studio locally and verify the schema against the `development` dataset.
7. Run a production build before opening a Pull Request.

Example development check:

```bash
npm run dev
```

Example build check:

```bash
npm run build
```

New CMS features should not be tested directly against the production dataset.

## Architecture

The application consists of three main parts:

```text
Sanity  → content and CMS
Angular → frontend and content rendering
Express → server-side logic and secrets
```

Published public content is fetched directly from Sanity by Angular using `@sanity/client`.

Example:

```text
Angular
   ↓
Sanity Content Lake
```

Express should be used for functionality that requires server-side processing or secrets, such as:

```text
contact form
email delivery
CAPTCHA
anti-spam
private API keys
```

Example:

```text
Angular
   ↓
POST /api/contact
   ↓
Express
   ↓
email provider
```

Do not create Express endpoints only to proxy public Sanity content unless there is a specific server-side requirement.

## Sanity development basics

Schema files define the structure of CMS content, not the actual website content.

Example:

```ts
defineField({
  name: 'title',
  title: 'Title',
  type: 'localizedString',
})
```

The actual values are entered through Sanity Studio and stored in the selected dataset.

Before opening a Pull Request, validate and build the Studio:

```bash
npx sanity@latest schemas validate
npm run build
```