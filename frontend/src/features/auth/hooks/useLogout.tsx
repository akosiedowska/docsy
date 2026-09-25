import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { useAuthStore } from "../../../stores/authStore";
import { logoutRequest } from "../api";

export const useLogout = () => {
  const clearSession = useAuthStore((s) => s.clearSession)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: async () => {
      await navigate({ to: '/', replace: true })
      clearSession()
    },
  });
}
