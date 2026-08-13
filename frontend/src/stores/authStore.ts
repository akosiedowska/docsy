import {create} from 'zustand';

type AuthState = {
user: { id: string; email: string; firstName: string, lastName: string, role: string } | null;
  isAuthenticated: boolean;
  setSession: (user: AuthState["user"]) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setSession: (user) => set({ user, isAuthenticated: true }),
  clearSession: () => set({ user: null, isAuthenticated: false }),
}));