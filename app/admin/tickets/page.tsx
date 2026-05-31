import { db } from "@/db";
import { supportTickets, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { 
  LifeBuoy, 
  User,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminTicketsPage() {
  const tickets = await db
    .select({
      ticket: supportTickets,
      user: users
    })
    .from(supportTickets)
    .innerJoin(users, eq(supportTickets.userId, users.id))
    .orderBy(desc(supportTickets.createdAt));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Support Tickets</h2>
        <p className="text-gray-500">Manage and respond to user inquiries.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed rounded-2xl bg-white text-gray-500">
            <LifeBuoy className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No support tickets found.</p>
          </div>
        ) : (
          tickets.map(({ ticket, user }) => (
            <div key={ticket.id} className="p-6 border rounded-xl bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ticket.status === 'open' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {ticket.createdAt?.toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{ticket.subject}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{ticket.message}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-4 w-4" />
                  {user.name} ({user.email})
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">View Details</Button>
                {ticket.status === 'open' ? (
                  <Button size="sm">Reply</Button>
                ) : (
                  <Button variant="ghost" size="sm" disabled>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Resolved
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
