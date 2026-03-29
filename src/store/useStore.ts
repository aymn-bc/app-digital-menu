import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateUsers } from "@/utils/seedData";
import api, { setAccessToken } from "@/api/axios";
import { API_BASE } from "@/app/config";

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

// Generate users from seed data - for fallback/offline mode
const seedUsers = generateUsers();
export const SEED_USERS: Record<string, { password: string; user: User }> = seedUsers.reduce(
  (acc, u) => {
    acc[u.email.toLowerCase()] = {
      password: u.password,
      user: {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        restaurantId: u.restaurantId,
        avatar: u.avatar,
      },
    };
    return acc;
  },
  {} as Record<string, { password: string; user: User }>
);

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
        try {
          console.log(`[Auth] Attempting login for ${email} at ${API_BASE}`);
          
          // Check seed users to determine if this is an admin login
          const seedUser = SEED_USERS[email.toLowerCase()];
          const isAdmin = seedUser?.user.role === "admin";
          
          // Use appropriate endpoint based on role
          const endpoint = isAdmin ? "/auth/admin/login" : "/auth/user/login";
          
          // Try to authenticate with the backend API
          const response = await api.post(endpoint, {
            email,
            password,
          });

          if (response.data?.access_token) {
            const token = response.data.access_token;
            // Handle both admin and user response formats
            const userData = response.data.admin || response.data.user;
            
            if (!userData) {
              console.warn("[Auth] Invalid response structure from server", response.data);
              return { success: false, error: "Invalid response from server" };
            }
            
            const user: User = {
              id: userData.id,
              email: userData.email,
              name: userData.firstName || userData.name || userData.email,
              role: (userData.role || "customer").toLowerCase() as UserRole,
              avatar: userData.avatar,
            };
            
            console.log(`[Auth] Login successful for ${email} with role ${user.role}`);
            setAccessToken(token);
            set({ user, token, isAuthenticated: true });
            return { success: true };
          }
          console.warn("[Auth] Invalid response structure from server", response.data);
          return { success: false, error: "Invalid response from server" };
        } catch (error: any) {
          console.error("[Auth] API Error:", error?.response?.data || error?.message || error);
          
          // Fallback to seed users for offline development
          const seedUser = SEED_USERS[email.toLowerCase()];
          if (seedUser && seedUser.password === password) {
            console.log(`[Auth] Fallback: Login successful for ${email} using seed data`);
            const token = `test-token-${Date.now()}`;
            setAccessToken(token);
            set({ user: seedUser.user, token, isAuthenticated: true });
            return { success: true };
          }
          
          const apiError = error?.response?.data?.message || error?.message;
          const errorMsg = apiError || "Invalid credentials";
          console.log(`[Auth] Login failed: ${errorMsg}`);
          return { 
            success: false, 
            error: errorMsg
          };
        }
      },
      logout: () => {
        setAccessToken(null);
        set({ user: null, token: null, isAuthenticated: false });
      },
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
