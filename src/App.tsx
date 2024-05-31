import React from 'react';
import ChatWindow from './components/ChatWindow';
import SignInPage from './components/SignInPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MessagesPage from './components/MessagesPage';
import { UserProvider } from './context/UserContext'


const App: React.FC = () => { //React.FC definierar funktionella komponenter i TypeScript med inbyggd typkontroll och stöd för children
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;