import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "../../../stores/authStore";
import { loginRequest } from "../api";
import type { AuthResponse } from "../types";

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data: AuthResponse) => setSession(data.user, data.accessToken),
  });
}