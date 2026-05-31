import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16" as any,
  typescript: true,
});

export const PLANS = [
  {
    name: "Starter",
    description: "Perfect for solopreneurs",
    price: {
      monthly: 29,
      yearly: 290,
    },
    features: [
      "20 content pieces/month",
      "Standard AI model",
      "Basic templates",
      "Email support",
    ],
    quota: 20,
  },
  {
    name: "Pro",
    description: "For growing creators",
    price: {
      monthly: 79,
      yearly: 790,
    },
    features: [
      "100 content pieces/month",
      "Advanced AI model",
      "Custom templates",
      "Priority support",
      "3 team seats",
    ],
    quota: 100,
    highlight: true,
  },
  {
    name: "Business",
    description: "For agencies and teams",
    price: {
      monthly: 199,
      yearly: 1990,
    },
    features: [
      "Unlimited content pieces",
      "Top-tier AI model",
      "White-label options",
      "API Access",
      "Unlimited team seats",
    ],
    quota: -1, // Unlimited
  },
];

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserSubscription(userId: string) {
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId));

  if (!subscription) {
    return {
      plan: "Free",
      status: "none",
      currentPeriodEnd: null,
    };
  }

  const plan = PLANS.find(
    (p) =>
      p.price.monthly * 100 ===
        (subscription.stripePriceId === process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID ? 2900 : 0) || // This is a bit brittle, should map properly
      true // Default to something for now
  );

  return {
    ...subscription,
    // You might want to map priceId back to a plan name here
  };
}

