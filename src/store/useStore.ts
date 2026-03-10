import { create } from "zustand";
import { persist } from "zustand/middleware";

// User types
export type UserRole = "admin" | "restaurant" | "customer";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  restaurantId?: string; // For restaurant users
  avatar?: string;
}

// Test users for local development
export const TEST_USERS: Record<string, { password: string; user: User }> = {
  "admin@example.com": {
    password: "admin123",
    user: {
      id: "user-admin-001",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
  "restaurant@crispy.com": {
    password: "restaurant123",
    user: {
      id: "user-rest-001",
      email: "restaurant@crispy.com",
      name: "Crispy Chicken Manager",
      role: "restaurant",
      restaurantId: "rest-001",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  },
  "restaurant@sakura.com": {
    password: "restaurant123",
    user: {
      id: "user-rest-002",
      email: "restaurant@sakura.com",
      name: "Sakura Sushi Manager",
      role: "restaurant",
      restaurantId: "rest-002",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  },
  "restaurant@pizza.com": {
    password: "restaurant123",
    user: {
      id: "user-rest-003",
      email: "restaurant@pizza.com",
      name: "Pizza Paradise Manager",
      role: "restaurant",
      restaurantId: "rest-003",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUser: (user: User | null) => void;
};

type AppState = {
  online: boolean;
  pendingOrders: number;
  language: string;
  themeVars: Record<string, string>;
  selectedRestaurantId: string | null;
  setOnline: (v: boolean) => void;
  setPendingOrders: (n: number | ((prev: number) => number)) => void;
  setLanguage: (l: string) => void;
  setThemeVars: (vars: Record<string, string>) => void;
  setSelectedRestaurant: (id: string | null) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Check test users
        const testUser = TEST_USERS[email.toLowerCase()];
        if (testUser && testUser.password === password) {
          const token = `test-token-${Date.now()}`;
          set({ user: testUser.user, token, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: "Invalid credentials" };
      },
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      online: navigator.onLine,
      pendingOrders: 0,
      language: "en",
      themeVars: {},
      selectedRestaurantId: null,
      setOnline: (v: boolean) => set({ online: v }),
      setPendingOrders: (n: number | ((prev: number) => number)) => {
        set((state) => ({
          pendingOrders:
            typeof n === "function"
              ? (n as (prev: number) => number)(state.pendingOrders)
              : n,
        }));
      },
      setLanguage: (l: string) => set({ language: l }),
      setThemeVars: (vars: Record<string, string>) => set({ themeVars: vars }),
      setSelectedRestaurant: (id: string | null) =>
        set({ selectedRestaurantId: id }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        selectedRestaurantId: state.selectedRestaurantId,
        language: state.language,
      }),
    },
  ),
);

// Typed selector helpers
export const selectOnline = (s: AppState) => s.online;
export const selectSetOnline = (s: AppState) => s.setOnline;
export const selectPendingOrders = (s: AppState) => s.pendingOrders;
export const selectSetPending = (s: AppState) => s.setPendingOrders;
export const selectLanguage = (s: AppState) => s.language;
export const selectSelectedRestaurant = (s: AppState) => s.selectedRestaurantId;
export const selectSetSelectedRestaurant = (s: AppState) =>
  s.setSelectedRestaurant;

// Auth selectors
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectUserRole = (s: AuthState) => s.user?.role;
