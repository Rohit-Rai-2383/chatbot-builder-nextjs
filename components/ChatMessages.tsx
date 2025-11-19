"use client";

export default function ChatMessages({ messages }) {
  return (
    <>
      {messages.map((m, i) => {
        const isUser = m.role === "user";
        const isProcessing = m.role === "bot-processing";
        const isError = m.role === "bot-error";

        return (
          <div key={i} className="space-y-1">
            <p
              className={`text-[11px] ${
                isUser ? "text-right text-gray-500" : "text-left text-gray-500"
              }`}
            >
              {isUser ? "You" : "Ticket Bot"}
            </p>

            <div
              className={`flex items-start gap-2 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm shadow">
                  🤖
                </div>
              )}

              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-[14px] whitespace-pre-line leading-relaxed
                  ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : isProcessing
                      ? "bg-yellow-100 text-yellow-900 border border-yellow-300"
                      : isError
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-white text-gray-900 border border-gray-200 shadow-sm"
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
