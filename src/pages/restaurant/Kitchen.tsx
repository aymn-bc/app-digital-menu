import { useState, useEffect } from 'react'
import { Card } from '@/components/ui'

interface KitchenOrder {
  id: string
  table: string
  items: { name: string; quantity: number; notes?: string }[]
  status: 'queued' | 'cooking' | 'ready'
  priority: 'normal' | 'rush'
  waitTime: number // in minutes
}

const mockKitchenOrders: KitchenOrder[] = [
  {
    id: '#2847',
    table: 'Table 5',
    items: [
      { name: 'Original Recipe Chicken (4pc)', quantity: 1 },
      { name: 'Hot Wings (8pc)', quantity: 1, notes: 'Extra spicy' },
    ],
    status: 'cooking',
    priority: 'normal',
    waitTime: 5,
  },
  {
    id: '#2846',
    table: 'Table 12',
    items: [
      { name: 'Zinger Burger', quantity: 2, notes: 'No onions' },
      { name: 'Crispy Strips (5pc)', quantity: 1 },
    ],
    status: 'cooking',
    priority: 'rush',
    waitTime: 8,
  },
  {
    id: '#2848',
    table: 'Table 7',
    items: [
      { name: 'Family Bucket (12pc)', quantity: 1 },
      { name: 'Large Coleslaw', quantity: 2 },
    ],
    status: 'queued',
    priority: 'normal',
    waitTime: 0,
  },
  {
    id: '#2849',
    table: 'Table 2',
    items: [
      { name: 'Popcorn Chicken', quantity: 2 },
    ],
    status: 'ready',
    priority: 'normal',
    waitTime: 12,
  },
]

export default function KitchenDisplay() {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockKitchenOrders)
  const [time, setTime] = useState(new Date())

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const queuedOrders = orders.filter((o) => o.status === 'queued')
  const cookingOrders = orders.filter((o) => o.status === 'cooking')
  const readyOrders = orders.filter((o) => o.status === 'ready')

  const moveToStatus = (orderId: string, status: KitchenOrder['status']) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }

  const OrderCard = ({ order, showActions = true }: { order: KitchenOrder; showActions?: boolean }) => (
    <Card
      className={`bg-gray-800 border-2 ${
        order.priority === 'rush' ? 'border-red-500 animate-pulse-slow' : 'border-gray-700'
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{order.id}</span>
            {order.priority === 'rush' && (
              <span className="px-2 py-0.5 bg-red-500 text-xs rounded-full animate-pulse">RUSH</span>
            )}
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{order.table}</span>
            {order.waitTime > 0 && (
              <p className={`text-sm ${order.waitTime > 10 ? 'text-red-400' : 'text-gray-400'}`}>
                {order.waitTime} min
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-[rgb(var(--primary))] rounded-full flex items-center justify-center font-bold">
                  {item.quantity}
                </span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.notes && (
                <p className="mt-2 text-sm text-yellow-400 pl-10">⚠️ {item.notes}</p>
              )}
            </div>
          ))}
        </div>

        {showActions && (
          <div className="mt-4 flex gap-2">
            {order.status === 'queued' && (
              <button
                onClick={() => moveToStatus(order.id, 'cooking')}
                className="flex-1 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-medium transition-colors"
              >
                Start Cooking
              </button>
            )}
            {order.status === 'cooking' && (
              <button
                onClick={() => moveToStatus(order.id, 'ready')}
                className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
              >
                Mark Ready
              </button>
            )}
            {order.status === 'ready' && (
              <button
                onClick={() => setOrders(orders.filter((o) => o.id !== order.id))}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
              >
                Picked Up
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kitchen Display</h1>
          <p className="text-gray-400">Real-time order management</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-mono font-bold">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-gray-400">{time.toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 text-center border-l-4 border-gray-500">
          <p className="text-3xl font-bold">{queuedOrders.length}</p>
          <p className="text-gray-400 text-sm">Queued</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center border-l-4 border-yellow-500">
          <p className="text-3xl font-bold text-yellow-400">{cookingOrders.length}</p>
          <p className="text-gray-400 text-sm">Cooking</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center border-l-4 border-green-500">
          <p className="text-3xl font-bold text-green-400">{readyOrders.length}</p>
          <p className="text-gray-400 text-sm">Ready</p>
        </div>
      </div>

      {/* Orders Columns */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Queued */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500" />
            Queued ({queuedOrders.length})
          </h2>
          <div className="space-y-4">
            {queuedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Cooking */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            Cooking ({cookingOrders.length})
          </h2>
          <div className="space-y-4">
            {cookingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Ready */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            Ready ({readyOrders.length})
          </h2>
          <div className="space-y-4">
            {readyOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
