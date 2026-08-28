import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { ApiErrorResponse } from "../../../api/types";
import { registerRequest } from "../api";
import type { RegisterPayload, RegisterResponse } from "../types";

export function useRegister() {
  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterPayload>({
    mutationFn: registerRequest,
  });
}
