import api from "@/api/axios";
import db from "@/db";

export async function fetchThemeOnlineFirst() {
  try {
    const res = await api.get("/theme");
    const vars = res.data?.vars || {};
    await db.sync_metadata.put({ id: "theme", vars });
    return vars;
  } catch {
    const stored = await db.sync_metadata.get("theme");
    return stored?.vars || {};
  }
}

export function applyTheme(vars: Record<string, string>) {
  const root = document.documentElement;
  Object.entries(vars || {}).forEach(([k, v]) => {
    root.style.setProperty(k, v);
  });
}
