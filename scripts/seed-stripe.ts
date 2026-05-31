import Stripe from "stripe";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16" as any,
  typescript: true,
});

const PLANS = [
  {
    name: "Starter",
    description: "Perfect for solopreneurs",
    price: {
      monthly: 29,
      yearly: 290,
    },
  },
  {
    name: "Pro",
    description: "For growing creators",
    price: {
      monthly: 79,
      yearly: 790,
    },
  },
  {
    name: "Business",
    description: "For agencies and teams",
    price: {
      monthly: 199,
      yearly: 1990,
    },
  },
];

async function main() {
  console.log("Seeding Stripe products and prices...");

  for (const plan of PLANS) {
    console.log(`Creating product: ${plan.name}`);
    const product = await stripe.products.create({
      name: plan.name,
      description: plan.description,
    });

    console.log(`Creating monthly price for ${plan.name}`);
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price.monthly * 100,
      currency: "usd",
      recurring: { interval: "month" },
      metadata: {
        plan: plan.name.toLowerCase(),
        interval: "month",
      },
    });

    console.log(`Creating yearly price for ${plan.name}`);
    const yearlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price.yearly * 100,
      currency: "usd",
      recurring: { interval: "year" },
      metadata: {
        plan: plan.name.toLowerCase(),
        interval: "year",
      },
    });

    console.log(`Product: ${plan.name}`);
    console.log(`  Product ID: ${product.id}`);
    console.log(`  Monthly Price ID: ${monthlyPrice.id}`);
    console.log(`  Yearly Price ID: ${yearlyPrice.id}`);
    console.log("---");
  }

  console.log("Seeding completed!");
}

main().catch((error) => {
  console.error("Error seeding Stripe:", error);
  process.exit(1);
});
