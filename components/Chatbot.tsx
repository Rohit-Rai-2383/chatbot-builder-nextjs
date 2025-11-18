"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import BotThinking from "./BotThinking";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content: "Okay, let’s get started then! 🚀\nWhat’s your name?",
        },
      ]);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
        bg-blue-600 text-white flex items-center justify-center 
        shadow-xl z-50"
      >
        💬
      </button>

      {open && (
        <div
          className="fixed bottom-28 right-6 w-[380px] max-h-[600px] 
          bg-white rounded-2xl shadow-xl border border-gray-200 
          flex flex-col z-50 overflow-hidden"
        >
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Ticket Bot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-6"
          >
            <ChatMessages messages={messages} />
            {loading && <BotThinking />}
          </div>

          <ChatInput onSend={send} />
        </div>
      )}
    </>
  );
}
