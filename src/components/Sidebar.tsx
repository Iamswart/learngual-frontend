import { Box, VStack, Text, Button, Flex } from "@chakra-ui/react";
import { getAllUsers } from "../hooks/getUserList";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store";

interface User {
  id: number;
  username: string;
}

export const Sidebar = () => {
  const { data: users, isLoading, error } = getAllUsers();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const onUserSelect = (user: User) => {
    navigate("/", { state: { recipient: user } });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  return (
    <Flex direction="column" width="20%" bg="gray.200" p="4" height="full" justifyContent="space-between">
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
      <Button onClick={handleLogout} colorScheme="red">
        Logout
      </Button>
    </Flex>
  );
};
