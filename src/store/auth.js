import { create } from "zustand";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: true,
  setUser: (user) => {
    console.log("[FRONTEND] setUser called", user);
    set({ user });
  },
  setToken: () => {},
  logout: async () => {
    console.log("[FRONTEND] logout called");
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.log("[FRONTEND] logout: backend error", e);
    }
    set({ user: null, token: null });
  },
  fetchUser: async () => {
    set({ loading: true });
    try {
      console.log("[FRONTEND] fetchUser: Fetching user info");
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      console.log("[FRONTEND] fetchUser: User data received", data);
      set({ user: data, loading: false });
    } catch {
      console.log("[FRONTEND] fetchUser: Auth failed");
      set({ user: null, token: null, loading: false });
    }
  },
}));
