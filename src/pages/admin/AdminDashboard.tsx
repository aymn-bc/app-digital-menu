import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { getAdminStats, getRestaurants, getThemeUpdateHistory } from '@/api/admin'
import type { AdminStats, Restaurant, ThemeUpdate } from '@/api/admin'

export default function AdminDashboard() {
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [themeUpdates, setThemeUpdates] = useState<ThemeUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [statsData, restaurantsData, updatesData] = await Promise.all([
          getAdminStats(),
          getRestaurants(),
          getThemeUpdateHistory()
        ])
        setAdminStats(statsData)
        setRestaurants(restaurantsData)
        setThemeUpdates(updatesData)
      } catch (err) {
        setError('Failed to load dashboard data')
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Dashboard</h1>
            <p className="text-[rgb(var(--text-muted))]">Loading...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} variant="elevated">
              <CardContent className="p-5">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !adminStats) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Dashboard</h1>
            <p className="text-red-500">{error || 'Failed to load data'}</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { 
      label: 'Total Restaurants', 
      value: adminStats.totalRestaurants, 
      icon: '🏪',
      color: 'bg-blue-500',
      trend: '+12 this month'
    },
    { 
      label: 'Active Menus', 
      value: adminStats.activeMenus, 
      icon: '📋',
      color: 'bg-green-500',
      trend: '91% active'
    },
    { 
      label: 'Custom Themes', 
      value: adminStats.customThemes, 
      icon: '🎨',
      color: 'bg-purple-500',
      trend: '+5 new themes'
    },
    { 
      label: 'Pending Reviews', 
      value: adminStats.pendingApprovals, 
      icon: '⏳',
      color: 'bg-amber-500',
      trend: 'Needs attention'
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Dashboard</h1>
          <p className="text-[rgb(var(--text-muted))]">Overview of restaurant appearances</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Report
          </Button>
          <Link to="/admin/themes">
            <Button size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Theme
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} variant="elevated" className="stagger-item">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[rgb(var(--text-muted))] mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[rgb(var(--text))]">{stat.value}</p>
                  <p className="text-xs text-[rgb(var(--text-muted))] mt-1">{stat.trend}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Restaurants */}
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <CardHeader action={
              <Link to="/admin/restaurants" className="text-sm text-[rgb(var(--primary))] font-medium hover:underline">
                View All →
              </Link>
            }>
              <h2 className="font-bold text-[rgb(var(--text))]">Recent Restaurants</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Latest restaurant theme configurations</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[rgb(var(--border))]">
                {restaurants.slice(0, 4).map((restaurant) => (
                  <div key={restaurant.id} className="p-4 hover:bg-[rgb(var(--bg-elevated))] transition-colors">
                    <div className="flex items-center gap-4">
                      <img 
                        src={restaurant.logo} 
                        alt={restaurant.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[rgb(var(--text))] truncate">{restaurant.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                            style={{ backgroundColor: restaurant.theme.primaryColor }}
                          />
                          <span 
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                            style={{ backgroundColor: restaurant.theme.secondaryColor }}
                          />
                          <span className="text-xs text-[rgb(var(--text-muted))]">
                            {restaurant.theme.cardStyle} • {restaurant.theme.borderRadius}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          restaurant.isOpen 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {restaurant.isOpen ? 'Open' : 'Closed'}
                        </span>
                        <Link to={`/admin/themes/${restaurant.id}`}>
                          <Button variant="ghost" size="xs">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card variant="elevated">
            <CardHeader action={
              <Link to="/admin/activity" className="text-sm text-[rgb(var(--primary))] font-medium hover:underline">
                View All →
              </Link>
            }>
              <h2 className="font-bold text-[rgb(var(--text))]">Recent Activity</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Latest theme changes</p>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {themeUpdates.map((update) => (
                <div key={update.id} className="timeline-step">
                  <div className="dot" />
                  <div>
                    <p className="font-medium text-[rgb(var(--text))] text-sm">{update.changeType}</p>
                    <p className="text-xs text-[rgb(var(--text-muted))] mt-0.5">{update.restaurantName}</p>
                    <p className="text-xs text-[rgb(var(--text-muted))] mt-1">{update.details}</p>
                    <p className="text-xs text-[rgb(var(--primary))] mt-1">
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card variant="bordered">
        <CardContent className="p-6">
          <h3 className="font-bold text-[rgb(var(--text))] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🎨', label: 'Edit Theme', href: '/admin/themes', desc: 'Customize colors' },
              { icon: '🖼️', label: 'Hero Editor', href: '/admin/heroes', desc: 'Edit banners' },
              { icon: '👁️', label: 'Preview', href: '/admin/preview', desc: 'Live preview' },
              { icon: '📋', label: 'Menu Layout', href: '/admin/menus', desc: 'Card styles' },
            ].map((action, index) => (
              <Link 
                key={index}
                to={action.href}
                className="p-4 rounded-xl bg-[rgb(var(--bg-elevated))] hover:bg-[rgb(var(--border))] transition-all hover:scale-105 text-center group"
              >
                <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{action.icon}</span>
                <p className="font-semibold text-[rgb(var(--text))] text-sm">{action.label}</p>
                <p className="text-xs text-[rgb(var(--text-muted))]">{action.desc}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-amber-800">Appearance Management Only</p>
          <p className="text-sm text-amber-700 mt-1">
            As an admin, you can manage restaurant themes, colors, hero sections, and menu layouts. 
            Financial data, profits, and sales reports are not accessible from this panel.
          </p>
        </div>
      </div>
    </div>
  )
}
