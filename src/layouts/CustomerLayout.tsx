import { Link, useLocation, Outlet } from 'react-router-dom'
import { useAppStore, useAuthStore, selectOnline, selectPendingOrders, selectIsAuthenticated, selectUser, selectSelectedRestaurant } from '@/store/useStore'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { ToastContainer } from '@/components/ui'
import { useState, useEffect } from 'react'

export default function CustomerLayout() {
  const online = useAppStore(selectOnline)
  const pendingOrders = useAppStore(selectPendingOrders)
  const selectedRestaurantId = useAppStore(selectSelectedRestaurant)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const user = useAuthStore(selectUser)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Track scroll for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) =>
    location.pathname === path ||
    (path === '/menu' && location.pathname.startsWith('/menu'))
  
  // Check if we're on the restaurant list (home) page
  const isHomePage = location.pathname === '/'
  // Check if we're on the menu page (hero section handles its own spacing)
  const isMenuPage = location.pathname.startsWith('/menu')
  const hasHeroSection = isHomePage || isMenuPage

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] flex flex-col">
      {/* Floating Header - Transparent at top, solid when scrolled */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !hasHeroSection
          ? 'bg-[rgb(var(--primary))] shadow-lg' 
          : 'bg-linear-to-b from-black/50 to-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                scrolled || !hasHeroSection ? 'bg-white' : 'bg-white/90'
              }`}>
                <span className="text-[rgb(var(--primary))] font-black text-sm sm:text-lg">DM</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform">DigiMenu</h1>
                <p className="text-xs text-white/70 -mt-0.5">Taste the Difference</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1">
              {[
                { path: '/', label: 'Restaurants', icon: '🏪' },
                { path: selectedRestaurantId ? `/menu/${selectedRestaurantId}` : '/menu', label: 'Menu', icon: '🍽️' },
                { path: '/cart', label: 'Cart', icon: '🛒', badge: pendingOrders },
                { path: '/orders', label: 'Orders', icon: '📋' },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-4 lg:px-5 py-2 rounded-full text-sm font-semibold transition-all relative flex items-center gap-2 ${
                    isActive(item.path) ? 'bg-white text-[rgb(var(--primary))] shadow-md' : 'text-white hover:bg-white/20'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[rgb(var(--secondary))] text-[rgb(var(--accent))] text-xs flex items-center justify-center font-bold animate-bounce">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Online Status */}
              <div className={`hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium ${
                online 
                  ? 'bg-green-500/20 text-green-100' 
                  : 'bg-red-500/20 text-red-100'
              }`}>
                <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="hidden lg:inline">{online ? 'Online' : 'Offline'}</span>
              </div>
              
              <LanguageSwitcher />

              {/* Auth Button / User Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <img 
                      src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'} 
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="hidden lg:inline text-white text-sm font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                  
                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-[rgb(var(--bg-card))] rounded-xl shadow-xl border border-[rgb(var(--border))] overflow-hidden z-50">
                      <div className="p-4 border-b border-[rgb(var(--border))]">
                        <p className="font-semibold text-[rgb(var(--text))]">{user.name}</p>
                        <p className="text-sm text-[rgb(var(--text-muted))]">{user.email}</p>
                        <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] capitalize">
                          {user.role}
                        </span>
                      </div>
                      <div className="p-2">
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span>⚙️</span> Admin Panel
                          </Link>
                        )}
                        {(user.role === 'restaurant' || user.role === 'admin') && (
                          <Link
                            to="/restaurant"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] rounded-lg"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span>🏪</span> Restaurant Dashboard
                          </Link>
                        )}
                        <button
                          onClick={() => { logout(); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[rgb(var(--primary))] hover:bg-white/90 transition-colors text-sm font-semibold"
                >
                  <span>🔐</span>
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgb(var(--bg-card))] border-t border-[rgb(var(--border))] shadow-lg safe-area-bottom">
        <div className="flex items-center justify-around h-16 pb-safe">
          {[
            { path: '/', label: 'Home', icon: '🏪' },
            { path: selectedRestaurantId ? `/menu/${selectedRestaurantId}` : '/menu', label: 'Menu', icon: '🍽️' },
            { path: '/cart', label: 'Cart', icon: '🛒', badge: pendingOrders },
            { path: '/orders', label: 'Orders', icon: '📋' },
            { path: isAuthenticated ? '#' : '/auth', label: isAuthenticated ? 'Account' : 'Login', icon: isAuthenticated ? '👤' : '🔐' },
          ].map(item => (
            item.path === '#' ? (
              <button
                key="account"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all relative ${
                  showUserMenu ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--text-muted))]'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all relative ${
                  isActive(item.path) 
                    ? 'text-[rgb(var(--primary))]' 
                    : 'text-[rgb(var(--text-muted))]'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge ? (
                  <span className="absolute top-0 right-2 h-5 w-5 rounded-full bg-[rgb(var(--primary))] text-white text-xs flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          ))}
        </div>
      </nav>

      {/* Offline Banner */}
      {!online && (
        <div className="fixed top-14 sm:top-16 md:top-20 left-0 right-0 z-40 bg-amber-500 text-black px-4 py-2 text-center text-sm font-semibold shadow-md">
          <span className="inline-flex items-center gap-2">
            ⚠️ You're offline. Orders will sync when connected.
          </span>
        </div>
      )}

      {/* Main Content - Add padding for fixed header */}
      <main className={`flex-1 pb-20 md:pb-0 ${!hasHeroSection ? 'pt-14 sm:pt-16 md:pt-20' : ''} ${!online && !hasHeroSection ? 'pt-24 sm:pt-26 md:pt-30' : ''}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[rgb(var(--bg-dark))] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center">
                  <span className="text-white font-bold">DM</span>
                </div>
                <span className="font-bold text-lg">DigiMenu</span>
              </div>
              <p className="text-gray-400 text-sm">The smart way to order. Fast, easy, delicious.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/" className="block hover:text-white transition-colors">Menu</Link>
                <Link to="/orders" className="block hover:text-white transition-colors">My Orders</Link>
                <Link to="/about" className="block hover:text-white transition-colors">About Us</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📍 15 Avenue Habib Bourguiba, Tunis</p>
                <p>📞 (+216) 71 123 456</p>
                <p>✉️ contact@digimenu.tn</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            © 2026 DigiMenu. All rights reserved.
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  )
}
