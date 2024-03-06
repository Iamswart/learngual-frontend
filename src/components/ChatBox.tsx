import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Flex } from '@chakra-ui/react';
import { Message } from './Message';
import { useConversations } from '../hooks/getConversations';
import { useAuthStore } from '../store';
import { useUpdateReadStatus } from '../hooks/updateReadStatus';

interface ChatBoxProps {
  recipientId: number;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ recipientId }) => {
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useAuthStore();
  const updateReadStatus = useUpdateReadStatus();
  const senderId = user!.id;

  const { data: previousConversations, isLoading: isConversationsLoading } = useConversations(senderId, recipientId);

  useEffect(() => {
    const wsUrl = `ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`;
    const newWs = new WebSocket(wsUrl);

    newWs.onopen = () => setWs(newWs);
    newWs.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      if (!incomingMessage.sender || incomingMessage.sender !== senderId) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      }
    };

    return () => newWs.close();
  }, [senderId, recipientId]);

  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    if (!isConversationsLoading && previousConversations) {
      setMessages(previousConversations);
      const unreadMessageIds = previousConversations
        .filter((msg) => !msg.read && msg.recipient === user?.id)
        .map((msg) => msg.id);
      if (unreadMessageIds.length > 0) {
        updateReadStatus.mutate({ ids: unreadMessageIds });
      }
    }
  }, [previousConversations, isConversationsLoading, updateReadStatus.mutate, user?.id]);

  const sendMessage = () => {
    if (inputValue.trim() && ws) {
      const messageToSend = { message: inputValue, sender: senderId };
      ws.send(JSON.stringify(messageToSend));
      setMessages((prev) => [
        ...prev,
        {
          ...messageToSend,
          timestamp: new Date().toISOString(), 
          read: false,
        },
      ]);
      setInputValue('');
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <VStack spacing={4} overflowY="auto" flex={1}>
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.content}
            alignment={msg.sender === senderId ? 'right' : 'left'}
            timestamp={msg.timestamp}
            read={msg.read}
          />
        ))}
      </VStack>
      <Box p="4" borderTop="1px" borderColor="gray.200">
        <Flex>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
          />
          <Button ml={2} onClick={sendMessage}>
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
