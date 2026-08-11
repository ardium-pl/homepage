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

## Useful commands

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

New changes should be developed on feature branches and merged through a Pull Request:

```text
feature/*
    ↓
development
    ↓
main
```

`development` is used for the development environment, while `main` is used for production.