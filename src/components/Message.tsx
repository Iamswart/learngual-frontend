import React from 'react';
import { Box } from '@chakra-ui/react';

interface MessageProps {
  text: string;
  alignment: 'left' | 'right';
}

export const Message: React.FC<MessageProps> = ({ text, alignment }) => {
  return (
    <Box alignSelf={alignment === 'left' ? 'flex-start' : 'flex-end'} bg="blue.100" p="2" borderRadius="lg">
      {text}
    </Box>
  );
};
