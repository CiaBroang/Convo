import React from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';

const App: React.FC = () => { //React.FC definierar funktionella komponenter i TypeScript med inbyggd typkontroll och stöd för children
  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;