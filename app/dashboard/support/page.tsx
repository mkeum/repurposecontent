"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare, Send, Sparkles } from "lucide-react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const onAiAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/support/knowledge-base", {
        method: "POST",
        body: JSON.stringify({ prompt: aiPrompt }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setAiAnswer(data.answer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        body: JSON.stringify({ subject, message }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        setIsSuccess(true);
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Support & Help</h2>
        <p className="text-gray-500">Get help with your account or ask a question.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 border rounded-xl bg-blue-50/50">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Ask our AI Assistant
            </h3>
            <form onSubmit={onAiAsk} className="space-y-4">
              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="How do I upgrade my plan?"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Button type="submit" disabled={isAiLoading || !aiPrompt} className="w-full">
                {isAiLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
                Ask AI
              </Button>
            </form>
            {aiAnswer && (
              <div className="mt-4 p-4 bg-white border rounded-lg text-sm text-gray-700">
                <p className="font-bold mb-1">AI Answer:</p>
                {aiAnswer}
              </div>
            )}
          </div>

          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              Submit a Ticket
            </h3>
            {isSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                Your ticket has been submitted! We'll get back to you via email.
                <Button variant="link" onClick={() => setIsSuccess(false)} className="text-green-700 p-0 ml-2">Send another</Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Send className="mr-2 h-4 w-4" />}
                  Submit Ticket
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="space-y-6">
           <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-sm">How many pieces can I repurpose?</h4>
                <p className="text-sm text-gray-500">Starter plans get 20 pieces/month, Pro gets 100, and Business is unlimited.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm">What content types are supported?</h4>
                <p className="text-sm text-gray-500">We support blog posts, articles, podcast transcripts, and video transcripts.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm">Can I cancel my subscription?</h4>
                <p className="text-sm text-gray-500">Yes, you can cancel at any time from your billing dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
