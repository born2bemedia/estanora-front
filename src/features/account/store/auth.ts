"use client";

import { create } from "zustand";

import type { AuthUser } from "../model/auth.types";

type AuthStore = {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = (await res.json()) as { user?: AuthUser | null };
      set({
        user: data.user ?? null,
        isInitialized: true,
        isLoading: false,
      });
    } catch {
      set({ user: null, isInitialized: true, isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = (await res.json()) as { user?: AuthUser; message?: string };
      if (!res.ok) {
        set({ isLoading: false });
        return { ok: false, message: data.message ?? "Login failed." };
      }
      set({ user: data.user ?? null, isLoading: false });
      return { ok: true };
    } catch {
      set({ isLoading: false });
      return { ok: false, message: "Login failed." };
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      set({ user: null });
    }
  },

  setUser: (user) => set({ user }),
}));
