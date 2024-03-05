import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Flex } from '@chakra-ui/react';
import { Message } from './Message';
import { useConversations } from '../hooks/getConversations'; 
import { useAuthStore } from '../store'; 


interface ChatBoxProps {
  recipientId: number;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ recipientId }) => {
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { user } = useAuthStore(); 
  const senderId = user!.id;

  const { data: previousConversations, isLoading: isConversationsLoading } = useConversations(senderId, recipientId);

  useEffect(() => {
    if (senderId && recipientId) {
      const wsUrl = `ws://localhost:8000/ws/chat/${senderId}/${recipientId}/`;
      const newWs = new WebSocket(wsUrl);

      newWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      setWs(newWs);
      
      return () => {
        newWs.close();
      };
    }
  }, [senderId, recipientId]);

  
  const [messages, setMessages] = useState<any[]>([]); 
  useEffect(() => {
    if (!isConversationsLoading && previousConversations) {
      setMessages(previousConversations);
    }
  }, [previousConversations, isConversationsLoading]);

  const sendMessage = () => {
    if (inputValue.trim() !== '' && ws) {
      const messageData = { message: inputValue, sender: senderId };
      ws.send(JSON.stringify(messageData));
      setInputValue('');
    }
  };

  return (
    <Flex direction="column" h="100vh">
      <VStack spacing="4" overflowY="auto" flex="1">
        {messages.map((message, index) => (
          <Message key={index} text={message.content} alignment={message.sender === senderId ? 'right' : 'left'} />
        ))}
      </VStack>
      <Box p="4" borderTop="1px" borderColor="gray.200">
        <Flex>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={sendMessage} ml="2">
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
