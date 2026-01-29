import { useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastListeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

function notifyListeners() {
  toastListeners.forEach(fn => fn([...toasts]))
}

export function toast(message: string, type: ToastType = 'info') {
  const id = Date.now().toString()
  toasts = [...toasts, { id, message, type }]
  notifyListeners()
  
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id)
    notifyListeners()
  }, 4000)
}

export function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([])
  
  useEffect(() => {
    toastListeners.push(setItems)
    return () => {
      toastListeners = toastListeners.filter(fn => fn !== setItems)
    }
  }, [])

  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  const colors: Record<ToastType, string> = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-amber-500',
    info: 'bg-blue-600',
  }

  if (!items.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {items.map(item => (
        <div
          key={item.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg text-white shadow-lg
            animate-fade-in ${colors[item.type]}
          `}
        >
          <span className="text-lg">{icons[item.type]}</span>
          <span className="text-sm font-medium">{item.message}</span>
        </div>
      ))}
    </div>
  )
}
