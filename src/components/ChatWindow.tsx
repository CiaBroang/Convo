import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import "./ChatWindow.css";

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