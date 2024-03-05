import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("users/register/");

export interface RegisterInput {
  username: string;
  password: string;
};

interface RegisterResponse  {
  user_id: number;
  username: string;
  access: string;
  refresh: string;
};

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterInput>(
      ['registerUser'], 
      (input: RegisterInput) => authApiClient.post<RegisterInput, RegisterResponse>(input)
    );
  };
  
  
  
  
  
