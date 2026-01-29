"use client";
import { Bot, User } from "lucide-react";

interface MessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
    visualization: any;
    stats: string;
  };
}

export default function Message({ message }: MessageProps) {
  return (
    <div className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      {message.role === "assistant" && (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
      )}

      <div className={`max-w-[75%] ${message.role === "user"
        ? "bg-gradient-to-l from-blue-600 to-purple-600"
        : "bg-gradient-to-r from-gray-700/80 to-gray-600/80 backdrop-blur-sm"
      } rounded-2xl p-4 shadow-lg`}>
        <p className={`${message.role === "user" ? "text-white" : "text-gray-100"} whitespace-pre-wrap leading-relaxed`}>
          {message.content}
        </p>
        {message.stats && (
          <div className="mt-3 text-xs font-semibold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 p-3 rounded-xl">
            📊 {message.stats}
          </div>
        )}
        {message.visualization && (
          <div className="mt-3">
            {message.visualization}
          </div>
        )}
      </div>

      {message.role === "user" && (
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <User size={20} className="text-white" />
        </div>
      )}
    </div>
  );
}