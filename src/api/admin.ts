import api from "./axios";
import type { User } from "@/store/useStore";
import type { AxiosError } from "axios";

// Types
export interface AdminStats {
  totalRestaurants: number;
  activeMenus: number;
  totalMenuItems: number;
  customThemes: number;
  pendingApprovals: number;
  recentUpdates: number;
}

export interface ThemeUpdate {
  id: string;
  restaurantId: string;
  restaurantName: string;
  changeType: string;
  changedBy: string;
  timestamp: string;
  details: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo: string;
  coverImage: string;
  description: string;
  tagline: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  openingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: "none" | "small" | "medium" | "large" | "full";
    cardStyle: "flat" | "elevated" | "bordered" | "glass";
    headerStyle: "solid" | "transparent" | "gradient";
    darkMode: boolean;
  };
  heroSection: {
    type: "image" | "video" | "carousel" | "split";
    title: string;
    subtitle: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText: string;
    ctaLink: string;
    overlayOpacity: number;
    alignment: "left" | "center" | "right";
    showSearch: boolean;
    featuredBadge?: string;
  };
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  icon: string;
  image: string;
  itemCount: number;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  tags: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  calories?: number;
  prepTime: string;
  allergens?: string[];
  customizations?: {
    id: string;
    name: string;
    type: "single" | "multiple";
    required: boolean;
    options: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

// Menu response type
export interface MenuResponse {
  categories: Category[];
  items: MenuItem[];
}

// Order types
export interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  tableId?: string;
  items: OrderItem[];
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  orderType: "dine-in" | "takeout" | "delivery";
  specialNotes?: string;
  promoCode?: string;
  discount?: number;
  createdAt: string;
  updatedAt: string;
}

// API functions
export async function getAdminStats(): Promise<AdminStats> {
  const response = await api.get("/admin/stats");
  return response.data;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await api.get("/restaurants");
  return response.data;
}

export async function getThemeUpdateHistory(): Promise<ThemeUpdate[]> {
  const response = await api.get("/admin/theme-updates");
  return response.data;
}

export async function getMenu(
  restaurantId: string,
  lang?: string,
): Promise<MenuResponse> {
  const response = await api.get(`/menu/${restaurantId}`, { params: { lang } });
  return response.data;
}

// Order API functions
export async function createOrder(orderData: {
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }[];
  tableId?: string;
  orderType: "dine-in" | "takeout" | "delivery";
  specialNotes?: string;
  promoCode?: string;
}): Promise<Order> {
  const response = await api.post("/orders", orderData);
  return response.data;
}

export async function getUserOrders(): Promise<Order[]> {
  const response = await api.get("/orders/user");
  return response.data;
}

export async function getRestaurantOrders(
  restaurantId: string,
): Promise<Order[]> {
  const response = await api.get(`/orders/restaurant/${restaurantId}`);
  return response.data;
}

export async function getOrderById(orderId: string): Promise<Order> {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
}

export async function cancelOrder(orderId: string): Promise<Order> {
  const response = await api.patch(`/orders/${orderId}/cancel`);
  return response.data;
}

export async function getAdminOrders(): Promise<Order[]> {
  const response = await api.get("/orders/admin/all");
  return response.data;
}

// Auth functions
export async function register(userData: {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "restaurant";
}): Promise<{ user: User; access_token: string }> {
  // Backend auth routes may vary by implementation, so try resolved paths in order.
  const endpoints = [
    "/auth/user/register",
    "/auth/register",
    "/auth/restaurant/register",
  ];

  let lastError: any;

  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, userData, { timeout: 10000 });
      return response.data;
    } catch (error: any) {
      lastError = error;
      const responseStatus =
        (error as AxiosError)?.response?.status ||
        (error as any)?.response?.status;

      if (responseStatus === 404 || responseStatus === 405) {
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error("Unable to register user; no route available.");
}
