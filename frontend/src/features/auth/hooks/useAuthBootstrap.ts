import { useEffect, useRef } from "react";

import { useAuthStore } from "../../../stores/authStore";
import { refreshRequest, meRequest } from "../api";

export function useAuthBootstrap() {
  const ranRef = useRef(false)

  useEffect(() => {
    if (ranRef.current) return
    ranRef.current = true

    ;(async () => {
      try {
        const { accessToken } = await refreshRequest()
        useAuthStore.getState().setAccessToken(accessToken)
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
