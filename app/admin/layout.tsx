import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // @ts-ignore
  if (!session?.user || session.user.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white border-r">
        <AdminSidebar />
      </div>
      <main className="md:pl-72 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
