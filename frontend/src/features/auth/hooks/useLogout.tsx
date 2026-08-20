import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "../../../stores/authStore";
import { logoutRequest } from "../api";

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession)

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => clearSession(),
  });
}
