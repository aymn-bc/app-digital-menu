export function registerSW(onUpdate?: () => void) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        console.log("SW registered", reg.scope);
        reg.addEventListener("updatefound", () => {
          onUpdate?.();
        });
      } catch (err) {
        console.warn("SW registration failed", err);
      }
    });
  }
}
