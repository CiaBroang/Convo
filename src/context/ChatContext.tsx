import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  selectedConversation: { senderId: string; receiverId: string } | null;
  setSelectedConversation: (conversation: {
    senderId: string;
    receiverId: string;
  }) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [selectedConversation, setSelectedConversation] = useState<{
    senderId: string;
    receiverId: string;
  } | null>(null);

  return (
    <ChatContext.Provider
      value={{ selectedConversation, setSelectedConversation }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};