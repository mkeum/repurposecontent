"use client";

import { useState } from "react";
import { Check, Copy, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultItem {
  id: string;
  type: string;
  content: string;
}

export function ResultsDisplay({ items }: { items: ResultItem[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);

  const onCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-xl bg-white overflow-hidden shadow-sm">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-bold">{formatLabel(item.type)}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(item.id, item.content);
                }}
              >
                {copiedId === item.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              {expandedId === item.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
          {expandedId === item.id && (
            <div className="p-4 border-t bg-gray-50/50">
              <div className="bg-white p-4 border rounded-lg text-sm whitespace-pre-wrap leading-relaxed">
                {item.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
