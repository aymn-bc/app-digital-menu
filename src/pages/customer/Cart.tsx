import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppStore, selectOnline } from '@/store/useStore'
import { Card, Button, Badge, toast } from '@/components/ui'
import { useTranslation } from 'react-i18next'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  notes?: string
  dietary?: string[]
}

// Mock cart items for demo - in real app this would come from zustand store
const mockCartItems: CartItem[] = [
  { 
    id: '1', 
    name: 'Original Recipe Chicken (4pc)', 
    price: 12.99, 
    quantity: 2, 
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200',
  },
  { 
    id: '2', 
    name: 'Zinger Burger', 
    price: 8.99, 
    quantity: 1, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
    dietary: ['Spicy']
  },
  { 
    id: '3', 
    name: 'Large Fries', 
    price: 4.49, 
    quantity: 2, 
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200',
    notes: 'Extra crispy' 
  },
  { 
    id: '4', 
    name: 'Pepsi (Large)', 
    price: 2.99, 
    quantity: 2, 
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200',
  },
]

export default function Cart() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const online = useAppStore(selectOnline)
  const [items, setItems] = useState<CartItem[]>(mockCartItems)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount
  const tax = (subtotal - discount) * 0.1 // 10% tax
  const total = subtotal - discount + tax

  const updateQuantity = (id: string, delta: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
    toast('Item removed', 'info')
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
      toast('Promo code applied! 10% off', 'success')
    } else {
      toast('Invalid promo code', 'error')
    }
  }

  const handleCheckout = async () => {
    if (orderType === 'dine-in' && !tableNumber) {
      toast('Please enter your table number', 'warning')
      return
    }

    setIsCheckingOut(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast('Order placed successfully! 🎉', 'success')
    setIsCheckingOut(false)
    navigate('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="container-app py-12">
        <div className="empty-state">
          <div className="empty-state-icon">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-[rgb(var(--text))] mb-2">Your cart is empty</h2>
          <p className="text-[rgb(var(--text-muted))] mb-8 max-w-md">
            Looks like you haven't added anything yet. Explore our delicious menu and find something you'll love!
          </p>
          <Link to="/">
            <Button size="lg" className="px-8">
              <span className="mr-2">🍽️</span>
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[rgb(var(--text))]">{t('cart.title', 'Your Cart')}</h1>
          <p className="text-[rgb(var(--text-muted))]">{items.length} items</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-amber-500'}`} />
          <span className="text-sm text-[rgb(var(--text-muted))]">
            {online ? 'Online - Order will be sent immediately' : 'Offline - Order will sync when online'}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Order Type Selection */}
          <Card className="p-4 mb-6">
            <h3 className="font-semibold text-[rgb(var(--text))] mb-4">Order Type</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOrderType('dine-in')}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  orderType === 'dine-in'
                    ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))/0.05]'
                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--border-strong))]'
                }`}
              >
                <span className="text-2xl">🍽️</span>
                <div className="text-left">
                  <div className={`font-semibold ${orderType === 'dine-in' ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--text))]'}`}>
                    Dine In
                  </div>
                  <div className="text-xs text-[rgb(var(--text-muted))]">Eat at the restaurant</div>
                </div>
              </button>
              <button
                onClick={() => setOrderType('takeaway')}
                className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  orderType === 'takeaway'
                    ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))/0.05]'
                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--border-strong))]'
                }`}
              >
                <span className="text-2xl">🥡</span>
                <div className="text-left">
                  <div className={`font-semibold ${orderType === 'takeaway' ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--text))]'}`}>
                    Takeaway
                  </div>
                  <div className="text-xs text-[rgb(var(--text-muted))]">Pick up your order</div>
                </div>
              </button>
            </div>
          </Card>

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item, idx) => (
              <Card 
                key={item.id} 
                className="p-4 hover:shadow-lg transition-all stagger-item overflow-hidden"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 img-zoom-container">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[rgb(var(--text))] line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-[rgb(var(--primary))]">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.dietary && item.dietary.map(d => (
                            <Badge key={d} variant="warning">{d}</Badge>
                          ))}
                        </div>
                        {item.notes && (
                          <p className="text-xs text-[rgb(var(--text-muted))] mt-1 flex items-center gap-1">
                            <span>📝</span> {item.notes}
                          </p>
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[rgb(var(--text-muted))] hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="qty-selector">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <span className="font-bold text-[rgb(var(--text))]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Add More Items */}
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-[rgb(var(--border))] rounded-xl text-[rgb(var(--text-muted))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add more items
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-6">Order Summary</h2>
            
            {/* Table Number - Only for Dine In */}
            {orderType === 'dine-in' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">
                  Table Number *
                </label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  placeholder="Enter your table number"
                  className="input-premium"
                />
              </div>
            )}

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  disabled={promoApplied}
                  className="input-premium flex-1"
                />
                <Button 
                  variant={promoApplied ? 'success' : 'secondary'}
                  onClick={applyPromo}
                  disabled={!promoCode || promoApplied}
                >
                  {promoApplied ? '✓' : 'Apply'}
                </Button>
              </div>
              {promoApplied && (
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <span>🎉</span> SAVE10 applied - 10% off!
                </p>
              )}
              <p className="text-xs text-[rgb(var(--text-muted))] mt-2">
                Try "SAVE10" for 10% off
              </p>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3 py-4 border-t border-[rgb(var(--border))]">
              <div className="flex justify-between text-[rgb(var(--text-muted))]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[rgb(var(--text-muted))]">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[rgb(var(--text))] pt-3 border-t border-[rgb(var(--border))]">
                <span>Total</span>
                <span className="text-[rgb(var(--primary))]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              onClick={handleCheckout}
              className="w-full mt-6 h-14 text-lg font-bold"
              loading={isCheckingOut}
            >
              {isCheckingOut ? 'Placing Order...' : `Place Order • $${total.toFixed(2)}`}
            </Button>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[rgb(var(--text-muted))]">
              <div className="flex items-center gap-1">
                <span>🔒</span> Secure
              </div>
              <div className="flex items-center gap-1">
                <span>⚡</span> Fast
              </div>
              <div className="flex items-center gap-1">
                <span>✅</span> Reliable
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
