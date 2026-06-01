import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { emailService } from "@/lib/email-service";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as Stripe.Subscription;

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await db.insert(subscriptions).values({
      id: crypto.randomUUID(),
      userId: session.metadata.userId,
      stripeSubscriptionId: sub.id,
      stripeCustomerId: sub.customer as string,
      stripePriceId: sub.items.data[0].price.id,
      status: sub.status as any,
      currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
    });
  }

  if (event.type === "invoice.paid") {
    const sub = await stripe.subscriptions.retrieve(
      session.subscription as string
    ) as Stripe.Subscription;

    await db
      .update(subscriptions)
      .set({
        stripePriceId: sub.items.data[0].price.id,
        currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
      })
      .where(eq(subscriptions.stripeSubscriptionId, sub.id));

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, sub.customer as string));

    if (user && user.email) {
      const invoice = event.data.object as Stripe.Invoice;
      await emailService.sendInvoice(user.email, invoice.amount_paid, new Date());
    }
  }

  if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;

    await db
      .update(subscriptions)
      .set({
        status: sub.status as any,
        stripePriceId: sub.items.data[0].price.id,
        currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
      })
      .where(eq(subscriptions.stripeSubscriptionId, sub.id));

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, sub.customer as string));

    if (user && user.email) {
      await emailService.sendSubscriptionUpdate(user.email, sub.status);
    }
  }

  return new NextResponse(null, { status: 200 });
}
