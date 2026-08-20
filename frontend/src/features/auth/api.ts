import { apiClient } from "../../api/client";
<<<<<<< HEAD
import type { AuthUser, LoginPayload, AuthResponse, RegisterPayload, RegisterResponse } from "./types";
=======
import type { AuthUser, LoginPayload, AuthResponse, RegisterPayload, RegisterResponse, RefreshResponse } from "./types";
>>>>>>> 29e4feb7985b57285be975bf21deea0eab72e4c8

export function loginRequest(payload: LoginPayload) {
  return apiClient.post<AuthResponse>("/auth/login", payload).then((r) => r.data);
}

export function registerRequest(payload: RegisterPayload) {
  return apiClient.post<RegisterResponse>("/users", payload).then((r) => r.data);
}

<<<<<<< HEAD
=======
export function refreshRequest() {
  return apiClient.post<RefreshResponse>("/auth/refresh").then((r) => r.data);
}

>>>>>>> 29e4feb7985b57285be975bf21deea0eab72e4c8
export function logoutRequest() {
  return apiClient.post<void>("/auth/logout");
}

export function meRequest() {
  return apiClient.get<AuthUser>("/auth/me").then((r) => r.data);
}