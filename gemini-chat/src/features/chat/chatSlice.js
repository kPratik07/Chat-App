import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadChatState = () => {
  try {
    const serializedState = localStorage.getItem('chatState');
    if (serializedState === null) {
      return {
        chatrooms: [],
        selectedChatroomId: null,
        messages: {},
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      chatrooms: [],
      selectedChatroomId: null,
      messages: {},
    };
  }
};

const initialState = loadChatState();

// Helper function to save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('chatState', JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save chat state to localStorage:', err);
  }
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChatroom: (state, action) => {
      // Accepts { id, title }
      const { id, title } = action.payload;
      const newChatroom = { 
        id, 
        title,
        createdAt: new Date().toISOString(),
        lastMessage: null
      };
      state.chatrooms.push(newChatroom);
      state.messages[id] = [];
      saveToLocalStorage(state);
    },
    deleteChatroom: (state, action) => {
      const id = action.payload;
      state.chatrooms = state.chatrooms.filter((room) => room.id !== id);
      delete state.messages[id];
      if (state.selectedChatroomId === id) {
        state.selectedChatroomId = null;
      }
      saveToLocalStorage(state);
    },
    selectChatroom: (state, action) => {
      state.selectedChatroomId = action.payload;
      saveToLocalStorage(state);
    },
    sendMessage: (state, action) => {
      const { chatroomId, message } = action.payload;
      if (!state.messages[chatroomId]) {
        state.messages[chatroomId] = [];
      }
      state.messages[chatroomId].push(message);
      
      // Update last message in chatroom
      const room = state.chatrooms.find(r => r.id === chatroomId);
      if (room) {
        room.lastMessage = message.text || "Image sent";
        room.lastMessageTime = message.timestamp;
      }
      saveToLocalStorage(state);
    },
    addMessage: (state, action) => {
      const { roomId, sender, content } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      const message = {
        id: nanoid(),
        sender,
        text: content,
        timestamp: new Date().toLocaleTimeString(),
        type: 'text'
      };
      state.messages[roomId].push(message);
      
      // Update last message in chatroom
      const room = state.chatrooms.find(r => r.id === roomId);
      if (room) {
        room.lastMessage = content;
        room.lastMessageTime = message.timestamp;
      }
      saveToLocalStorage(state);
    },
    addImageMessage: (state, action) => {
      const { roomId, image } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      const message = {
        id: nanoid(),
        sender: 'user',
        image,
        timestamp: new Date().toLocaleTimeString(),
        type: 'image'
      };
      state.messages[roomId].push(message);
      
      // Update last message in chatroom
      const room = state.chatrooms.find(r => r.id === roomId);
      if (room) {
        room.lastMessage = "Image sent";
        room.lastMessageTime = message.timestamp;
      }
      saveToLocalStorage(state);
    },
    loadOldMessages: (state, action) => {
      const { chatroomId, oldMessages } = action.payload;
      state.messages[chatroomId] = [
        ...oldMessages,
        ...state.messages[chatroomId],
      ];
      saveToLocalStorage(state);
    },
    paginateMessages: (state, action) => {
      // This would typically load more messages from backend
      // For now, we'll just simulate loading more messages
      const { roomId } = action.payload;
      // In a real app, this would fetch from API
      saveToLocalStorage(state);
    },
  },
});

export const {
  createChatroom,
  deleteChatroom,
  selectChatroom,
  sendMessage,
  addMessage,
  addImageMessage,
  loadOldMessages,
  paginateMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
