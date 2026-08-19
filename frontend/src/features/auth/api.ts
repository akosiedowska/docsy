import { apiClient } from "../../api/client";
import type { LoginPayload, AuthResponse, RegisterPayload, RegisterResponse } from "./types";

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data);
}

export function registerRequest(payload: RegisterPayload) {
  return apiClient.post<RegisterResponse>("/users", payload).then((r) => r.data);
}