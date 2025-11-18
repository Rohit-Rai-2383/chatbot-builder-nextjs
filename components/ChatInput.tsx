"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const send = () => {
    const text = value.trim();
    if (!text) return;

    onSend(text);
    setValue("");
  };

  const suggestions = ["Create ticket", "Track my order", "Help me choose"];

  const handleSuggestion = (text: string) => {
    setValue(text); // fill input
    // (send button becomes active since value !== "")
  };

  return (
    <div className="w-full px-3 py-3 bg-white border-t border-gray-200">
      {/* SUGGESTIONS — only show when empty */}
      {value.length === 0 && (
        <div className="flex flex-col gap-2 mb-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestion(s)}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div
        className="
          w-full flex items-center gap-4
          bg-gray-100
          rounded-full
          px-5 py-3
          shadow-sm
        "
      >
        <input
          className="flex-1 bg-transparent outline-none text-[15px]"
          placeholder="Type a message…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />

        <button
          onClick={send}
          disabled={!value.trim()}
          className={`
            w-8 h-8 flex items-center justify-center rounded-full transition
            ${
              value.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}
