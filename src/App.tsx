import React from 'react';
import ChatWindow from './components/ChatWindow';
import SignInPage from './components/SignInPage';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => { //React.FC definierar funktionella komponenter i TypeScript med inbyggd typkontroll och stöd för children
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}

export default App;