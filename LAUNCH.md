# Launch Checklist

Follow these steps to ensure a smooth transition to production.

## 1. Third-Party Setup

### Stripe
- [ ] Create Products and Prices in Stripe Dashboard (Starter, Pro, Business).
- [ ] Update Price IDs in production environment variables.
- [ ] Set up Stripe Webhook pointing to `https://repurposecontent.com/api/webhooks/stripe`.
- [ ] Enable the events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`.
- [ ] Configure the Customer Portal in Stripe.

### OpenAI
- [ ] Set up a production API key.
- [ ] Ensure usage limits are configured to prevent unexpected costs.

### Resend
- [ ] Verify your sending domain in the Resend dashboard.
- [ ] Update the `FROM_EMAIL` in your production config.

### OAuth Apps
- [ ] Create a Google Cloud Project and set up OAuth credentials for production.
- [ ] Create a GitHub OAuth App for production.
- [ ] Ensure redirect URIs are correct (e.g., `https://repurposecontent.com/api/auth/callback/google`).

## 2. Infrastructure

- [ ] Set up a production PostgreSQL database (e.g., Vercel Postgres, Supabase, RDS).
- [ ] Provision a production server or deploy to Vercel.
- [ ] Configure SSL/TLS certificates.
- [ ] Set up automated database backups.

## 3. Pre-Launch Checks

- [ ] Run `npm run build` locally to ensure no compilation errors.
- [ ] Run `npm test` to verify all tests pass.
- [ ] Check `/admin/health` to ensure all services are connected.
- [ ] Verify that all legal pages (/terms, /privacy) are accurate and accessible.

## 4. Launch Sequence

1. [ ] Deploy the code to production.
2. [ ] Run database migrations: `npm run db:migrate`.
3. [ ] Verify Stripe webhook secret is correctly set.
4. [ ] Test the full user journey:
    - [ ] Sign up as a new user.
    - [ ] Subscribe to a plan.
    - [ ] Repurpose a piece of content.
    - [ ] Check usage logs and quota decrementing.
    - [ ] Verify that the welcome email was received.
5. [ ] Monitor logs for any immediate errors.

## 5. Post-Launch

- [ ] Monitor MRR in the Admin Dashboard.
- [ ] Check support tickets for any user friction.
- [ ] Regularly review audit logs for suspicious activity.

## 6. GDPR Compliance Checklist

- [ ] Data processing agreement (DPA) signed with sub-processors (Stripe, OpenAI, Resend).
- [ ] Privacy Policy explicitly lists all data collected and its purpose.
- [ ] Cookie consent banner implemented for users in the EU.
- [ ] Mechanism for users to request data deletion (GDPR Right to Erasure).
- [ ] Mechanism for users to export their data (GDPR Right to Data Portability).
- [ ] Data is stored securely and access is restricted to necessary personnel.
- [ ] Breach notification procedure is in place.

