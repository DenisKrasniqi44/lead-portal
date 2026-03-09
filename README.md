# Smart Lead Intake Portal

**Live app:** [https://lead-portal-seven.vercel.app/](https://lead-portal-seven.vercel.app/)

A full-stack web application where potential clients submit their business needs through a structured intake form. Each submission is automatically summarized and categorized by an AI model, and all entries are visible in a filterable dashboard.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (PostgreSQL) |
| AI | Groq (Llama 3.3 70B) |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |

## Features

- **Intake form** — collects name, email, business name, industry, and a free-text description of the client's needs
- **AI analysis** — each submission is summarized and categorized server-side using Groq (Llama 3.3 70B) before being stored
- **Dashboard** — filterable card view of all submissions, showing the AI summary and category alongside the raw submission
- **Instant dashboard updates** — the dashboard cache is invalidated on every new submission so fresh data is served without a manual refresh
- **Loading skeleton** — the dashboard renders animated placeholder cards while data is fetched, preventing layout shift

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
| `GROQ_API_KEY` | [Groq Console](https://console.groq.com) → API Keys |

3. Run the SQL schema in the Supabase SQL Editor:

```bash
# Copy the contents of schema.sql and paste it into
# Supabase → SQL Editor → New query → Run
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## API Reference

### `POST /api/submissions`

Creates a new submission. Runs AI analysis before storing the record.

**Request body** (JSON):

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | ✓ | Trimmed before saving |
| `email` | string | ✓ | Validated with regex, stored lowercase |
| `business_name` | string | ✓ | Trimmed before saving |
| `industry` | string | ✓ | One of the values in `INDUSTRIES` |
| `help_text` | string | ✓ | Free-text description, trimmed before saving |

**Success response** — `201 Created`:

```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@company.com",
  "business_name": "Acme Corp",
  "industry": "Finance",
  "help_text": "We need help automating our invoicing pipeline.",
  "ai_summary": "The client wants to automate their invoicing workflow.",
  "ai_category": "Automation",
  "created_at": "2026-03-09T12:00:00.000Z"
}
```

**Error responses**:

| Status | Reason |
|--------|--------|
| `400` | Missing required fields or invalid email format |
| `500` | Supabase insert failure or unhandled server error |

After a successful insert the handler calls `revalidatePath("/dashboard")`, which invalidates the Next.js cache for the dashboard so the new entry appears immediately without a manual page refresh.

---

### `GET /api/submissions`

Returns all submissions ordered by most recent first.

**Query parameters**:

| Parameter | Type | Required | Notes |
|-----------|------|----------|-------|
| `category` | string | — | Filter by AI-assigned category. Ignored if not a valid known category. |

**Example**:

```
GET /api/submissions?category=Automation
```

**Success response** — `200 OK`:

```json
[
  {
    "id": "uuid",
    "name": "Jane Smith",
    ...
  }
]
```

**Error responses**:

| Status | Reason |
|--------|--------|
| `500` | Supabase query failure |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Intake form |
| `/dashboard` | Submissions dashboard; accepts `?category=` query param |

---

## Database Schema

The SQL schema lives in [`schema.sql`](./schema.sql). Run it once in the Supabase SQL Editor.

```sql
create table submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  business_name text not null,
  industry      text not null,
  help_text     text not null,
  ai_summary    text,
  ai_category   text,
  created_at    timestamptz default now()
);
```

Row Level Security is enabled with two permissive policies (public insert and public read) suitable for this demo. In a production context these would be replaced with authenticated policies.

---

## Project Structure

```
app/
  page.tsx                    # Intake form page (static)
  layout.tsx                  # Root layout — mounts Nav, sets metadata
  dashboard/
    page.tsx                  # Submissions dashboard (server component, dynamic)
    loading.tsx               # Skeleton shown while dashboard data loads
  api/
    submissions/
      route.ts                # POST /api/submissions  ·  GET /api/submissions
components/
  nav.tsx                     # Top nav bar with active-link highlighting
  intake-form.tsx             # Client form with validation and loading state
  submission-table.tsx        # Card layout for submission entries
  category-filter.tsx         # Category filter pills (client component)
lib/
  supabase.ts                 # Supabase client initialisation
  ai.ts                     # Groq AI helper — prompt + response parsing
  types.ts                    # Shared TypeScript interfaces and constants
schema.sql                    # Database schema for Supabase
.env.example                  # Environment variable template
```

## Deployment

Push the repository to GitHub, then import it into [Vercel](https://vercel.com). Add the three environment variables from `.env.example` in the Vercel project settings and deploy. Vercel auto-detects Next.js — no additional configuration is needed.

