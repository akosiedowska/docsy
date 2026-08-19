import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useAuthStore } from "../../../stores/authStore";
import { loginRequest } from "../api";
import type { AuthResponse, LoginErrorResponse, LoginPayload } from "../types";

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation<AuthResponse, AxiosError<LoginErrorResponse>, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: (data) => setSession(data.user, data.accessToken),
  });
}