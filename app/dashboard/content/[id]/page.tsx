import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/db";
import { contentPieces, repurposedItems } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { ResultsDisplay } from "@/components/dashboard/results-display";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  const { id } = await params;

  const [piece] = await db
    .select()
    .from(contentPieces)
    .where(eq(contentPieces.id, id));

  if (!piece || piece.userId !== session.user.id) {
    return notFound();
  }

  const results = await db
    .select()
    .from(repurposedItems)
    .where(eq(repurposedItems.contentPieceId, piece.id))
    .orderBy(desc(repurposedItems.createdAt));

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link 
          href="/dashboard/content" 
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to My Content
        </Link>
        <h2 className="text-3xl font-bold truncate max-w-4xl">
          {piece.originalContent.substring(0, 60)}...
        </h2>
        <p className="text-gray-500">
          Repurposed on {piece.createdAt?.toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Generated Results</h3>
          {piece.status === "processing" ? (
            <div className="p-12 border-2 border-dashed rounded-2xl text-center">
              <p className="text-gray-500 animate-pulse">Processing your content...</p>
            </div>
          ) : piece.status === "failed" ? (
            <div className="p-12 border-2 border-dashed border-red-200 bg-red-50 rounded-2xl text-center">
              <p className="text-red-500">Processing failed. Please try again.</p>
            </div>
          ) : (
            <ResultsDisplay items={results} />
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="font-bold mb-4">Original Content</h3>
            <div className="text-sm text-gray-600 line-clamp-[15] whitespace-pre-wrap leading-relaxed">
              {piece.originalContent}
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-400">
                Type: <span className="font-medium text-gray-700 uppercase">{piece.contentType}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
