import { db } from "@/db";
import { subscriptions, usageLogs } from "@/db/schema";
import { eq, and, gte, count } from "drizzle-orm";
import { PLANS } from "./stripe";

export async function getUserUsage(userId: string) {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [usage] = await db
    .select({ value: count() })
    .from(usageLogs)
    .where(
      and(
        eq(usageLogs.userId, userId),
        gte(usageLogs.createdAt, firstDayOfMonth)
      )
    );

  return usage?.value || 0;
}

export async function getRemainingQuota(userId: string) {
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active")
      )
    );

  const usage = await getUserUsage(userId);
  
  if (!subscription) {
    return Math.max(0, 5 - usage); // Free tier 5
  }

  // Map stripePriceId to quota
  const plan = PLANS.find(p => {
    const monthlyPriceId = process.env[`NEXT_PUBLIC_STRIPE_${p.name.toUpperCase()}_MONTHLY_PRICE_ID`];
    const yearlyPriceId = process.env[`NEXT_PUBLIC_STRIPE_${p.name.toUpperCase()}_YEARLY_PRICE_ID`];
    return subscription.stripePriceId === monthlyPriceId || subscription.stripePriceId === yearlyPriceId;
  });
  
  const quota = plan?.quota ?? 20; // Default to Starter quota
  
  if (quota === -1) return Infinity;
  
  return Math.max(0, quota - usage);
}

export async function checkQuota(userId: string) {
  const remaining = await getRemainingQuota(userId);
  return remaining > 0 || remaining === Infinity;
}
