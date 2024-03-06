import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

interface MessageProps {
  text: string;
  alignment: 'left' | 'right';
  timestamp: string;
  read: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, alignment, timestamp, read }) => {
  return (
    <Flex direction="column" alignSelf={alignment === 'left' ? 'flex-start' : 'flex-end'}>
      <Box bg="blue.100" p="2" borderRadius="lg">
        {text}
      </Box>
      <Text fontSize="xs" mt="1">
        {new Date(timestamp).toLocaleString()}
        {read ? " (Read)" : " (Delivered)"}
      </Text>
    </Flex>
  );
};
