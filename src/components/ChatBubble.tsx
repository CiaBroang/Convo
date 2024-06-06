import React from 'react';
import './ChatBubble.css';

interface ChatBubbleProps {
  message: string;
  user: 'sender' | 'receiver';
  timestamp: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const isSameDay =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isSameDay) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
  } else {
    const monthIndex = date.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[monthIndex];
    const day = date.getDate();
    return `${monthName} ${day}`;
  }
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, user, timestamp }) => {
  return (
    <div className={`chat-bubble ${user}`}>
      <p>{message}</p>
      <p>{formatDate(timestamp)}</p>
    </div>
  );
};

export default ChatBubble;