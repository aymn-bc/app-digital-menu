import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import CustomerLayout from '@/layouts/CustomerLayout'
import RestaurantLayout from '@/layouts/RestaurantLayout'
import AdminLayout from '@/layouts/AdminLayout'

// Customer Pages
import RestaurantList from '@/pages/customer/RestaurantList'
import CustomerMenu from '@/pages/customer/Menu'
import CustomerCart from '@/pages/customer/Cart'
import CustomerOrders from '@/pages/customer/Orders'

// Restaurant Pages
import RestaurantDashboard from '@/pages/restaurant/Dashboard'
import RestaurantOrders from '@/pages/restaurant/Orders'
import RestaurantKitchen from '@/pages/restaurant/Kitchen'
import RestaurantTables from '@/pages/restaurant/Tables'
import MenuManager from '@/pages/restaurant/MenuManager'
import Subscription from '@/pages/restaurant/Subscription'
import Branding from '@/pages/restaurant/Branding'

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard'
import ThemeEditor from '@/pages/admin/ThemeEditor'
import Users from '@/pages/admin/Users'

// Auth & Protection
import AuthPage from '@/pages/auth/Login'
import ProtectedRoute from '@/components/ProtectedRoute'

import './App.css'

// Placeholder component for pages not yet implemented
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
      <div className="w-20 h-20 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center mb-4">
        <span className="text-4xl">🚧</span>
      </div>
      <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-2">{title}</h2>
      <p className="text-[rgb(var(--text-muted))]">This feature is coming soon!</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Customer Routes - with Outlet in CustomerLayout */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/cart" element={<CustomerCart />} />
        <Route path="/orders" element={<CustomerOrders />} />
      </Route>
      
      {/* Restaurant Routes - Protected, only for restaurant users */}
      <Route element={
        <ProtectedRoute allowedRoles={['restaurant', 'admin']}>
          <RestaurantLayout />
        </ProtectedRoute>
      }>
        <Route path="/restaurant" element={<RestaurantDashboard />} />
        <Route path="/restaurant/orders" element={<RestaurantOrders />} />
        <Route path="/restaurant/kitchen" element={<RestaurantKitchen />} />
        <Route path="/restaurant/tables" element={<RestaurantTables />} />
        <Route path="/restaurant/menu" element={<MenuManager />} />
        <Route path="/restaurant/subscription" element={<Subscription />} />
        <Route path="/restaurant/branding" element={<Branding />} />
        <Route path="/restaurant/inventory" element={<ComingSoon title="Inventory Management" />} />
      </Route>
      
      {/* Admin Routes - Protected, only for admin users */}
      <Route element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/restaurants" element={<ComingSoon title="Restaurant List" />} />
        <Route path="/admin/themes" element={<ThemeEditor />} />
        <Route path="/admin/themes/:restaurantId" element={<ThemeEditor />} />
        <Route path="/admin/heroes" element={<ComingSoon title="Hero Section Editor" />} />
        <Route path="/admin/menus" element={<ComingSoon title="Menu Layout Settings" />} />
        <Route path="/admin/preview" element={<ComingSoon title="Live Preview" />} />
        <Route path="/admin/activity" element={<ComingSoon title="Activity Log" />} />
      </Route>
      
      {/* Auth */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
