import { Link } from 'react-router-dom'
import { useAppStore, selectOnline, selectPendingOrders } from '@/store/useStore'

export default function Header() {
  const online = useAppStore(selectOnline)
  const pending = useAppStore(selectPendingOrders)

  return (
    <header className="bg-white/60 backdrop-blur-md dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-semibold tracking-tight">DigiMenu</Link>
          <div className="text-sm text-gray-500">Smart Digital Menu</div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${online ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <span className={`h-2 w-2 rounded-full ${online ? 'bg-green-600' : 'bg-red-600'}`} />
            {online ? 'Online' : 'Offline'}
          </span>

          <Link to="/orders" className="relative inline-flex items-center px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 text-sm">
            Orders
            {pending > 0 && <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-yellow-400 text-xs text-black font-semibold">{pending}</span>}
          </Link>

          <Link to="/admin" className="text-sm text-gray-600">Admin</Link>
        </div>
      </div>
    </header>
  )
}
