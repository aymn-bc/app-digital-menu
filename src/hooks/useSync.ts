import { useEffect } from "react";
import { getQueuedOrders, markOrderSynced } from "@/db";
import api from "@/api/axios";
import { useAppStore, selectOnline, selectSetPending } from "@/store/useStore";

interface OrderData {
  id: string;
  items: Array<{ itemId: string; qty: number; notes?: string }>;
  total: number;
  table?: string;
}

async function postOrderWithRetry(
  order: OrderData,
  attempt = 0,
): Promise<boolean> {
  try {
    await api.post("/orders", order);
    return true;
  } catch {
    const wait = Math.min(30000, Math.pow(2, attempt) * 1000);
    await new Promise((r) => setTimeout(r, wait));
    if (attempt > 5) return false;
    return postOrderWithRetry(order, attempt + 1);
  }
}

export default function useSync() {
  const online = useAppStore(selectOnline);
  const setPending = useAppStore(selectSetPending);

  useEffect(() => {
    let running = true;
    async function sync() {
      const queued = await getQueuedOrders();
      setPending(queued.length);
      for (const q of queued) {
        if (!running) break;
        const ok = await postOrderWithRetry(q);
        if (ok) {
          await markOrderSynced(q.id);
          const remaining = (await getQueuedOrders()).length;
          setPending(remaining);
        }
      }
    }
    if (online) sync();
    return () => {
      running = false;
    };
  }, [online, setPending]);
}
