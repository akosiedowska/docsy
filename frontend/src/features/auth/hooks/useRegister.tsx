import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { registerRequest } from "../api";
import type { ApiErrorResponse, RegisterPayload, RegisterResponse } from "../types";

export function useRegister() {
  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterPayload>({
    mutationFn: registerRequest,
  });
}
