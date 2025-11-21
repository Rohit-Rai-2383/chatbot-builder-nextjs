"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { responseType, role } from "../utils/constants";
import { TMessage } from "../utils/types";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([
    {
      role: role.BOT_ROLE,
      content: "Hello! I am your helping hand. How can I assist you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const hasSentAuth = useRef(false);
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS1wcm9kLmZ1cm5pc2hrYXJvLmNvbS9sb2dpbiIsImlhdCI6MTc2MzQ3MDQxMiwiZXhwIjoxNzk1MDA2NDEyLCJuYmYiOjE3NjM0NzA0MTIsImp0aSI6IlNTdEhkUWtrZkE2ZTRSVHUiLCJzdWIiOiI5YzFlMjVjYi05MGFiLTQ2OTYtYThmNC03OWQyMzk3OTRlYjciLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.ErSqEK8w7D3BW5P7SxO7ebqEjQEA_9JVa0p5tSTOWso";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const openSocket = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS Connected");

      if (!hasSentAuth.current) {
        ws.send(JSON.stringify({ type: responseType.AUTH, token: TOKEN }));
        hasSentAuth.current = true;
        console.log("AUTH sent");
      }
    };

    ws.onmessage = (event) => {
      setLoading(false);

      let parsed: any = null;
      try {
        parsed = JSON.parse(event.data);
      } catch {
        setMessages((m) => [
          ...m,
          { role: role.ERROR_ROLE, content: "Invalid server response." },
        ]);
        return;
      }

      if (parsed.type === responseType.PROCESSING) {
        if (processingTimeoutRef.current)
          clearTimeout(processingTimeoutRef.current);

        setMessages((prev) =>
          prev.filter((msg) => msg.role !== role.PROCESSING_ROLE)
        );

        setMessages((prev) => [
          ...prev,
          { role: role.PROCESSING_ROLE, content: parsed.message },
        ]);

        startProcessingTimeout();
        return;
      }

      if (parsed.type === responseType.RESPONSE) {
        if (processingTimeoutRef.current) {
          clearTimeout(processingTimeoutRef.current);
        }

        setMessages((prev) =>
          prev.filter((msg) => msg.role !== role.PROCESSING_ROLE)
        );

        streamBotResponse(parsed.answer);
        return;
      }

      if (parsed.type === responseType.ERROR) {
        setMessages((m) => [
          ...m,
          { role: role.ERROR_ROLE, content: parsed.message },
        ]);
        return;
      }

      setMessages((m) => [
        ...m,
        { role: role.ERROR_ROLE, content: "Unknown response format." },
      ]);
    };

    ws.onerror = () => {
      setMessages((m) => [
        ...m,
        {
          role: role.ERROR_ROLE,
          content: "WebSocket error occurred.",
        },
      ]);
    };

    ws.onclose = () => console.log("WS Closed");
  };

  const send = (text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.log("WS NOT READY → connecting again...");
      openSocket();
      return;
    }

    setMessages((m) => [...m, { role: role.USER_ROLE, content: text }]);
    setLoading(true);

    wsRef.current.send(
      JSON.stringify({ type: responseType.QUERY, query: text })
    );
  };

  const streamBotResponse = (fullText: string) => {
    let index = 0;

    setMessages((prev) => [
      ...prev,
      { role: role.BOT_STREAM_ROLE, content: "" },
    ]);

    const interval = setInterval(() => {
      index++;

      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];

        if (lastMsg.role === role.BOT_STREAM_ROLE) {
          lastMsg.content = fullText.slice(0, index);
        }

        return updated;
      });

      scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);

      if (index >= fullText.length) {
        clearInterval(interval);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: role.BOT_ROLE,
            content: fullText,
          };
          return updated;
        });
      }
    }, 12);
  };

  const startProcessingTimeout = () => {
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    processingTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter(
          (msg) => msg.role !== role.PROCESSING_ROLE
        );
        return [
          ...filtered,
          {
            role: role.PROCESSING_ROLE,
            content: "Still working… this is taking longer than usual.",
          },
        ];
      });
    }, 9000);
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) openSocket();
        }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl z-50"
      >
        💬
      </button>
      {open && (
        <div className="fixed bottom-28 right-6 w-[380px] h-[420px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-10">
            <span className="font-semibold">FK Bot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-6"
          >
            <ChatMessages messages={messages} />
          </div>

          <ChatInput onSend={send} />
        </div>
      )}
    </>
  );
}
