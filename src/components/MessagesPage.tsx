import React from 'react';
import './MessagesPage.css';
import { CiSearch } from "react-icons/ci";

interface ConversationPreviewProps {
  name: string;
  lastMessage: string;
}

const ConversationPreview: React.FC<ConversationPreviewProps> = ({ name, lastMessage }) => (
  <div className="conversation-preview">
    <div className="avatar-circle"></div>
    <div className="conversation-details">
      <div className="conversation-name">{name}</div>
      <div className="last-message">{lastMessage}</div>
    </div>
  </div>
);

const MessagesPage: React.FC = () => {
  const conversations = [
    { name: 'Cia Broang', lastMessage: 'Hey, how are you?' },
    { name: 'Cia Broang', lastMessage: 'Let\'s meet tomorrow.' },
    { name: 'Cia Broang', lastMessage: 'Can you call me?' },
    { name: 'Cia Broang', lastMessage: 'Call me later' },
    { name: 'Cia Broang', lastMessage: 'See you at the party.' },
  ];

  return (
    <div className="messages-page">
      <div className="header">
        <h1>Messages</h1>
      </div>
      <div className="search-bar">
        <CiSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="conversations-list">
        {conversations.map((conv, index) => (
          <ConversationPreview key={index} name={conv.name} lastMessage={conv.lastMessage} />
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;