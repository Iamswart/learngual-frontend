import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const updateStatusApiClient = new APIClient("messaging/update_read_status/");

export interface UpdateStatusInput {
  ids: number[];
}

interface UpdateStatusResponse {
  success: string;
}

export const useRegister = () => {
  return useMutation<UpdateStatusResponse, Error, UpdateStatusInput>(
    ["updateMessageReadStatus"],
    (input: UpdateStatusInput) =>
      updateStatusApiClient.post<UpdateStatusInput, UpdateStatusResponse>(input)
  );
};
