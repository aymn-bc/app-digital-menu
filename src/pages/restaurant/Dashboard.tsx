import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Button } from '@/components/ui'

const stats = [
  { label: 'Active Orders', value: '12', change: '+3', trend: 'up', icon: '📋', color: 'from-blue-500 to-blue-600' },
  { label: "Today's Revenue", value: '$1,240', change: '+12%', trend: 'up', icon: '💰', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Items Served', value: '87', change: '+15', trend: 'up', icon: '🍽️', color: 'from-amber-500 to-orange-500' },
  { label: 'Avg Wait Time', value: '8m', change: '-2m', trend: 'down', icon: '⏱️', color: 'from-purple-500 to-purple-600' },
]

const recentOrders = [
  { id: '#2847', table: 'Table 5', items: 3, total: '$45.50', status: 'preparing', time: '2 min ago', customer: 'John D.' },
  { id: '#2846', table: 'Table 12', items: 5, total: '$78.00', status: 'ready', time: '5 min ago', customer: 'Sarah M.' },
  { id: '#2845', table: 'Table 3', items: 2, total: '$24.99', status: 'served', time: '8 min ago', customer: 'Mike R.' },
  { id: '#2844', table: 'Table 8', items: 4, total: '$56.50', status: 'preparing', time: '10 min ago', customer: 'Emma W.' },
]

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served'

const statusConfig: Record<OrderStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Pending' },
  preparing: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Preparing' },
  ready: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Ready' },
  served: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Served' },
}

const quickActions = [
  { icon: '➕', label: 'New Order', description: 'Create order', link: '/restaurant/orders' },
  { icon: '🍔', label: 'Edit Menu', description: 'Update items', link: '/restaurant/menu' },
  { icon: '🎨', label: 'Branding', description: 'Customize', link: '/restaurant/branding' },
  { icon: '📊', label: 'Reports', description: 'Analytics', link: '/restaurant' },
]

const popularItems = [
  { name: 'Crispy Chicken Bucket', orders: 45, revenue: '$450', trend: '+12%' },
  { name: 'Spicy Wings (12pc)', orders: 38, revenue: '$342', trend: '+8%' },
  { name: 'Family Feast', orders: 24, revenue: '$720', trend: '+15%' },
]

export default function RestaurantDashboard() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back!</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
          {(['today', 'week', 'month'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={[
                'px-4 py-2 rounded-md text-sm font-medium capitalize transition-all',
                timeRange === range ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
              ].join(' ')}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={stat.trend === 'up' ? 'text-xs text-emerald-400' : 'text-xs text-blue-400'}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                  </p>
                </div>
                <div className={'w-10 h-10 rounded-xl bg-linear-to-br ' + stat.color + ' flex items-center justify-center text-xl'}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card className="bg-white/5 border-white/10">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-semibold text-white">Recent Orders</h2>
              <Link to="/restaurant/orders">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentOrders.map((order) => {
                const config = statusConfig[order.status as OrderStatus]
                return (
                  <div key={order.id} className="p-4 flex items-center gap-4 hover:bg-white/5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{order.id}</span>
                        <span className={'px-2 py-0.5 rounded-full text-xs ' + config.bg + ' ' + config.text}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{order.customer} • {order.table}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{order.total}</p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link 
                  key={action.label}
                  to={action.link}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl text-center transition-all"
                >
                  <span className="text-2xl block mb-2">{action.icon}</span>
                  <span className="text-sm font-medium text-white block">{action.label}</span>
                  <span className="text-xs text-gray-500">{action.description}</span>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <div className="p-4 border-b border-white/10">
              <h2 className="font-semibold text-white">Top Items</h2>
            </div>
            <div className="divide-y divide-white/5">
              {popularItems.map((item, idx) => (
                <div key={item.name} className="p-4 flex items-center gap-3">
                  <div className={idx === 0 
                    ? 'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-amber-500/20 text-amber-400'
                    : 'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-white/10 text-gray-400'
                  }>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{item.revenue}</p>
                    <p className="text-emerald-400 text-xs">{item.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
