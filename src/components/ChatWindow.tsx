import React, { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import "./ChatWindow.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useChat } from '../context/ChatContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
// import express, { Request, Response } from "express";

interface Message {
  message_id: number;
  message_text?: string; //  ? betyder att det är valfritt för interface feature i typescript
  message_image?: Uint8Array; // Valfritt
  message_gif?: Uint8Array; // Valfritt
  sender_id: string;
  receiver_id: string;
  sent_at: string;
  username: string;
}

const ChatWindow: React.FC = () => {
  const { selectedConversation } = useChat();
  const { user } = useUser();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/messages');
  }

  const [messages, setMessages] = useState<
    { message: string; usertype: "sender" | "receiver"; timestamp: string; userName: string }[]
  >([]);

  const [newMessage, setNewMessage] = useState<string>(""); //State-variabeln (newMessage): Håller en sträng som representerar det aktuella textinnehållet i ett inputfält.Setter-funktionen (setNewMessage): Uppdaterar newMessage när användaren skriver in text i inputfältet.

  useEffect(() => {
    if (selectedConversation) {
      const { senderId, receiverId } = selectedConversation;

    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/fetchConversation?person1=${senderId}&person2=${receiverId}`,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }
        );
        if (response.ok) {
          const data: Message[] = await response.json();
          console.log("Fetched messages:", data);
          setMessages(
            data.map((msg) => {
              return {
                message: msg.message_text || "",
                usertype: msg.sender_id === senderId ? "sender" : "receiver",
                timestamp: msg.sent_at,
                userName: msg.username
              };
            })
          );
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
    }
  }, [selectedConversation]);

  const handleSend = async () => {
    if (newMessage === "" || !selectedConversation) return; //om meddelandet är tomt vill jag inte kunna skicka något meddelande

    const { senderId, receiverId } = selectedConversation;

    const response = await fetch("http://localhost:8000/messages/", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        message_text: newMessage,
        message_image: null,
        message_gif: null,
        sender_id: senderId,
        receiver_id: receiverId,
      }),
    });
    if (response.ok) {
      setMessages([
        ...messages,
        { message: newMessage, usertype: "sender", timestamp: "", userName: "" },
      ]); // Lös så att timestamp också visas upp. Spridningsoperatorn (...messages) används för att kopiera alla befintliga meddelanden i messages-arrayen och lägga till ett nytt objektt
      setNewMessage(""); //återställ inputfältet
    } else {
      // Visa error för användare!
      console.error(
        `Error encountered posting message, status code: ${response.status}`
      );
    }
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
      <FaArrowLeftLong onClick={goBack} className="back-icon" />
        <div className="chat-header-details">
          <div className="avatar-container">
            <div className="avatar-circle"></div>
            <div className="active-badge"></div>
          </div>
          <span className="chat-username">Cia Broang</span>
          {/* Hämta {userName} */}
        </div>
      </div>
      <div className="chat-content">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} user={selectedConversation && msg.usertype === selectedConversation.senderId ? "sender" : "receiver"} timestamp={msg.timestamp} />
        ))}
      </div>
      <div className="chat-input">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;