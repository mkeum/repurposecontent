import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { contentPieces } from "@/db/schema";
import { count, eq, desc } from "drizzle-orm";
import { 
  FileText, 
  Zap, 
  History,
  TrendingUp
} from "lucide-react";
import { getUserUsage, getRemainingQuota } from "@/lib/quota";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  // Get real stats
  const [totalProcessedResult] = await db
    .select({ value: count() })
    .from(contentPieces)
    .where(eq(contentPieces.userId, session.user.id!));

  const monthlyUsage = await getUserUsage(session.user.id!);
  const remainingQuota = await getRemainingQuota(session.user.id!);

  const recentContent = await db
    .select()
    .from(contentPieces)
    .where(eq(contentPieces.userId, session.user.id!))
    .orderBy(desc(contentPieces.createdAt))
    .limit(5);

  const stats = [
    {
      label: "Total Repurposed",
      value: totalProcessedResult?.value || 0,
      icon: FileText,
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      label: "This Month",
      value: monthlyUsage,
      icon: Zap,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Quota Remaining",
      value: remainingQuota === Infinity ? "∞" : remainingQuota,
      icon: TrendingUp,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome back, {session.user.name}</h2>
        <p className="text-gray-500">Here's what's happening with your content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 border rounded-xl flex items-center gap-x-4 bg-white shadow-sm">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <History className="h-5 w-5 text-gray-400" />
            Recent Activity
          </h3>
        </div>
        <div className="divide-y">
          {recentContent.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No content processed yet. Start by creating some!
            </div>
          ) : (
            recentContent.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm truncate max-w-[300px]">
                    {item.originalContent.substring(0, 50)}...
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.contentType} • {item.createdAt?.toLocaleDateString()}
                  </p>
                </div>
                <div className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  item.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
