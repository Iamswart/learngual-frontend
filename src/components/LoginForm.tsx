import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import { LoginInput, useLogin } from "../hooks/loginUser";
import { useAuthStore } from "../store";



export const loginSchema = z.object({
  username: z
  .string()
  .min(1, { message: "User Name is required" }),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toast = useToast();
  const navigate = useNavigate();

  const { getValues } = useForm<LoginFormData>();
  console.log(getValues());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormData) => {
    console.log("Preparing to submit:", data);
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const { access, refresh, user_id, username } = response;
        const authStore = useAuthStore.getState();
        authStore.setAccessToken(access);
        authStore.setRefreshToken(refresh);
        authStore.setUser({ id: user_id, username: username });
        navigate("/");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.errorMessage?.split("|")[1]?.trim() ||
          "Login Failed, Retry";
        toast({
          title: "Login Error.",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <Text alignSelf="flex-end">
        New to Learngual?{" "}
        <Link as={ReactRouterLink} to="/register" color="#3048C1">
          Sign up here
        </Link>
      </Text>
      <VStack spacing={10} alignItems="flex-start">
        <VStack spacing={1} alignItems="flex-start">
          <Heading size="xl">Log in</Heading>
          <Text>Welcome Back! Log in and continue your journey.</Text>
        </VStack>
      </VStack>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <VStack spacing={4} alignItems="flex-start" w="full">
          <FormControl isInvalid={!!errors.username}>
          <Input id="username" placeholder="Username" {...register("username")} />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size="md">
            <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} placeholder="Password" />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </VStack>
        <VStack mt={8}>

          <Button
            w="full"
            paddingY={5}
            bgColor="#3048C1"
            color="white"
            mt={8}
            type="submit"
            isLoading={loginMutation.isLoading}
            _hover={{
              bgColor: "#3048C1",
            }}
          >
            Login
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default LoginForm;
