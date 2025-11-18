"use client";

import { motion } from "framer-motion";

export default function BotThinking() {
  return (
    <div className="space-y-1">
      <p className="text-[11px] text-gray-500">Ticket Bot</p>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm shadow">
          🤖
        </div>

        <div className="flex gap-1 py-3 px-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], y: [-1, 0, -1] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
