import { MessageCircle, Trash2, Clock } from "lucide-react";

const ChatRoomCard = ({ room, onEnter, onDelete }) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-32">
                {room.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {room.messages ? room.messages.length : 0} messages
              </p>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(room.id);
            }}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {room.lastMessage && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {room.lastMessage}
            </p>
            <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{formatTime(room.lastMessageTime)}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => onEnter(room.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
};

export default ChatRoomCard;
