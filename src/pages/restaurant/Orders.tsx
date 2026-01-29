import { useState } from 'react'
import { Card, Badge } from '@/components/ui'

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'paid'

interface Order {
  id: string
  table: string
  items: { name: string; quantity: number; price: number }[]
  status: OrderStatus
  total: number
  createdAt: string
}

const mockOrders: Order[] = [
  {
    id: '#2847',
    table: 'Table 5',
    items: [
      { name: 'Original Recipe Chicken', quantity: 2, price: 12.99 },
      { name: 'Coleslaw', quantity: 1, price: 3.49 },
    ],
    status: 'preparing',
    total: 29.47,
    createdAt: '2 min ago',
  },
  {
    id: '#2846',
    table: 'Table 12',
    items: [
      { name: 'Zinger Burger', quantity: 3, price: 8.99 },
      { name: 'Large Fries', quantity: 2, price: 4.49 },
      { name: 'Pepsi', quantity: 3, price: 2.49 },
    ],
    status: 'ready',
    total: 43.42,
    createdAt: '5 min ago',
  },
  {
    id: '#2845',
    table: 'Table 3',
    items: [
      { name: 'Family Bucket', quantity: 1, price: 34.99 },
    ],
    status: 'served',
    total: 34.99,
    createdAt: '12 min ago',
  },
  {
    id: '#2844',
    table: 'Table 8',
    items: [
      { name: 'Hot Wings', quantity: 2, price: 7.99 },
      { name: 'Mashed Potatoes', quantity: 1, price: 3.99 },
    ],
    status: 'pending',
    total: 19.97,
    createdAt: '1 min ago',
  },
]

const statusConfig: Record<OrderStatus, { color: 'default' | 'warning' | 'success' | 'info'; label: string }> = {
  pending: { color: 'default', label: 'Pending' },
  preparing: { color: 'warning', label: 'Preparing' },
  ready: { color: 'success', label: 'Ready' },
  served: { color: 'info', label: 'Served' },
  paid: { color: 'default', label: 'Paid' },
}

export default function RestaurantOrders() {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all')
  const [orders] = useState<Order[]>(mockOrders)

  const filteredOrders = filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    console.log('Update order', orderId, 'to', newStatus)
    // In real app, call API and update state
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-400 mt-1">Manage incoming and active orders</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Filter:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as OrderStatus | 'all')}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[rgb(var(--primary))]"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="served">Served</option>
          </select>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="bg-gray-800 border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{order.id}</span>
                <Badge variant={statusConfig[order.status].color}>
                  {statusConfig[order.status].label}
                </Badge>
              </div>
              <span className="text-sm text-gray-400">{order.createdAt}</span>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                <span>🪑</span>
                <span className="font-medium text-white">{order.table}</span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      <span className="text-gray-400">{item.quantity}x</span> {item.name}
                    </span>
                    <span className="text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-700 flex justify-between items-center">
                <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'preparing')}
                      className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-sm rounded-lg transition-colors"
                    >
                      Start
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'ready')}
                      className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-sm rounded-lg transition-colors"
                    >
                      Ready
                    </button>
                  )}
                  {order.status === 'ready' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'served')}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-sm rounded-lg transition-colors"
                    >
                      Served
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <span className="text-4xl block mb-3">📭</span>
          <p className="text-gray-400">No orders found</p>
        </div>
      )}
    </div>
  )
}
