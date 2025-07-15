import { addMessage } from "../features/chat/chatSlice";

const aiResponses = [
  "That's a fascinating question! Let me think about that...",
  "I understand what you're asking. Here's my perspective on this...",
  "Great question! Based on what I know, I'd say...",
  "That's really interesting! Can you tell me more about your thoughts on this?",
  "I see what you mean. Let me explore that further...",
  "Hmm, that's a good point. Here's what I think...",
  "Interesting perspective! I'd love to dive deeper into this topic.",
  "That's a complex question. Let me break it down...",
  "I appreciate you sharing that with me. Here's my take...",
  "That's definitely worth discussing! What are your thoughts on...",
  "I see where you're coming from. Let me share my thoughts...",
  "That's an intriguing point! I think we could explore this further.",
  "Great observation! Here's what I found interesting about that...",
  "I understand your perspective. Let me add to this conversation...",
  "That's a thoughtful question. Here's what I think about it...",
];

const followUpQuestions = [
  "What made you think about this?",
  "How do you feel about this topic?",
  "Have you experienced something similar?",
  "What's your take on this?",
  "How does this relate to your interests?",
  "What would you like to explore next?",
];

export const getFakeAIReply = () => {
  const randomIndex = Math.floor(Math.random() * aiResponses.length);
  const followUpIndex = Math.floor(Math.random() * followUpQuestions.length);
  const response = aiResponses[randomIndex];
  const followUp = followUpQuestions[followUpIndex];
  
  return `${response} ${followUp}`;
};

export const simulateAIReply = (roomId) => (dispatch) => {
  const reply = getFakeAIReply();
  dispatch(addMessage({ 
    roomId, 
    sender: "ai", 
    content: reply 
  }));
};
