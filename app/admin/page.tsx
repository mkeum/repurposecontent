import { db } from "@/db";
import { users, subscriptions, supportTickets, auditLogs } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { 
  Users, 
  CreditCard, 
  LifeBuoy, 
  ScrollText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [userCount] = await db.select({ value: count() }).from(users);
  const [subCount] = await db.select({ value: count() }).from(subscriptions).where(eq(subscriptions.status, "active"));
  const [ticketCount] = await db.select({ value: count() }).from(supportTickets).where(eq(supportTickets.status, "open"));
  const [logCount] = await db.select({ value: count() }).from(auditLogs);

  const stats = [
    {
      label: "Total Users",
      value: userCount?.value || 0,
      icon: Users,
      color: "text-violet-600",
      bgColor: "bg-violet-100",
      trend: "+12% from last month",
      trendType: "up",
    },
    {
      label: "Active Subscriptions",
      value: subCount?.value || 0,
      icon: CreditCard,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
      trend: "+5% from last month",
      trendType: "up",
    },
    {
      label: "Open Tickets",
      value: ticketCount?.value || 0,
      icon: LifeBuoy,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      trend: "-2 from yesterday",
      trendType: "down",
    },
    {
      label: "Total Logs",
      value: logCount?.value || 0,
      icon: ScrollText,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      trend: "Normal system activity",
      trendType: "neutral",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Admin Overview</h2>
        <p className="text-gray-500">System-wide performance and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              {stat.trendType !== "neutral" && (
                <div className={`flex items-center text-xs font-medium ${
                  stat.trendType === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trendType === "up" ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {stat.trend.split(" ")[0]}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-gray-50/50">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-400" />
              Revenue Overview
            </h3>
          </div>
          <div className="p-12 text-center text-gray-500 italic">
            Revenue chart visualization would go here.
          </div>
        </div>

        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-gray-50/50">
            <h3 className="font-bold flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-gray-400" />
              Recent System Activity
            </h3>
          </div>
          <div className="divide-y">
            <div className="p-4 text-center text-gray-500 text-sm">
              Fetch real audit logs for this view.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
