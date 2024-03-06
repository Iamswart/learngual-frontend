import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { useAuthStore } from "../store";

const updateStatusApiClient = new APIClient("messaging/update_read_status/");

export interface UpdateStatusInput {
  ids: number[];
}

interface UpdateStatusResponse {
  success: string;
}

export const useUpdateReadStatus = () => {
  const accessToken = useAuthStore.getState().accessToken;
  
  return useMutation<UpdateStatusResponse, Error, UpdateStatusInput>(
    ["updateMessageReadStatus"],
    (input: UpdateStatusInput) =>
      updateStatusApiClient.post<UpdateStatusInput, UpdateStatusResponse>(input, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        })
      
  );
};
