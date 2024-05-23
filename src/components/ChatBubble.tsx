import React from 'react';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'receiver';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      <p>{message}</p>
    </div>
  );
};

export default ChatBubble;