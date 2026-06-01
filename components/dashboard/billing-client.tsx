"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";

interface BillingClientProps {
  subscription: any;
  usage: number;
  remaining: number;
  currentPlan: any;
}

export function BillingClient({ 
  subscription, 
  usage, 
  remaining, 
  currentPlan 
}: BillingClientProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onManageBilling = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/billing-portal", {
        method: "POST",
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Billing portal error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            Current Plan
          </h3>
          <div className="mb-4">
            <span className="text-2xl font-bold">{currentPlan?.name || "Free Trial"}</span>
            <p className="text-sm text-gray-500">
              {subscription 
                ? `Renews on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}` 
                : "Upgrade to unlock more content pieces and features."}
            </p>
          </div>
          {subscription ? (
            <Button 
              variant="outline" 
              onClick={onManageBilling}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Manage Subscription
            </Button>
          ) : (
            <a href="/#pricing">
              <Button>Upgrade Plan</Button>
            </a>
          )}
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="text-lg font-bold mb-4">Usage This Month</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Pieces Repurposed</span>
                <span className="font-medium">{usage} / {currentPlan?.quota || 5}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all" 
                  style={{ width: `${Math.min(100, (usage / (currentPlan?.quota || 5)) * 100)}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Quota resets on the 1st of next month.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white shadow-sm h-fit">
        <h3 className="text-lg font-bold mb-4">Plan Benefits</h3>
        <ul className="space-y-3">
          {(currentPlan?.features || [
            "5 content pieces/month",
            "Standard AI model",
            "Basic templates",
          ]).map((feature: string) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
