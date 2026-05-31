import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const REPURPOSE_TYPES = [
  { id: "linkedin_post", label: "LinkedIn Post" },
  { id: "twitter_thread", label: "Twitter Thread" },
  { id: "social_posts", label: "Social Media Posts" },
  { id: "email_newsletter", label: "Email Newsletter" },
  { id: "seo_summary", label: "SEO Summary" },
  { id: "blog_excerpt", label: "Blog Excerpt" },
];

export async function generateRepurposedContent(originalContent: string, contentType: string) {
  const prompts = {
    linkedin_post: "Create a professional, authoritative LinkedIn post based on this content. Use emojis sparingly, include 3 relevant hashtags, and focus on a key insight.",
    twitter_thread: "Create a 5-7 tweet Twitter thread from this content. Start with an engaging hook, use thread numbering (1/X), and end with a call to action.",
    social_posts: "Create 3 short, punchy social media captions based on this content. Each should be suitable for Instagram or Facebook.",
    email_newsletter: "Write an email newsletter based on this content. Include a catchy subject line and a structured HTML body with a greeting, introduction, main points, and a sign-off.",
    seo_summary: "Create an SEO summary for this content. Include a meta title (max 60 chars), a meta description (max 160 chars), and 5 key search terms.",
    blog_excerpt: "Write a 2-3 paragraph blog excerpt that teases this content and makes people want to read more.",
  };

  const results: { type: string; content: string }[] = [];

  // To save on costs and time, we can try to do it in one or two calls, but for quality, individual calls are often better.
  // Given the task, I'll use a combined prompt for efficiency.

  const systemPrompt = `You are an expert content marketer. Your task is to repurpose the provided content into several different formats. 
  Maintain the original author's voice and tone. Do not hallucinate facts.
  
  Formats required:
  1. LinkedIn Post
  2. Twitter Thread
  3. Social Media Posts (3 variations)
  4. Email Newsletter (Subject + Body)
  5. SEO Summary (Meta Title + Meta Description + Keywords)
  6. Blog Excerpt
  
  Return the output in a clear JSON format where the keys are the format names and the values are the generated text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Original Content (${contentType}):\n\n${originalContent}` },
    ],
    response_format: { type: "json_object" },
  });

  const rawJson = JSON.parse(response.choices[0].message.content || "{}");
  
  // Map the keys to our internal IDs
  const mapping: Record<string, string> = {
    "LinkedIn Post": "linkedin_post",
    "Twitter Thread": "twitter_thread",
    "Social Media Posts": "social_posts",
    "Email Newsletter": "email_newsletter",
    "SEO Summary": "seo_summary",
    "Blog Excerpt": "blog_excerpt",
  };

  for (const [key, value] of Object.entries(rawJson)) {
    const type = mapping[key] || key.toLowerCase().replace(/ /g, "_");
    results.push({
      type,
      content: typeof value === "string" ? value : JSON.stringify(value, null, 2),
    });
  }

  return results;
}
