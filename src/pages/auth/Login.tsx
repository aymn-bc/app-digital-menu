import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Card, CardContent, Input, Button, toast } from '@/components/ui'
import { useAuthStore } from '@/store/useStore'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [backendError, setBackendError] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)

  // Get the intended destination or default based on role
  const from = location.state?.from?.pathname

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: { email?: string; password?: string } = {}

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      toast('Please fix the errors below', 'error')
      return
    }
    
    // Clear previous backend errors
    setBackendError('')
    
    setLoading(true)
    try {
      const result = await login(email, password)
      if (result.success) {
        toast('Login successful!', 'success')
        
        // Get user from state after login
        const { user } = useAuthStore.getState()
        
        if (from) {
          navigate(from, { replace: true })
        } else if (user?.role === 'admin') {
          navigate('/admin', { replace: true })
        } else if (user?.role === 'restaurant') {
          navigate('/restaurant', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      } else {
        const errorMsg = result.error || 'Invalid credentials'
        console.error('Login failed:', errorMsg)
        setBackendError(errorMsg)
        toast(errorMsg, 'error')
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || 'Login failed. Please try again.'
      console.error('Login error:', error)
      setBackendError(errorMsg)
      toast(errorMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--primary-dark))] flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            🍽️
          </div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Welcome back</h1>
          <p className="text-[rgb(var(--text-muted))] mt-1">Sign in to manage your restaurant or access admin</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  // Clear error when user starts typing
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                error={errors.email}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  // Clear error when user starts typing
                  if (errors.password) setErrors({ ...errors, password: undefined })
                }}
                error={errors.password}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              {backendError && (
                <div className="p-3 rounded-lg bg-[rgb(var(--error))]/10 border border-[rgb(var(--error))]/30">
                  <p className="text-sm text-[rgb(var(--error))] font-medium">
                    <span className="inline-block mr-2">⚠️</span>
                    {backendError}
                  </p>
                </div>
              )}

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign in
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[rgb(var(--text-muted))]">
                Don't have an account?{' '}
                <Link to="/register" className="text-[rgb(var(--primary))] hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
              <Link to="/" className="text-sm text-[rgb(var(--primary))] hover:underline block mt-2">
                ← Back to restaurants
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
