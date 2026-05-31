"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

interface PricingCardProps {
  tier: string;
  price: string;
  interval: "month" | "year";
  description: string;
  features: string[];
  highlighted?: boolean;
  priceId?: string;
}

export function PricingSection() {
  const [billingInterval, setBillingInterval] = useState<"month" | "year">(
    "month"
  );

  const plans = [
    {
      tier: "Starter",
      price: billingInterval === "month" ? "$29" : "$290",
      interval: billingInterval,
      description: "Perfect for solopreneurs",
      features: [
        "20 content pieces/month",
        "Standard AI model",
        "Basic templates",
        "Email support",
      ],
      priceId:
        billingInterval === "month"
          ? process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID,
    },
    {
      tier: "Pro",
      price: billingInterval === "month" ? "$79" : "$790",
      interval: billingInterval,
      description: "For growing creators",
      highlighted: true,
      features: [
        "100 content pieces/month",
        "Advanced AI model",
        "Custom templates",
        "Priority support",
        "3 team seats",
      ],
      priceId:
        billingInterval === "month"
          ? process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID,
    },
    {
      tier: "Business",
      price: billingInterval === "month" ? "$199" : "$1990",
      interval: billingInterval,
      description: "For agencies and teams",
      features: [
        "Unlimited content pieces",
        "Top-tier AI model",
        "White-label options",
        "API Access",
        "Unlimited team seats",
      ],
      priceId:
        billingInterval === "month"
          ? process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID
          : process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-600 mb-8">
            Choose the plan that's right for your content needs.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm font-medium ${
                billingInterval === "month" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingInterval(
                  billingInterval === "month" ? "year" : "month"
                )
              }
              className="relative w-14 h-7 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  billingInterval === "year" ? "translate-x-7" : ""
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingInterval === "year" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Yearly <span className="text-green-600 text-xs">(Save 17%)</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  tier,
  price,
  interval,
  description,
  features,
  highlighted = false,
  priceId,
}: PricingCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/auth/register");
      return;
    }

    if (!priceId) {
      router.push("/dashboard");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ priceId }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`p-8 rounded-2xl flex flex-col ${
        highlighted
          ? "bg-blue-600 text-white shadow-xl scale-105 border-0"
          : "bg-white text-gray-900 border"
      }`}
    >
      <h3 className="text-xl font-bold mb-2">{tier}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className={highlighted ? "text-blue-100" : "text-gray-500"}>
          /{interval === "month" ? "mo" : "yr"}
        </span>
      </div>
      <p className={`mb-8 ${highlighted ? "text-blue-100" : "text-gray-600"}`}>
        {description}
      </p>
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <CheckCircle2
              size={20}
              className={highlighted ? "text-blue-200" : "text-green-500"}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`w-full py-6 text-lg ${
          highlighted ? "bg-white text-blue-600 hover:bg-gray-100 border-0" : ""
        }`}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          "Get Started"
        )}
      </Button>
    </div>
  );
}
