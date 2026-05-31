import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";
import { AdminUsersClient } from "@/components/admin/users-client";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const allUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Users</h2>
          <p className="text-gray-500">Manage your platform users and their roles.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
        </div>
      </div>

      <AdminUsersClient users={allUsers.map(u => ({ ...u, createdAt: u.createdAt?.toISOString() }))} />
    </div>
  );
}
