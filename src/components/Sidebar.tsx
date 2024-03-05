import { Box, VStack, Text } from "@chakra-ui/react";
import { getAllUsers } from "../hooks/getUserList";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
}


export const Sidebar = () => {
  const { data: users, isLoading, error } = getAllUsers();
  const navigate = useNavigate();

  const onUserSelect = (user: User) => {
    navigate("/", { state: { recipient: user } });
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Box width="20%" bg="gray.200" p="4" height="full">
      <VStack spacing={4} align="stretch">
        {users?.map((user) => (
          <Box
            key={user.id}
            p="4"
            _hover={{ background: "gray.300", cursor: "pointer" }}
            onClick={() => onUserSelect(user)}
          >
            <Text>{user.username}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
