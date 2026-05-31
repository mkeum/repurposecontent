"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

const contentTypes = [
  { id: "blog", label: "Blog Post" },
  { id: "article", label: "Article" },
  { id: "podcast", label: "Podcast Transcript" },
  { id: "video", label: "Video Transcript" },
];

export function RepurposeForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState("blog");
  const [content, setContent] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/content/repurpose", {
        method: "POST",
        body: JSON.stringify({ content, contentType }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/dashboard/content/${data.id}`);
      } else {
        // Handle error (quota, etc.)
        console.error("Repurpose failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium">Content Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setContentType(type.id)}
              className={`p-3 border rounded-lg text-sm transition ${
                contentType === type.id
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "hover:bg-gray-50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Original Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your content here..."
          className="w-full h-64 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          required
        />
      </div>

      <Button 
        type="submit" 
        disabled={isLoading || !content}
        className="w-full py-6 text-lg font-bold"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        {isLoading ? "Repurposing..." : "Repurpose Content"}
      </Button>
    </form>
  );
}
