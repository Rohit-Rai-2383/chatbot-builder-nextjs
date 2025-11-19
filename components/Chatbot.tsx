// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import ChatInput from "./ChatInput";
// import ChatMessages from "./ChatMessages";
// import BotThinking from "./BotThinking";

// export function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   useEffect(() => {
//     setMessages((prev) => {
//       return [
//         ...prev,
//         {
//           role: "bot",
//           content: "Hello! I am your Ticket Bot. How can I assist you today?",
//         },
//       ];
//     });
//   }, []);

//   const send = async (text: string) => {
//     if (!text.trim()) return;

//     setMessages((m) => [...m, { role: "user", content: text }]);
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       setMessages((m) => [
//         ...m,
//         {
//           role: "bot",
//           content: "Okay, let’s get started then! 🚀\nWhat’s your name?",
//         },
//       ]);
//     }, 1500);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 w-14 h-14 rounded-full
//         bg-blue-600 text-white flex items-center justify-center
//         shadow-xl z-50"
//       >
//         💬
//       </button>

//       {open && (
//         <div
//           className="fixed bottom-28 right-6 w-[380px] h-[450px]
//           bg-white rounded-2xl shadow-xl border border-gray-200
//           flex flex-col z-50 overflow-hidden"
//         >
//           <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-semibold">Ticket Bot</span>
//             <button onClick={() => setOpen(false)}>✕</button>
//           </div>

//           <div
//             ref={scrollRef}
//             className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-6"
//           >
//             <ChatMessages messages={messages} />
//             {loading && <BotThinking />}
//           </div>

//           <ChatInput onSend={send} />
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import ChatInput from "./ChatInput";
// import ChatMessages from "./ChatMessages";
// import BotThinking from "./BotThinking";

// export function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const wsRef = useRef<WebSocket | null>(null);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   useEffect(() => {
//     setMessages([
//       {
//         role: "bot",
//         content: "Hello! I am your Ticket Bot. How can I assist you today?",
//       },
//     ]);

//     const ws = new WebSocket("ws://192.168.29.99:4000/ws/agent");
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     ws.onmessage = (event) => {
//       console.log("WS RESPONSE →", event.data);
//       const botReply = event.data;

//       setLoading(false);
//       setMessages((m) => [...m, { role: "bot", content: botReply }]);
//     };

//     ws.onerror = (err) => {
//       console.log("WS ERROR:", err);
//     };

//     ws.onclose = () => {
//       console.log("🔌 WebSocket disconnected");
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const send = (text: string) => {
//     if (!text.trim()) return;

//     if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
//       console.log("WS is not connected");
//       return;
//     }

//     setMessages((m) => [...m, { role: "user", content: text }]);

//     setLoading(true);

//     wsRef.current.send(JSON.stringify({ query: text }));
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600
//         text-white flex items-center justify-center shadow-xl z-50"
//       >
//         💬
//       </button>

//       {open && (
//         <div
//           className="fixed bottom-28 right-6 w-[380px] h-[450px]
//           bg-white rounded-2xl shadow-xl border border-gray-200
//           flex flex-col z-50 overflow-hidden"
//         >
//           <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-semibold">Ticket Bot</span>
//             <button onClick={() => setOpen(false)}>✕</button>
//           </div>
//           <div
//             ref={scrollRef}
//             className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-6"
//           >
//             <ChatMessages messages={messages} />
//             {loading && <BotThinking />}
//           </div>
//           <ChatInput onSend={send} />
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import BotThinking from "./BotThinking";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.29.99:4000/ws/agent");
    wsRef.current = ws;

    ws.onopen = () => console.log("WS Connected");

    ws.onmessage = (event) => {
      console.log("WS RAW:", event.data);
      setLoading(false);

      let parsed: any = null;
      try {
        parsed = JSON.parse(event.data);
      } catch (e) {
        setMessages((m) => [
          ...m,
          { role: "bot", content: "Something went wrong (Invalid WS JSON)." },
        ]);
        return;
      }

      if (parsed.type === "processing") {
        setMessages((m) => [
          ...m,
          {
            role: "bot-processing",
            content: parsed.message || "Processing...",
          },
        ]);
        return;
      }

      if (parsed.type === "response") {
        setMessages((prev) =>
          prev.filter((msg) => msg.role !== "bot-processing")
        );

        setMessages((m) => [
          ...m,
          { role: "bot", content: parsed.answer || "No answer provided." },
        ]);
        return;
      }

      if (parsed.type === "error") {
        setMessages((m) => [
          ...m,
          {
            role: "bot-error",
            content: parsed.message || "Something went wrong.",
          },
        ]);
        return;
      }

      setMessages((m) => [
        ...m,
        { role: "bot-error", content: "Unknown response received." },
      ]);
    };

    ws.onerror = () => {
      setMessages((m) => [
        ...m,
        { role: "bot-error", content: "WebSocket error occurred." },
      ]);
    };

    ws.onclose = () => console.log("WS Closed");

    return () => ws.close();
  }, []);

  useEffect(() => {
    setMessages([
      {
        role: "bot",
        content: "Hello! I am your Ticket Bot. How can I assist you today?",
      },
    ]);
  }, []);

  const send = (text: string) => {
    setMessages((m) => [...m, { role: "user", content: text }]);

    setLoading(true);

    wsRef.current?.send(JSON.stringify({ query: text }));
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl z-50"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 w-[380px] h-[420px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-10">
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
