import React from 'react';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: string;
  user: 'sender' | 'receiver';
  timestamp: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, user, timestamp }) => {
  return (
    <div className={`chat-bubble ${user}`}>
      <p>{message}</p>
      <p>{timestamp}</p>
    </div>
  );
};

export default ChatBubble;