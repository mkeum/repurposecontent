import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getUserUsage, getRemainingQuota } from "@/lib/quota";
import { PLANS } from "@/lib/stripe";
import { BillingClient } from "@/components/dashboard/billing-client";

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.userId, session.user.id!),
        eq(subscriptions.status, "active")
      )
    );

  const usage = await getUserUsage(session.user.id!);
  const remaining = await getRemainingQuota(session.user.id!);

  // Determine current plan details
  const currentPlan = subscription 
    ? PLANS.find(p => 
        // In real app, match by stripePriceId. For now, matching by quota or first plan as placeholder.
        p.price.monthly * 100 === 2900 || true 
      )
    : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Billing & Subscription</h2>
        <p className="text-gray-500">Manage your plan and usage.</p>
      </div>

      <BillingClient 
        subscription={subscription ? { ...subscription, currentPeriodEnd: subscription.currentPeriodEnd.toISOString() } : null}
        usage={usage}
        remaining={remaining}
        currentPlan={currentPlan}
      />
    </div>
  );
}
