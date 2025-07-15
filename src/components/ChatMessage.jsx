import { useState } from "react";
import { Clipboard, ClipboardCheck, User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-xs md:max-w-md lg:max-w-lg ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? "bg-indigo-600" : "bg-gray-600"}`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
        <div className={`relative group p-3 rounded-lg ${isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-none"}`}>
          {message.image && (
            <img
              src={message.image}
              alt="chat"
              className="mb-2 rounded-md max-w-full max-h-64 object-cover"
            />
          )}
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
          <span className={`block text-xs mt-2 opacity-70 ${isUser ? "text-right" : "text-left"}`}>
            {message.timestamp}
          </span>
          <button
            onClick={handleCopy}
            className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isUser ? "right-2" : "left-2"}`}
          >
            {copied ? (
              <ClipboardCheck size={14} className="text-green-400" />
            ) : (
              <Clipboard size={14} className={isUser ? "text-white" : "text-gray-400"} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
