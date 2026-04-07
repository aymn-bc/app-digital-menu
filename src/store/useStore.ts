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
export const SEED_USERS: Record<string, { password: string; user: User }> =
  seedUsers.reduce(
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
    {} as Record<string, { password: string; user: User }>,
  );

export function addSeedUser(user: User, password: string) {
  SEED_USERS[user.email.toLowerCase()] = { password, user };
}

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
          // First, check if seed user exists and credentials match
          const seedUser = SEED_USERS[email.toLowerCase()];
          if (seedUser && seedUser.password === password) {
            const token = `offline-token-${Date.now()}`;
            setAccessToken(token);
            set({ user: seedUser.user, token, isAuthenticated: true });
            console.log(`[Auth] Logged in with seed user: ${email}`);
            return { success: true };
          }

          console.log(
            `[Auth] Attempting API login for ${email} at ${API_BASE}`,
          );

          // Try API if seed user didn't match
          // FIXED: Correct endpoint order - /auth/login first for restaurant users
          const endpoints = ["/auth/login", "/auth/user/login", "/auth/admin/login"];

          let response;
          let lastError;

          for (const endpoint of endpoints) {
            try {
              response = await api.post(
                endpoint,
                { email, password },
                { timeout: 10000 },
              );
              break;
            } catch (err: any) {
              lastError = err;
              const status = err?.response?.status;
              if (status === 404 || status === 405 || status === 401) {
                continue;
              }
              throw err;
            }
          }

          if (!response) {
            throw lastError || new Error("Login endpoint not available");
          }

          const token =
            response.data?.access_token ||
            response.data?.accessToken ||
            response.data?.token;

          const userData =
            response.data?.restaurant ||
            response.data?.admin ||
            response.data?.user ||
            response.data?.data ||
            response.data;

          if (!token || !userData?.email) {
            console.warn("[Auth] Unexpected login response", response.data);
            return {
              success: false,
              error: "Invalid credentials",
            };
          }

          const user: User = {
            id: String(userData.id || userData._id || "unknown"),
            email: userData.email,
            name:
              userData.firstName ||
              userData.name ||
              userData.email ||
              "Customer",
            role: (userData.role || "customer").toLowerCase() as UserRole,
            avatar: userData.avatar,
            restaurantId: userData.restaurantId,
          };

          setAccessToken(token);
          set({ user, token, isAuthenticated: true });
          return { success: true };
        } catch (error: any) {
          console.error(
            "[Auth] Error:",
            error?.response?.data || error?.message || error,
          );

          // Final fallback: check seed users again
          const seedUser = SEED_USERS[email.toLowerCase()];
          if (seedUser && seedUser.password === password) {
            const token = `offline-token-${Date.now()}`;
            setAccessToken(token);
            set({ user: seedUser.user, token, isAuthenticated: true });
            console.log(`[Auth] Logged in with offline seed user: ${email}`);
            return { success: true };
          }

          return {
            success: false,
            error: "Invalid email or password",
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

// Cart types and store
export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  notes?: string;
  dietary?: string[];
  restaurantId?: string;
  size?: "small" | "medium" | "large";
}

function makeCartItemId(id: string, size?: string) {
  return `${id}-${size || "default"}`;
}

type CartState = {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity" | "cartItemId"> & { quantity?: number },
  ) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get();
        const cartItemId = makeCartItemId(item.id, item.size);
        const existingItem = items.find((i) => i.cartItemId === cartItemId);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.cartItemId === cartItemId
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                ...item,
                quantity: item.quantity || 1,
                cartItemId,
              },
            ],
          });
        }
      },
      updateQuantity: (cartItemId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({
            items: items.filter((item) => item.cartItemId !== cartItemId),
          });
        } else {
          set({
            items: items.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity } : item,
            ),
          });
        }
      },
      removeItem: (cartItemId) => {
        set({
          items: get().items.filter((item) => item.cartItemId !== cartItemId),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
export const selectLanguage = (s: AppState) => s.language;
export const selectSelectedRestaurant = (s: AppState) => s.selectedRestaurantId;
export const selectSetSelectedRestaurant = (s: AppState) =>
  s.setSelectedRestaurant;

// Auth selectors
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
export const selectUserRole = (s: AuthState) => s.user?.role;