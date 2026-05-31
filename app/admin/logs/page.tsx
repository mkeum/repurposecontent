import { db } from "@/db";
import { auditLogs, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { AdminLogsClient } from "@/components/admin/logs-client";

export default async function AdminLogsPage() {
  const logs = await db
    .select({
      log: auditLogs,
      user: users
    })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(100);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Audit Logs</h2>
        <p className="text-gray-500">Track all system and user actions.</p>
      </div>

      <AdminLogsClient logs={logs.map(l => ({ 
          ...l, 
          log: { ...l.log, createdAt: l.log.createdAt?.toISOString() } 
      }))} />
    </div>
  );
}
