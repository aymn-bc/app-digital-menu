import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAppStore, useAuthStore, selectOnline, selectUser } from '@/store/useStore'
import { ToastContainer } from '@/components/ui'
import { useState, useEffect } from 'react'

const menuItems = [
  { path: '/restaurant', icon: '📊', label: 'Dashboard', description: 'Overview & stats' },
  { path: '/restaurant/orders', icon: '📋', label: 'Orders', description: 'Manage orders' },
  { path: '/restaurant/menu', icon: '🍔', label: 'Menu Manager', description: 'Add/edit items' },
  { path: '/restaurant/branding', icon: '🎨', label: 'Branding', description: 'Customize look' },
  { path: '/restaurant/kitchen', icon: '👨‍🍳', label: 'Kitchen', description: 'Kitchen display' },
  { path: '/restaurant/tables', icon: '🪑', label: 'Tables', description: 'Table management' },
  { path: '/restaurant/subscription', icon: '💳', label: 'Subscription', description: 'Billing & plans' },
]

export default function RestaurantLayout() {
  const online = useAppStore(selectOnline)
  const user = useAuthStore(selectUser)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname])

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (path: string) => location.pathname === path

  if (!online) {
    return (
      <div className="min-h-screen bg-[rgb(24,24,27)] flex items-center justify-center p-4" data-interface="restaurant">
        <div className="text-center text-white max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📡</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Connection Required</h2>
          <p className="text-gray-400 mb-6">Restaurant interface requires an active internet connection to manage orders and menu.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(24,24,27)] flex" data-interface="restaurant">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-[rgb(32,32,35)] border-r border-white/10 
        transition-all duration-300 flex flex-col
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          <Link to="/restaurant" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="text-white font-bold block">Restaurant</span>
                <span className="text-gray-500 text-xs">Management</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-4 mb-3">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Menu</p>
            )}
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <div className="min-w-0">
                  <span className="font-medium block">{item.label}</span>
                  <span className={`text-xs ${isActive(item.path) ? 'text-white/70' : 'text-gray-500'}`}>
                    {item.description}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          {user && sidebarOpen && (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{user.name}</p>
                <p className="text-gray-500 text-xs truncate">{user.email}</p>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm"
            >
              <span>🏠</span>
              {sidebarOpen && <span>Customer View</span>}
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
            >
              <span>🚪</span>
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[rgb(32,32,35)] border-b border-white/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Page Title - Show on desktop */}
          <div className="hidden lg:block">
            <h1 className="text-white font-semibold">Restaurant Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your restaurant operations</p>
          </div>

          {/* Mobile Title */}
          <div className="lg:hidden flex-1 text-center">
            <h1 className="text-white font-semibold">Restaurant</h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Live</span>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar - Desktop */}
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-white/10">
              {user && (
                <>
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">{user.name}</p>
                    <p className="text-gray-500 text-xs capitalize">{user.role}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
