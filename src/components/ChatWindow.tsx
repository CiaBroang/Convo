import React, { useState, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import "./ChatWindow.css";
import { response } from "express";


interface Message {
  message_id: number;
  message_text?: string; //  ? betyder att det är valfritt för interface feature i typescript
  message_image?: Uint8Array; // Valfritt
  message_gif?: Uint8Array; // Valfritt
  sender_id: number;
  receiver_id: number;
  sent_at: string;
}

const ChatWindow: React.FC = () => {
  // Ska vara props sen!
  const senderId = 1;
  const receiverId = 2;

  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "receiver" }[]
  >([]);

  const [newMessage, setNewMessage] = useState<string>(""); //State-variabeln (newMessage): Håller en sträng som representerar det aktuella textinnehållet i ett inputfält.Setter-funktionen (setNewMessage): Uppdaterar newMessage när användaren skriver in text i inputfältet.

  useEffect(() => {
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
            referrerPolicy: "no-referrer"
          }
        );
        if (response.ok) {
          const data: Message[] = await response.json();
          console.log("Fetched messages:", data);
          setMessages(
            data.map((msg) => {
              return {
                message: msg.message_text || "",
                sender: msg.sender_id === senderId ? "user" : "receiver",
                timestamp: msg.sent_at,
              };
            })
          );
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (newMessage === "") return; //om meddelandet är tomt vill jag inte kunna skicka något meddelande
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
      setMessages([...messages, { message: newMessage, sender: "user", }]); // Lös så att timestamp också visas upp. Spridningsoperatorn (...messages) används för att kopiera alla befintliga meddelanden i messages-arrayen och lägga till ett nytt objektt
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
      <div className="chat-content">
        {messages.map((msg, index) => (
          // <ChatBubble key={index} message={msg.message} isSender={msg.sender === senderId} sender={msg.sender}
          <ChatBubble key={index} message={msg.message} sender={msg.sender} /> //lägg till på nått sätt: timestamp={msg.timestamp}
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;