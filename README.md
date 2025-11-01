This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## CI/CD

This project uses GitHub Actions for continuous integration and deployment.

### CI Pipeline

The CI workflow runs on every push and pull request to `main` or `develop` branches:
- **Linting**: Runs ESLint to check code quality
- **Type Checking**: Validates TypeScript types
- **Build**: Builds the Next.js application

### CD Pipeline

The CD workflow runs on pushes to `main` branch:
- **Build**: Creates production build
- **Deploy**: Deploys to Vercel (if configured)

### GitHub Secrets

To enable Vercel deployment, add these secrets in your GitHub repository settings:

1. Go to: `Settings` → `Secrets and variables` → `Actions`
2. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

For Convex environment variables, add:
- `NEXT_PUBLIC_CONVEX_URL`: Your Convex deployment URL (if needed for build)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Or with npm/yarn/bun:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
