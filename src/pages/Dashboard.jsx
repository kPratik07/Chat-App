import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createChatroom,
  deleteChatroom,
  selectChatroom,
} from "../features/chat/chatSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useDebounce from "../hooks/useDebounce";
import ChatRoomCard from "../components/ChatRoomCard";
import { Plus, Search, LogOut, MessageCircle } from "lucide-react";
import { logout } from "../features/auth/authSlice";
import { nanoid } from "@reduxjs/toolkit";
import DarkModeToggle from "../components/DarkModeToggle";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatrooms } = useSelector((state) => state.chat);

  const [newRoomTitle, setNewRoomTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const handleCreate = () => {
    if (newRoomTitle.trim()) {
      const id = nanoid();
      dispatch(createChatroom({ id, title: newRoomTitle }));
      toast.success("Chatroom created successfully!");
      setNewRoomTitle("");
      setShowCreateForm(false);
      navigate(`/chatroom/${id}`);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteChatroom(id));
    toast.info("Chatroom deleted");
  };

  const handleEnterRoom = (id) => {
    dispatch(selectChatroom(id));
    navigate(`/chatroom/${id}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  const filteredRooms = chatrooms.filter(
    (room) => typeof room.title === 'string' && room.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-2 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gemini Chat
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your AI conversation hub
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Search and Create */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Search chatrooms..."
                aria-label="Search chatrooms"
              />
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Create new chatroom"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {showCreateForm && (
            <div className="flex flex-col sm:flex-row gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                value={newRoomTitle}
                onChange={(e) => setNewRoomTitle(e.target.value)}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                placeholder="Enter chatroom title..."
                onKeyPress={(e) => e.key === "Enter" && handleCreate()}
                aria-label="Chatroom title"
              />
              <button
                onClick={handleCreate}
                disabled={!newRoomTitle.trim()}
                className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  newRoomTitle.trim()
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                aria-label="Create chatroom"
              >
                Create
              </button>
            </div>
          )}
        </div>

        {/* Chatrooms Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <ChatRoomCard
                key={room.id}
                room={room}
                onEnter={() => handleEnterRoom(room.id)}
                onDelete={() => handleDelete(room.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No chatrooms found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchTerm ? "Try adjusting your search terms" : "Create your first chatroom to get started"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
