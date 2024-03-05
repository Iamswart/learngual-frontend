import { Box, Flex } from '@chakra-ui/react';
import { useLocation } from "react-router-dom";
import { ChatBox } from '../components/ChatBox';
import { Sidebar } from '../components/Sidebar';
import { useAuthStore } from '../store';

export const ChatPage = () => {
  const location = useLocation();
  const { recipient } = location.state || {};
  const { user } = useAuthStore();

  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" bg="gray.50">
        {recipient && <ChatBox recipientId={recipient.id} />}
      </Box>
    </Flex>
  );
};
