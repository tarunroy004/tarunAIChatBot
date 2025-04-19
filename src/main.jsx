// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';

// export const server = "http://localhost:8050"; // Replace with your backend URL
export const server = "https://tarun-ai-chat-bot.vercel.app/"; // Replace with your backend URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </StrictMode>
);
