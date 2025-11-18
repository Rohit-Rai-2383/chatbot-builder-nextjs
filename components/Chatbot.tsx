// "use client";

// import React, { useState } from "react";
// import SettingsModal from "./SettingsModal";
// import ChatInput from "./ChatInput";

// export function Chatbot() {
//   const [open, setOpen] = useState(false);
//   const [settings, setSettings] = useState(false);
//   const [messages, setMessages] = useState([]);

//   const send = (text: string) => {
//     if (!text.trim()) return;

//     setMessages((m) => [...m, { role: "user", content: text }]);

//     // Static bot reply
//     setTimeout(() => {
//       setMessages((m) => [...m, { role: "bot", content: "Static reply" }]);
//     }, 200);
//   };

//   return (
//     <>
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600
//         text-white flex items-center justify-center shadow-lg z-50"
//       >
//         💬
//       </button>

//       {open && (
//         <div
//           className="fixed bottom-28 right-6 w-[380px] max-h-[600px]
//           bg-white rounded-2xl shadow-xl border border-gray-200
//           flex flex-col z-50 overflow-hidden"
//         >
//           <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
//             <span className="font-medium">Chatbot</span>
//             <div className="flex items-center gap-3">
//               <button onClick={() => setOpen(false)}>✕</button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto px-4 py-3 bg-gray-50 space-y-2">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`px-3 py-2 rounded-xl max-w-[80%] text-sm ${
//                   m.role === "user"
//                     ? "bg-blue-100 ml-auto"
//                     : "bg-gray-200 mr-auto"
//                 }`}
//               >
//                 {m.content}
//               </div>
//             ))}
//           </div>
//           <ChatInput onSend={send} />
//         </div>
//       )}
//       <SettingsModal open={settings} onClose={() => setSettings(false)} />
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import BotThinking from "./BotThinking";
export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;

    // USER MESSAGE
    setMessages((m) => [...m, { role: "user", content: text }]);

    // Show bot thinking UI
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);

      // Final bot reply
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
          {/* HEADER */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Ticket Bot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 space-y-6">
            <ChatMessages messages={messages} />

            {loading && <BotThinking />}
          </div>

          {/* INPUT */}
          <ChatInput onSend={send} />
        </div>
      )}
    </>
  );
}
