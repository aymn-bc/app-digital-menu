import Dexie from "dexie";
import type { Table } from "dexie";

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  allergens?: string[];
  dietary?: string[];
  images?: string[];
  translations?: Record<string, unknown>;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface Translation {
  id: string;
  locale: string;
  key: string;
  value: string;
}

export interface OrderQueued {
  id: string;
  items: Array<{ itemId: string; qty: number; notes?: string }>;
  table?: string;
  total: number;
  createdAt: number;
  synced?: boolean;
  attempts?: number;
}

class AppDB extends Dexie {
  menu_cache!: Table<MenuItem, string>;
  category_cache!: Table<Category, string>;
  item_cache!: Table<MenuItem, string>;
  translation_cache!: Table<Translation, string>;
  order_queue!: Table<OrderQueued, string>;
  sync_metadata!: Table<Record<string, unknown>, string>;

  constructor() {
    super("digi_menu_db");
    this.version(1).stores({
      menu_cache: "id, categoryId, name",
      category_cache: "id, name, order",
      item_cache: "id, categoryId, name",
      translation_cache: "id, locale, key",
      order_queue: "id, createdAt, synced",
      sync_metadata: "id",
    });
  }
}

export const db = new AppDB();

export const cacheMenu = async (menus: MenuItem[]) => {
  if (!menus?.length) return;
  await db.menu_cache.bulkPut(menus);
};

export const getCachedMenu = async () => {
  return await db.menu_cache.toArray();
};

export const enqueueOrder = async (order: OrderQueued) => {
  order.createdAt = Date.now();
  order.synced = false;
  order.attempts = 0;
  await db.order_queue.add(order);
};

export const getQueuedOrders = async () => {
  const allOrders = await db.order_queue.toArray();
  return allOrders.filter((o) => !o.synced);
};

export const markOrderSynced = async (id: string) => {
  await db.order_queue.update(id, { synced: true });
};

export default db;
