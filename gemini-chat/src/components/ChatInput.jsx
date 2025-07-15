import { useState, useRef } from "react";
import { Paperclip, Send, Smile } from "lucide-react";

const ChatInput = ({ onSend, onImageUpload, disabled = false }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleTextChange = (e) => {
    if (disabled) return;
    setText(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  const handleImageChange = (e) => {
    if (disabled) return;
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-end space-x-2 max-w-4xl mx-auto">
        {/* Image upload button */}
        <label className={`cursor-pointer p-2 rounded-full transition-colors ${
          disabled 
            ? "text-gray-400 cursor-not-allowed" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
        }`} title="Upload image">
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            disabled={disabled}
          />
          <Paperclip className="w-5 h-5" />
        </label>

        {/* Emoji button (optional, not functional) */}
        <button 
          className={`p-2 rounded-full transition-colors ${
            disabled 
              ? "text-gray-400 cursor-not-allowed" 
              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
          }`}
          disabled={disabled}
          title="Emoji picker (coming soon)"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Textarea for message input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={disabled}
            className={`w-full resize-none p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
              disabled 
                ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed" 
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder={disabled ? "Gemini is thinking..." : "Type a message..."}
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className={`p-3 rounded-lg transition-all duration-200 ${
            text.trim() && !disabled
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          title="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
