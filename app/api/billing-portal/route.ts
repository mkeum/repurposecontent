import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || !session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email));

    if (!user || !user.stripeCustomerId) {
      return new NextResponse("User does not have a Stripe customer ID", {
        status: 400,
      });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.AUTH_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("[BILLING_PORTAL_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
