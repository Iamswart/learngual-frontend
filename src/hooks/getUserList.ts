import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const getUsersApiClient = new APIClient("users/listusers/");



interface getAllUsersResponse {
  id: number;
  username: string;
}

export const getAllUsers = () => {
  const accessToken = useAuthStore.getState().accessToken;

  return useQuery<getAllUsersResponse[], Error>(
    ["users"], 
    () => {
      return getUsersApiClient.getAll<getAllUsersResponse[]>({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};

