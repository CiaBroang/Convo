import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ChatProvider } from './context/ChatContext';
import SignInPage from './components/SignInPage';
import MessagesPage from './components/MessagesPage';
import ChatWindow from './components/ChatWindow';
import LogOut from './components/LogOut';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ChatProvider>
        <Router>
          <AppContent />
        </Router>
      </ChatProvider>
    </UserProvider>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const shouldShowLogOut = location.pathname !== '/chat'; // Kontrollera om sökvägen inte är /chat pga ingen log out knapp där

  return (
    <>
      {shouldShowLogOut && <LogOut />}
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </>
  );
};

export default App;