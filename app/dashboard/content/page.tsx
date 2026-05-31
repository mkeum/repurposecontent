import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { contentPieces } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export default async function MyContentPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const contents = await db
    .select()
    .from(contentPieces)
    .where(eq(contentPieces.userId, session.user.id!))
    .orderBy(desc(contentPieces.createdAt));

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Content</h2>
          <p className="text-gray-500">Manage and view your repurposed content.</p>
        </div>
        <Link 
          href="/dashboard/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Repurpose New
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {contents.length === 0 ? (
          <div className="p-20 text-center border-2 border-dashed rounded-2xl text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">You haven't repurposed any content yet.</p>
            <Link href="/dashboard/new" className="text-blue-600 hover:underline mt-2 inline-block">
              Get started now
            </Link>
          </div>
        ) : (
          contents.map((item) => (
            <Link 
              key={item.id} 
              href={`/dashboard/content/${item.id}`}
              className="p-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {item.contentType}
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.createdAt?.toLocaleDateString()}
                  </span>
                </div>
                <h3 className="font-bold text-lg truncate group-hover:text-blue-600 transition">
                  {item.originalContent.substring(0, 80)}...
                </h3>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition ml-4" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
