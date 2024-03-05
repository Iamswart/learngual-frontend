import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const getConversationsApiClient = new APIClient("messaging/conversations");

interface getAllConversationsResponse {
  id: number;
  sender: number;
  recipient: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export const useConversations = (userId1: number, userId2: number) => {
  const accessToken = useAuthStore.getState().accessToken;
  const path = `/${userId1}/${userId2}/`;

  return useQuery<getAllConversationsResponse[], Error>(
    ["conversations", userId1, userId2],
    () => {
      return getConversationsApiClient.getByPath<getAllConversationsResponse[]>(
        path, 
        {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );
};
