"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  CreditCard, 
  Activity, 
  ScrollText,
  LifeBuoy,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-violet-500",
  },
  {
    label: "Subscriptions",
    icon: CreditCard,
    href: "/admin/subscriptions",
    color: "text-pink-700",
  },
  {
    label: "Support Tickets",
    icon: LifeBuoy,
    href: "/admin/tickets",
    color: "text-orange-700",
  },
  {
    label: "Audit Logs",
    icon: ScrollText,
    href: "/admin/logs",
    color: "text-emerald-500",
  },
  {
    label: "System Health",
    icon: Activity,
    href: "/admin/health",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <ShieldCheck className="text-red-600 w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold">
            Admin Panel
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-100 rounded-lg transition",
                pathname === route.href ? "bg-gray-100 text-black font-bold" : "text-zinc-500"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t">
         <Link
            href="/dashboard"
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-100 rounded-lg transition text-zinc-500"
          >
            <div className="flex items-center flex-1">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              User Dashboard
            </div>
          </Link>
      </div>
    </div>
  );
}
