import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addMessage,
  addImageMessage,
  paginateMessages,
  selectChatroom,
} from "../features/chat/chatSlice";
import { simulateAIReply } from "../utils/fakeAIReply";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Loader from "../components/Loader";
import { ArrowLeft } from "lucide-react";

const ChatroomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { chatrooms, messages } = useSelector((state) => state.chat);
  const room = chatrooms.find((r) => r.id === id);
  const roomMessages = messages[id] || [];
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [aiResponseThrottle, setAiResponseThrottle] = useState(false);

  const MESSAGES_PER_PAGE = 20;

  useEffect(() => {
    if (id) {
      dispatch(selectChatroom(id));
    }
  }, [id, dispatch]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = useCallback((text) => {
    if (!text.trim() || aiResponseThrottle) return;
    
    dispatch(addMessage({ roomId: id, sender: "user", content: text }));
    setIsTyping(true);
    setAiResponseThrottle(true);

    // Throttle AI responses to prevent spam
    const responseDelay = Math.random() * 2000 + 1000; // 1-3 seconds
    setTimeout(() => {
      dispatch(simulateAIReply(id));
      setIsTyping(false);
      setAiResponseThrottle(false);
    }, responseDelay);
  }, [dispatch, id, aiResponseThrottle]);

  const handleImageUpload = useCallback((img) => {
    dispatch(addImageMessage({ roomId: id, image: img }));
  }, [dispatch, id]);

  const loadMoreMessages = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      // Simulate loading more messages
      const dummyMessages = Array.from({ length: 5 }, (_, i) => ({
        id: `old-${page}-${i}`,
        sender: Math.random() > 0.5 ? 'user' : 'ai',
        text: `Old message ${page}-${i}`,
        timestamp: new Date(Date.now() - (page * 24 * 60 * 60 * 1000)).toLocaleTimeString(),
        type: 'text'
      }));
      
      dispatch(paginateMessages({ roomId: id, oldMessages: dummyMessages }));
      setPage(prev => prev + 1);
      setIsLoadingMore(false);
      
      if (page >= 3) {
        setHasMore(false);
      }
    }, 800);
  }, [isLoadingMore, hasMore, page, dispatch, id]);

  const handleScroll = useCallback((e) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0 && hasMore) {
      loadMoreMessages();
    }
  }, [loadMoreMessages, hasMore]);

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages.length, scrollToBottom]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chatroom not found</h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center p-4 bg-white dark:bg-gray-800 shadow">
        <button
          onClick={() => navigate("/dashboard")}
          className="mr-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          {room.title}
        </h1>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {isLoadingMore && <Loader type="message-skeleton" />}
        
        {roomMessages.length === 0 ? (
          <Loader type="chat-skeleton" />
        ) : (
          roomMessages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}

        {isTyping && (
          <div className="flex items-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-xs">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">Gemini is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>

      <ChatInput 
        onSend={handleSendMessage} 
        onImageUpload={handleImageUpload}
        disabled={aiResponseThrottle}
      />
    </div>
  );
};

export default ChatroomPage;
