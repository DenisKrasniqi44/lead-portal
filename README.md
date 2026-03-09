# Smart Lead Intake Portal

A full-stack web application where potential clients submit their business needs through a structured intake form. Each submission is automatically summarized and categorized by an AI model, and all entries are visible in a filterable dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (PostgreSQL) |
| AI | Google Gemini 1.5 Flash |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |

## Features

- **Intake form** — collects name, email, business name, industry, and a free-text description of needs
- **AI analysis** — each submission is summarized and categorized automatically on the server
- **Dashboard** — lists all submissions with category filter pills; filterable by AI-assigned category
- **Server-side rendering** — dashboard fetches data directly from Supabase at render time

## Local Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) |

3. Set up the database by running `schema.sql` in the Supabase SQL Editor.

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Schema

The SQL schema is in [`schema.sql`](./schema.sql). Run it once in your Supabase SQL Editor to create the `submissions` table and the required RLS policies.

## Project Structure

```
app/
  page.tsx                  # Intake form page
  dashboard/page.tsx        # Submissions dashboard
  api/submissions/route.ts  # POST + GET API handlers
components/
  intake-form.tsx           # Client form with validation and loading state
  submission-table.tsx      # Cards layout for submissions
  category-filter.tsx       # Filter pills (client component)
lib/
  supabase.ts               # Supabase client
  gemini.ts                 # Gemini AI helper
  types.ts                  # Shared TypeScript types and constants
```


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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
