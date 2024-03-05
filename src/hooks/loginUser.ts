import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("token/");

export interface LoginInput {
  username: string;
  password: string;
}

interface LoginResponse {
  user_id: number;
  username: string;
  access: string;
  refresh: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>(
    ["loginUser"],
    (input: LoginInput) => authApiClient.post<LoginInput, LoginResponse>(input)
  );
};
