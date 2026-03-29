
import { type JSX, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Badge } from '@/components/ui'
import { generateOrders } from '@/utils/seedData'

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  time: string
  status: OrderStatus
  items: OrderItem[]
  total: number
  tableNumber?: string
  estimatedTime?: string
}

const statusConfig: Record<OrderStatus, { label: string; color: 'default' | 'info' | 'warning' | 'success' | 'error'; icon: string }> = {
  pending: { label: 'Pending', color: 'default', icon: '⏳' },
  confirmed: { label: 'Confirmed', color: 'info', icon: '✓' },
  preparing: { label: 'Preparing', color: 'warning', icon: '👨‍🍳' },
  ready: { label: 'Ready', color: 'success', icon: '🔔' },
  delivered: { label: 'Delivered', color: 'success', icon: '✅' },
  cancelled: { label: 'Cancelled', color: 'error', icon: '✗' },
}

const orderSteps: { key: OrderStatus; label: string; icon: string }[] = [
  { key: 'confirmed', label: 'Confirmed', icon: '✓' },
  { key: 'preparing', label: 'Preparing', icon: '👨‍🍳' },
  { key: 'ready', label: 'Ready', icon: '🔔' },
  { key: 'delivered', label: 'Served', icon: '✅' },
]

function getStepStatus(orderStatus: OrderStatus, stepKey: OrderStatus): 'completed' | 'active' | 'pending' {
  const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'delivered']
  const currentIndex = statusOrder.indexOf(orderStatus)
  const stepIndex = statusOrder.indexOf(stepKey)
  
  if (stepIndex < currentIndex) return 'completed'
  if (stepIndex === currentIndex) return 'active'
  return 'pending'
}

export default function OrdersPage(): JSX.Element {
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('all')
  const [orders, setOrders] = useState<Order[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Initialize with generated orders
  useEffect(() => {
    const generatedOrders = generateOrders()
    const transformedOrders = generatedOrders.map((o: any) => ({
      ...o,
      status: (['pending', 'confirmed', 'preparing', 'ready', 'delivered'] as OrderStatus[]).includes(o.status as OrderStatus)
        ? (o.status as OrderStatus)
        : 'pending',
    }))
    setOrders(transformedOrders)
    setExpandedOrder(transformedOrders[0]?.id || null)
  }, [])

  const filteredOrders = orders.filter(order => {
    if (filter === 'active') return ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
    if (filter === 'completed') return ['delivered', 'cancelled'].includes(order.status)
    return true
  })

  if (orders.length === 0) {
    return (
      <div className="container-app py-12">
        <div className="empty-state">
          <div className="empty-state-icon">
            📋
          </div>
          <h2 className="text-2xl font-bold text-[rgb(var(--text))] mb-2">No orders yet</h2>
          <p className="text-[rgb(var(--text-muted))] mb-8 max-w-md">
            You haven't placed any orders yet. Start exploring our delicious menu!
          </p>
          <Link to="/">
            <Button size="lg" className="px-8">
              <span className="mr-2">🍽️</span>
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--text))]">Your Orders</h1>
          <p className="text-[rgb(var(--text-muted))]">Track and manage your orders</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 bg-[rgb(var(--bg-elevated))] rounded-lg">
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                filter === tab.key
                  ? 'bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] shadow-sm'
                  : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, idx) => {
          const status = statusConfig[order.status]
          const isExpanded = expandedOrder === order.id
          const isActive = ['pending', 'confirmed', 'preparing', 'ready'].includes(order.status)
          
          return (
            <Card 
              key={order.id} 
              className={`overflow-hidden stagger-item transition-all ${
                isActive ? 'ring-2 ring-[rgb(var(--primary))/0.3]' : ''
              }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Order Header */}
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[rgb(var(--bg-elevated))/0.5] transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Status Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    isActive 
                      ? 'bg-[rgb(var(--primary))/0.1] animate-pulse' 
                      : 'bg-[rgb(var(--bg-elevated))]'
                  }`}>
                    {status.icon}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[rgb(var(--text))]">{order.orderNumber}</span>
                      <Badge variant={status.color}>{status.label}</Badge>
                    </div>
                    <div className="text-sm text-[rgb(var(--text-muted))] mt-1">
                      {order.date} at {order.time} • Table {order.tableNumber}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-[rgb(var(--text))]">${order.total.toFixed(2)}</div>
                    <div className="text-xs text-[rgb(var(--text-muted))]">{order.items.length} items</div>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-[rgb(var(--text-muted))] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-[rgb(var(--border))] animate-fade-in">
                  {/* Order Progress - Only for active orders */}
                  {isActive && (
                    <div className="p-6 bg-[rgb(var(--bg-elevated))/0.3]">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[rgb(var(--text))]">Order Progress</h4>
                        {order.estimatedTime && (
                          <span className="text-sm text-[rgb(var(--primary))] font-medium">
                            ⏱️ Est. {order.estimatedTime}
                          </span>
                        )}
                      </div>
                      
                      {/* Progress Steps */}
                      <div className="order-stepper mt-4">
                        {orderSteps.map((step) => {
                          const stepStatus = getStepStatus(order.status, step.key)
                          return (
                            <div key={step.key} className={`order-step ${stepStatus}`}>
                              <div className={`order-step-icon ${
                                stepStatus === 'completed' ? 'bg-[rgb(var(--success))] text-white border-[rgb(var(--success))]' :
                                stepStatus === 'active' ? 'bg-[rgb(var(--primary))] text-white border-[rgb(var(--primary))] glow-primary' :
                                'bg-[rgb(var(--bg-card))] border-[rgb(var(--border))]'
                              }`}>
                                {stepStatus === 'completed' ? '✓' : step.icon}
                              </div>
                              <span className={`text-xs font-medium mt-1 ${
                                stepStatus === 'active' ? 'text-[rgb(var(--primary))]' : 
                                stepStatus === 'completed' ? 'text-[rgb(var(--success))]' :
                                'text-[rgb(var(--text-muted))]'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Order Items */}
                  <div className="p-4">
                    <h4 className="font-semibold text-[rgb(var(--text))] mb-3">Items</h4>
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center text-xs font-bold text-[rgb(var(--text-muted))]">
                              {item.quantity}×
                            </span>
                            <span className="text-[rgb(var(--text))]">{item.name}</span>
                          </div>
                          <span className="font-medium text-[rgb(var(--text))]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Order Actions */}
                    <div className="flex gap-3 mt-4 pt-4 border-t border-[rgb(var(--border))]">
                      <Button variant="secondary" size="sm" className="flex-1">
                        <span className="mr-2">📋</span>
                        View Receipt
                      </Button>
                      {isActive && (
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                          Cancel Order
                        </Button>
                      )}
                      {!isActive && (
                        <Button variant="primary" size="sm" className="flex-1">
                          <span className="mr-2">🔄</span>
                          Reorder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[rgb(var(--text-muted))]">No {filter} orders found</p>
        </div>
      )}
    </div>
  )
}

