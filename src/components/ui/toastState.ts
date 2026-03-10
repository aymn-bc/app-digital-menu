export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toasts]));
}

export function toast(message: string, type: ToastType = "info") {
  const id = Date.now().toString();
  toasts = [...toasts, { id, message, type }];
  notifyListeners();

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 4000);
}

export function addToastListener(listener: (toasts: Toast[]) => void) {
  toastListeners.push(listener);
}

export function removeToastListener(listener: (toasts: Toast[]) => void) {
  toastListeners = toastListeners.filter((fn) => fn !== listener);
}
