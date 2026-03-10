import api from "./axios";

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

// API functions
export async function getAdminStats(): Promise<AdminStats> {
  const response = await api.get("/admin/stats");
  return response.data;
}

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await api.get("/admin/restaurants");
  return response.data;
}

export async function getThemeUpdateHistory(): Promise<ThemeUpdate[]> {
  const response = await api.get("/admin/theme-updates");
  return response.data;
}

export async function getCategories(
  restaurantId?: string,
): Promise<Category[]> {
  const response = await api.get("/categories", { params: { restaurantId } });
  return response.data;
}

export async function getMenuItems(restaurantId?: string): Promise<MenuItem[]> {
  const response = await api.get("/menu-items", { params: { restaurantId } });
  return response.data;
}
