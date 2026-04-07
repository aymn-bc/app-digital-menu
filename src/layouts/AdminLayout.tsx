import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAppStore, selectOnline } from '@/store/useStore'
import { ToastContainer } from '@/components/ui'
import { useState } from 'react'

// Admin can only manage appearance - NO access to profits/financial data
const menuItems = [
  { path: '/admin/users', icon: '👥', label: 'Users', description: 'Manage all users' },
  { path: '/admin/restaurants', icon: '🏪', label: 'Restaurants', description: 'Manage restaurant list' },
  { path: '/admin/themes', icon: '🎨', label: 'Theme Editor', description: 'Customize colors & styles' },
  { path: '/admin/heroes', icon: '🖼️', label: 'Hero Sections', description: 'Edit hero banners' },
  { path: '/admin/menus', icon: '📋', label: 'Menu Layouts', description: 'Menu display settings' },
  { path: '/admin/preview', icon: '👁️', label: 'Live Preview', description: 'Preview changes' },
  { path: '/admin/activity', icon: '📜', label: 'Activity Log', description: 'Recent changes' },
]

export default function AdminLayout() {
  const online = useAppStore(selectOnline)
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  if (!online) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg))] flex items-center justify-center" data-interface="admin">
        <div className="text-center bg-[rgb(var(--bg-card))] p-8 rounded-2xl shadow-xl max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[rgb(var(--text))] mb-3">No Internet Connection</h2>
          <p className="text-[rgb(var(--text-muted))] mb-6">Admin panel requires an active connection to manage restaurant appearances.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-[rgb(var(--primary))] font-semibold hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Customer View
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] flex" data-interface="admin">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${sidebarOpen ? 'w-72' : 'w-20'} 
        bg-[rgb(var(--bg-card))] border-r border-[rgb(var(--border))] 
        transition-all duration-300 flex flex-col shadow-lg
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[rgb(var(--border))]">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary-dark))] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-[rgb(var(--text))] block">Admin Panel</span>
                <span className="text-xs text-[rgb(var(--text-muted))]">Appearance Only</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] p-2 rounded-lg hover:bg-[rgb(var(--bg-elevated))] transition-colors"
          >
            <svg className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-4 mb-2">
            {sidebarOpen && (
              <p className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-3">
                Appearance Management
              </p>
            )}
          </div>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 mx-3 rounded-xl transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-[rgb(var(--primary))] text-white shadow-lg shadow-[rgb(var(--primary))]/20'
                  : 'text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--bg-elevated))] hover:text-[rgb(var(--text))]'
                }
              `}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <div className="min-w-0">
                  <span className="text-sm font-semibold block">{item.label}</span>
                  <span className={`text-xs truncate block ${isActive(item.path) ? 'text-white/70' : 'text-[rgb(var(--text-muted))]'}`}>
                    {item.description}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-[rgb(var(--border))] space-y-1">
          {sidebarOpen && (
            <p className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider px-3 mb-2">
              Quick Links
            </p>
          )}
          <Link
            to="/restaurant"
            className="flex items-center gap-3 px-3 py-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg transition-colors text-sm"
          >
            <span className="text-lg">🏪</span>
            {sidebarOpen && <span>Restaurant View</span>}
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg transition-colors text-sm"
          >
            <span className="text-lg">🏠</span>
            {sidebarOpen && <span>Customer View</span>}
          </Link>
        </div>

        {/* Admin Badge */}
        {sidebarOpen && (
          <div className="p-4 border-t border-[rgb(var(--border))]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgb(var(--bg-elevated))]">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[rgb(var(--text))] text-sm truncate">Admin User</p>
                <p className="text-xs text-[rgb(var(--text-muted))]">Design Access Only</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[rgb(var(--bg-card))] border-b border-[rgb(var(--border))] flex items-center justify-between px-4 lg:px-6 shadow-sm sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text))]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-[rgb(var(--text))]">Restaurant Appearance Management</h1>
            <p className="text-xs text-[rgb(var(--text-muted))]">Customize themes, colors, and layouts • No access to financial data</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Connected</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[rgb(var(--primary))] rounded-full" />
              </button>
              
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-[rgb(var(--bg-card))] border border-[rgb(var(--border))] rounded-xl shadow-xl z-20">
                    <div className="p-4 border-b border-[rgb(var(--border))]">
                      <h3 className="font-semibold text-[rgb(var(--text))]">Notifications</h3>
                    </div>
                    <div className="p-4">
                      <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-[rgb(var(--text-muted))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <p className="text-[rgb(var(--text-muted))] text-sm">No new notifications</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-[rgb(var(--primary))]/30 transition-all"
              >
                A
              </button>
              
              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[rgb(var(--bg-card))] border border-[rgb(var(--border))] rounded-xl shadow-xl z-20">
                    <div className="p-4 border-b border-[rgb(var(--border))]">
                      <p className="font-semibold text-[rgb(var(--text))]">Admin User</p>
                      <p className="text-sm text-[rgb(var(--text-muted))]">admin@example.com</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/restaurant"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span>🏪</span> Restaurant View
                      </Link>
                      <Link
                        to="/"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <span>🏠</span> Customer View
                      </Link>
                      <button
                        onClick={() => { /* logout logic */ setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
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
