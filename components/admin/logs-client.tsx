"use client";

import { useState } from "react";
import { 
  ScrollText, 
  Search,
  Filter,
  User,
  Clock,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLogsClientProps {
  logs: any[];
}

export function AdminLogsClient({ logs: initialLogs }: AdminLogsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const filteredLogs = initialLogs.filter((log) => {
    const matchesSearch = 
      log.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || log.log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const uniqueActions = Array.from(new Set(initialLogs.map(l => l.log.action)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user or action..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="p-2 border rounded-lg bg-white text-sm outline-none"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y">
          {filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500 italic">
              No activity logs found matching your criteria.
            </div>
          ) : (
            filteredLogs.map(({ log, user }) => (
              <div key={log.id} className="p-4 hover:bg-gray-50 transition flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="mt-1 p-2 bg-gray-100 rounded-lg">
                    <ScrollText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {log.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {log.details || "No additional details"}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        <User className="h-3 w-3" />
                        {user?.name || "System"}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                        Clock
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                      {log.ipAddress && (
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-gray-400">
                          <Globe className="h-3 w-3" />
                          {log.ipAddress}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
