import { useEffect } from "react";

import { useAuthStore } from "../../../stores/authStore";
import { refreshAccessToken } from "../../../api/client";
import { meRequest } from "../api";

export function useAuthBootstrap() {
  useEffect(() => {
    ;(async () => {
      try {
        const accessToken = await refreshAccessToken()
        const user = await meRequest()
        useAuthStore.getState().setSession(user, accessToken)
      } catch {
        // no valid session — stay logged out silently
      } finally {
        useAuthStore.getState().setBootstrapped()
      }
    })()
  }, [])
}
