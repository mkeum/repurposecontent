# RepurposeContent

Automatically transform your content into a full suite of marketing materials.

## Features

- **AI Content Engine:** Convert blog posts or transcripts into LinkedIn posts, Twitter threads, newsletters, and more.
- **SaaS Foundation:** Built-in authentication (NextAuth), subscription billing (Stripe), and transactional emails (Resend).
- **User Dashboard:** Manage content, track usage quotas, and copy results to clipboard.
- **Admin Dashboard:** Monitor users, subscriptions, system health, and support tickets.
- **Transactional Emails:** Automated welcome, onboarding, and billing notifications.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **Auth:** Auth.js (NextAuth v5)
- **Payments:** Stripe
- **Email:** Resend
- **AI:** OpenAI GPT-4o-mini
- **Styling:** Tailwind CSS + shadcn/ui
- **Testing:** Vitest

## Architecture

```mermaid
graph TD
    User((User)) --> Web[Next.js App Router]
    Web --> Auth[Auth.js / NextAuth]
    Web --> DB[(PostgreSQL / Drizzle)]
    Web --> AI[OpenAI GPT-4o-mini]
    Web --> Stripe[Stripe Billing]
    Web --> Resend[Resend Emails]
    Stripe --> Web[Webhooks]
```

## API Documentation

The Business plan includes API access. All requests must include an `x-api-key` header.

### Endpoints

- `POST /api/content/repurpose`: Submit content for transformation.
- `GET /api/content/list`: Retrieve your repurposed content.
- `GET /api/usage`: Check your current monthly quota.

Full documentation is available in the Business Dashboard.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Stripe Account
- OpenAI API Key
- Resend API Key

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/repurpose

# Auth
AUTH_SECRET=your-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...

# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID=...
NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID=...
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=...
NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID=...
NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID=...
NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID=...

# OpenAI
OPENAI_API_KEY=sk-...

# Resend
RESEND_API_KEY=re_...
```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Push database schema:
   ```bash
   npm run db:push
   ```

3. Seed Stripe products:
   ```bash
   npm run stripe:seed
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel.
2. Add all environment variables in the Vercel dashboard.
3. Configure the Stripe Webhook to point to `https://your-domain.com/api/webhooks/stripe`.

### Docker

1. Build the production image:
   ```bash
   docker build -t repurposecontent .
   ```

2. Run with Docker Compose:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Testing

Run unit tests:
```bash
npm test
```

## License

MIT
