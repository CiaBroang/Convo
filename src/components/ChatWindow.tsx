import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import "./ChatWindow.css";

interface Message {
  message_id: number;
  message_text?: string; //  ? betyder att det är valfritt för interface feature i typescript
  message_image?: Uint8Array; // Valfritt
  message_gif?: Uint8Array;   // Valfritt
  sender_id: number;
  receiver_id: number;
  sent_at: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<
    { message: string; sender: "user" | "receiver" }[]
  >([]);

  const [newMessage, setNewMessage] = useState<string>(""); //State-variabeln (newMessage): Håller en sträng som representerar det aktuella textinnehållet i ett inputfält.Setter-funktionen (setNewMessage): Uppdaterar newMessage när användaren skriver in text i inputfältet.

  const handleSend = () => {
    if (newMessage === "") return; //om meddelandet är tomt vill jag inte kunna skicka något meddelande

    setMessages([...messages, { message: newMessage, sender: "user" }]); // Spridningsoperatorn (...messages) används för att kopiera alla befintliga meddelanden i messages-arrayen och lägga till ett nytt objektt
    setNewMessage(""); //återställ inputfältet
  };

  // fetch('http://localhost:8000/messages/') // method: "POST" ska det vara också! Och skicka med data!
  //   .then((response) => response.json())
  //   .then((result) => {
  //     setMessages(result)
  //   })

  return (
    <div className="chat-window">
      <div className="chat-content">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.message} sender={msg.sender} />
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