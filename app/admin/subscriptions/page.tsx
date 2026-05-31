import { db } from "@/db";
import { subscriptions, users } from "@/db/schema";
import { desc, eq, sum } from "drizzle-orm";
import { 
  CreditCard, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign
} from "lucide-react";

export default async function AdminSubscriptionsPage() {
  const allSubscriptions = await db
    .select({
      subscription: subscriptions,
      user: users
    })
    .from(subscriptions)
    .innerJoin(users, eq(subscriptions.userId, users.id))
    .orderBy(desc(subscriptions.createdAt));

  // Simplified MRR calculation for demo
  const mrr = allSubscriptions.reduce((acc, curr) => {
    if (curr.subscription.status === 'active') {
        // Mock mapping price ID to amount for demo
        return acc + 29; 
    }
    return acc;
  }, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "canceled": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-orange-500" />;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Subscriptions</h2>
        <p className="text-gray-500">View and manage customer subscriptions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Estimated MRR</span>
            </div>
            <p className="text-2xl font-bold">${mrr.toLocaleString()}</p>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">Active Plans</span>
            </div>
            <p className="text-2xl font-bold">{allSubscriptions.filter(s => s.subscription.status === 'active').length}</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Plan ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Next Billing</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Started</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allSubscriptions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                  No subscriptions found.
                </td>
              </tr>
            ) : (
              allSubscriptions.map(({ subscription, user }) => (
                <tr key={subscription.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    {subscription.stripePriceId.substring(0, 12)}...
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(subscription.status)}
                      <span className="text-sm font-medium capitalize">{subscription.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                     <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {subscription.currentPeriodEnd.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {subscription.createdAt?.toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
