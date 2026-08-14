import { apiClient } from "../../api/client";
import type { LoginPayload, AuthResponse } from "./types";

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data);
}