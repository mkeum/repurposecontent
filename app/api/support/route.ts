import { auth } from "@/auth";
import { db } from "@/db";
import { supportTickets } from "@/db/schema";
import { NextResponse } from "next/server";
import { emailService } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { subject, message } = await req.json();

    if (!subject || !message) {
      return new NextResponse("Missing subject or message", { status: 400 });
    }

    const [ticket] = await db.insert(supportTickets).values({
      userId: session.user.id!,
      subject,
      message,
      status: "open",
    }).returning();

    // Send confirmation email
    if (session.user.email) {
      await emailService.sendSupportTicketNotification(
        session.user.email,
        subject,
        message
      );
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("[SUPPORT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
