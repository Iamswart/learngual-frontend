import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/refresh-token");

export interface RefreshTokenInput {
  refresh: string;
};

interface RefreshTokenResponse  {
  access: string;
};

export const useRefreshToken = () => {
    return useMutation<RefreshTokenResponse, Error, RefreshTokenInput>(
      ['refreshToken'], 
      (input: RefreshTokenInput) => authApiClient.post<RefreshTokenInput, RefreshTokenResponse>(input)
    );
  };
  
  
  
  
  
