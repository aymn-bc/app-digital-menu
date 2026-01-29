import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore, selectIsAuthenticated, selectUserRole } from '@/store/useStore'
import type { UserRole } from '@/store/useStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated)
  const userRole = useAuthStore(selectUserRole)
  const location = useLocation()

  // Not logged in - redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Check role permissions if specified
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />
    } else if (userRole === 'restaurant') {
      return <Navigate to="/restaurant" replace />
    } else {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}
