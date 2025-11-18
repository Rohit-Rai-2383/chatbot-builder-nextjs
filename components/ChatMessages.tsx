"use client";

export default function ChatMessages({ messages }) {
  return (
    <>
      {messages.map((m, i) => {
        const isUser = m.role === "user";

        return (
          <div key={i} className="space-y-1">
            {/* WHO SENT IT */}
            <p
              className={`text-[11px] text-gray-500 ${
                isUser ? "text-right" : "text-left"
              }`}
            >
              {isUser ? "You" : "Ticket Bot"}
            </p>

            <div
              className={`flex items-start gap-2 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* BOT AVATAR */}
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm shadow">
                  🤖
                </div>
              )}

              {/* MESSAGE BUBBLE */}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-[14px] leading-relaxed whitespace-pre-line
                  ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 shadow-sm border border-gray-200"
                  }
                `}
              >
                {m.content}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
