import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './modules/landing';
import NotFoundPage from './modules/not-found';
import ChatPage from './modules/chat';

function App() {
  return (
    <>
    <BrowserRouter basename='chats'>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/:chatId" element={<ChatPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
