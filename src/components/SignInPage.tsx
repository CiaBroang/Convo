import React from 'react';
import './SignInPage.css';

interface User {
  user_id: number;
  email: string; 
  password: string; 
  username: string; 
  is_online: boolean;
}

const SignInPage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lägg till logik för att hantera form submission här
    console.log("Form submitted");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Skriv ditt namn"
          className="input"
          required
        />
                <input
          type="text"
          placeholder="Ange email"
          className="input"
          required
        />
                <input
          type="text"
          placeholder="Ange lösenord"
          className="input"
          required
        />
        <button type="submit" className="button">Start convo</button>
      </form>
    </div>
  );
}

export default SignInPage;