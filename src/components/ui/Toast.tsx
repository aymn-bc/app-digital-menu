import { useEffect, useState } from 'react'
import type { Toast, ToastType } from './toastState'
import { addToastListener, removeToastListener } from './toastState'

export function ToastContainer() {
  const [items, setItems] = useState<Toast[]>([])
  
  useEffect(() => {
    addToastListener(setItems)
    return () => {
      removeToastListener(setItems)
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
