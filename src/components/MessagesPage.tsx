import React, { useEffect, useState } from "react";
import "./MessagesPage.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useChat } from "../context/ChatContext";

interface ConversationPreviewProps {
  conversationId: string;
  name: string;
  lastMessage: string;
  sentAt: string;
}

const ConversationPreview: React.FC<ConversationPreviewProps> = ({
  name,
  lastMessage,
  sentAt,
}) => {
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
      return `${formattedHours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;
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

  return (
    <div className="conversation-preview">
      <div className="avatar-circle"></div>
      <div className="conversation-details">
        <div className="conversation-name">{name}</div>
        <div className="last-message">{lastMessage}</div>
        <div className="sent-at">{formatDate(sentAt)}</div>
      </div>
    </div>
  );
};

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { setSelectedConversation } = useChat();
  const [conversations, setConversations] = useState<
    ConversationPreviewProps[]
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user.id) {
        console.error("User ID is null");
        return;
      }

      console.log(`Fetching conversations for user ID: ${user.id}`);

      try {
        const response = await fetch(
          `http://localhost:8000/conversations/${user.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setConversations(data.conversations);
          console.log("Conversations:", data.conversations);
        } else {
          console.error("Failed to fetch conversations");
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (user.id) {
      fetchConversations();
    }
  }, [user.id]);

  const handleConversationClick = (conversationId: string, conversationName: string) => {
    if (user.id && conversationId) {
      setSelectedConversation({
        senderId: user.id,
        receiverId: conversationId,
      });
      localStorage.setItem("conversationName", conversationName);
      navigate(`/chat`);
    }
  };

  const latestConversations = conversations
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .filter(
      (conv, index, self) =>
        index ===
        self.findIndex((t) => t.conversationId === conv.conversationId)
    );

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
        {latestConversations.map((conv, index) => (
          <div
            key={index}
            onClick={() => handleConversationClick(conv.conversationId, conv.name)}
          >
            <ConversationPreview
              conversationId={conv.conversationId}
              name={conv.name}
              lastMessage={conv.lastMessage}
              sentAt={conv.sentAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;