import {useParams} from 'react-router-dom';
import ChatLayout from '../../layouts/chats';

const ChatPage = () => {
  const { chatId } = useParams();
  return (
    <ChatLayout>ChatPage for {chatId}</ChatLayout>
  )
}

export default ChatPage