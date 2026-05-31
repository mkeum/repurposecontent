import { auth } from "@/auth";
import { db } from "@/db";
import { contentPieces, repurposedItems, usageLogs, subscriptions } from "@/db/schema";
import { generateRepurposedContent } from "@/lib/repurpose";
import { checkQuota } from "@/lib/quota";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content, contentType } = await req.json();

    if (!content || !contentType) {
      return new NextResponse("Missing content or content type", { status: 400 });
    }

    // 1. Quota Check
    const hasQuota = await checkQuota(session.user.id!);

    if (!hasQuota) {
      return new NextResponse("Quota exceeded", { status: 403 });
    }

    // 2. Create content piece record
    const [piece] = await db.insert(contentPieces).values({
      userId: session.user.id!,
      originalContent: content,
      contentType: contentType,
      status: "processing",
    }).returning();

    // 3. Call AI
    try {
      const results = await generateRepurposedContent(content, contentType);

      // 4. Save results
      for (const result of results) {
        await db.insert(repurposedItems).values({
          contentPieceId: piece.id,
          type: result.type,
          content: result.content,
        });
      }

      // 5. Update status and log usage
      await db.update(contentPieces)
        .set({ status: "completed" })
        .where(eq(contentPieces.id, piece.id));

      await db.insert(usageLogs).values({
        userId: session.user.id!,
        action: "repurpose",
        amount: 1,
      });

      return NextResponse.json({ id: piece.id });
    } catch (aiError) {
      console.error("[AI_ERROR]", aiError);
      await db.update(contentPieces)
        .set({ status: "failed" })
        .where(eq(contentPieces.id, piece.id));
      return new NextResponse("AI processing failed", { status: 500 });
    }
  } catch (error) {
    console.error("[REPURPOSE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
