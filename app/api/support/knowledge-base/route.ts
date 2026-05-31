import { auth } from "@/auth";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const systemPrompt = `
      You are a helpful AI support assistant for RepurposeContent.
      RepurposeContent automatically transforms content (blog posts, articles, podcasts, videos) into marketing materials.
      
      Common Questions & Answers:
      - Pricing: Starter ($29/mo), Pro ($79/mo), Business ($199/mo).
      - Quotas: Starter (20/mo), Pro (100/mo), Business (Unlimited).
      - Output formats: LinkedIn posts, X threads, Social media captions, Email newsletters, SEO summaries, Blog excerpts.
      - AI model: We use GPT-4o-mini for high quality and speed.
      
      Instructions:
      - Answer the user's question concisely based on the context above.
      - If you don't know the answer, suggest they submit a support ticket.
      - Be professional and friendly.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    return NextResponse.json({ 
      answer: response.choices[0].message.content 
    });
  } catch (error) {
    console.error("[KNOWLEDGE_BASE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
