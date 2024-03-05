import React from 'react';
import { Box, Divider, Text, VStack } from '@chakra-ui/react';

interface User {
  id: number;
  username: string;
}

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <VStack divider={<Divider />} spacing={4} align="stretch">
      {users.map((user) => (
        <Box key={user.id} p="4">
          <Text>{user.username}</Text>
        </Box>
      ))}
    </VStack>
  );
};
