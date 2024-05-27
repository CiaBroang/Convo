import React, { useState } from "react";
import './SignInPage.css';

interface User {
  email: string;
  password: string;
  username: string;
}

const SignInPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // Flytta handleAddUser utanför handleSubmit
  const handleAddUser = async (newUser: User) => {
    try {
      const response = await fetch("http://localhost:8000/addUsers/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        console.log("User added successfully");
        // Uppdatera tillstånd eller visa meddelande till användaren här
      } else {
        console.error(`Error encountered adding user, status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error encountered adding user", error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newUser: User = {
      username,
      password,
      email
    };

    handleAddUser(newUser);
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skriv ditt namn"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ange email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Ange lösenord"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="button">Start convo</button>
      </form>
    </div>
  );
};

export default SignInPage;