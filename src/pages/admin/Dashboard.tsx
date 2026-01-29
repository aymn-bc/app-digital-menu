import { Card, CardContent, CardHeader, Button } from '@/components/ui'

const stats = [
  { label: 'Total Orders', value: '1,234', change: '+12%', icon: '📦' },
  { label: 'Revenue', value: '$12,345', change: '+8%', icon: '💰' },
  { label: 'Menu Items', value: '48', change: '+2', icon: '🍽️' },
  { label: 'Active Tables', value: '12', change: '0', icon: '🪑' },
]

const recentOrders = [
  { id: '001', table: 'Table 5', items: 3, total: 45.99, status: 'Preparing' },
  { id: '002', table: 'Table 2', items: 2, total: 28.50, status: 'Ready' },
  { id: '003', table: 'Table 8', items: 5, total: 89.00, status: 'Served' },
]

export default function AdminDashboard() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Dashboard</h1>
        <p className="text-[rgb(var(--text-muted))] mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[rgb(var(--text-muted))]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[rgb(var(--text))] mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[rgb(var(--text))]">Recent Orders</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <div className="divide-y divide-[rgb(var(--border))]">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[rgb(var(--bg))] flex items-center justify-center text-lg">
                    🧾
                  </div>
                  <div>
                    <p className="font-medium text-[rgb(var(--text))]">Order #{order.id}</p>
                    <p className="text-sm text-[rgb(var(--text-muted))]">{order.table} • {order.items} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[rgb(var(--text))]">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === 'Ready' ? 'bg-green-100 text-green-700' :
                    order.status === 'Preparing' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-[rgb(var(--text))]">Quick Actions</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="secondary" className="w-full justify-start gap-3">
              <span>➕</span> Add Menu Item
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <span>📋</span> Manage Categories
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <span>🎨</span> Customize Theme
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <span>🌍</span> Manage Translations
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <span>📊</span> View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
