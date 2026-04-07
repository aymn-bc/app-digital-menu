import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, Input, Button, toast } from '@/components/ui'
import { useAuthStore } from '@/store/useStore'
import { register } from '@/api/admin'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    role: 'customer' as 'customer' | 'restaurant'
  })
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.address || !formData.phone) {
      toast('Please fill in all fields', 'error')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast('Passwords do not match', 'error')
      return
    }
    
    if (formData.password.length < 6) {
      toast('Password must be at least 6 characters', 'error')
      return
    }
    
    setLoading(true)
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
        role: formData.role
      })
      
      // Auto login after registration
      const result = await login(formData.email, formData.password)
      if (result.success) {
        toast('Account created successfully!', 'success')
        navigate('/')
      } else {
        toast('Account created! Please log in.', 'success')
        navigate('/auth')
      }
    } catch (error: any) {
      console.error('Registration failed:', error)
      toast(error?.response?.data?.message || 'Failed to create account. Please try again.', 'error')
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
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Create Account</h1>
          <p className="text-[rgb(var(--text-muted))] mt-1">Join DigiMenu and start ordering</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />

              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  icon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                />
              </div>

              <Input
                label="Address"
                type="text"
                placeholder="Your street address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+216 12345678"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-[rgb(var(--text))]">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'customer' }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === 'customer'
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                        : 'border-[rgb(var(--border))] text-[rgb(var(--text-muted))] hover:border-[rgb(var(--primary))]'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-1 block">👤</span>
                      <span className="text-sm font-medium">Customer</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'restaurant' }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === 'restaurant'
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]'
                        : 'border-[rgb(var(--border))] text-[rgb(var(--text-muted))] hover:border-[rgb(var(--primary))]'
                    }`}
                  >
                    <div className="text-center">
                      <span className="text-2xl mb-1 block">🏪</span>
                      <span className="text-sm font-medium">Restaurant</span>
                    </div>
                  </button>
                </div>
              </div>

              <Button type="submit" loading={loading} className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[rgb(var(--text-muted))]">
                Already have an account?{' '}
                <Link to="/auth" className="text-[rgb(var(--primary))] hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}