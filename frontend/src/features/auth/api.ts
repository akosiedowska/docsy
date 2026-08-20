import { apiClient } from "../../api/client";
import type { AuthUser, LoginPayload, AuthResponse, RegisterPayload, RegisterResponse } from "./types";

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data);
}

export function registerRequest(payload: RegisterPayload) {
  return apiClient.post<RegisterResponse>("/users", payload).then((r) => r.data);
}

export function logoutRequest() {
  return apiClient.post<void>("/auth/logout");
}

export function meRequest() {
  return apiClient.get<AuthUser>("/auth/me").then((r) => r.data);
}