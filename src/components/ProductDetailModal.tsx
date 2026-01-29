import { useState } from 'react'
import Modal from './ui/Modal'
import Button from './ui/Button'
import { Badge } from './ui'

interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  image?: string
  allergens?: string[]
  dietary?: string[]
  isPopular?: boolean
  isNew?: boolean
  isSpicy?: boolean
  prepTime?: string
  calories?: number
  ingredients?: string[]
  nutrition?: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
}

interface ProductDetailModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void
}

export default function ProductDetailModal({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart 
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition'>('details')

  if (!item) return null

  const handleAddToCart = () => {
    onAddToCart(item, quantity, notes)
    setQuantity(1)
    setNotes('')
    onClose()
  }

  const discount = item.originalPrice 
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : 0

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="flex flex-col md:flex-row max-h-[90vh]">
        {/* Image Section */}
        <div className="relative md:w-1/2 h-64 md:h-auto">
          <img 
            src={item.image || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800'} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                ✨ NEW
              </span>
            )}
            {item.isPopular && (
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                🔥 POPULAR
              </span>
            )}
            {item.isSpicy && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                🌶️ SPICY
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-[rgb(var(--primary))] text-white text-xs font-bold rounded-full shadow-lg">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Price Tag - Mobile */}
          <div className="md:hidden absolute bottom-4 left-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">${item.price.toFixed(2)}</span>
              {item.originalPrice && (
                <span className="text-lg text-white/60 line-through">${item.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col md:w-1/2 overflow-y-auto">
          <div className="p-6 flex-1">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[rgb(var(--text))] mb-2">
                {item.name}
              </h2>
              <p className="text-[rgb(var(--text-muted))] text-sm leading-relaxed">
                {item.description || 'A delicious dish prepared fresh with premium ingredients, crafted with care by our expert chefs.'}
              </p>
            </div>

            {/* Price - Desktop */}
            <div className="hidden md:flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[rgb(var(--primary))]">${item.price.toFixed(2)}</span>
              {item.originalPrice && (
                <span className="text-lg text-[rgb(var(--text-muted))] line-through">${item.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              {item.prepTime && (
                <div className="flex items-center gap-2 text-[rgb(var(--text-muted))]">
                  <span className="w-8 h-8 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center">
                    ⏱️
                  </span>
                  <span>{item.prepTime}</span>
                </div>
              )}
              {item.calories && (
                <div className="flex items-center gap-2 text-[rgb(var(--text-muted))]">
                  <span className="w-8 h-8 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center">
                    🔥
                  </span>
                  <span>{item.calories} cal</span>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 bg-[rgb(var(--bg-elevated))] rounded-lg">
              <button
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                  activeTab === 'details'
                    ? 'bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] shadow-sm'
                    : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                  activeTab === 'nutrition'
                    ? 'bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] shadow-sm'
                    : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]'
                }`}
              >
                Nutrition
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[120px]">
              {activeTab === 'details' ? (
                <div className="space-y-4 animate-fade-in">
                  {/* Dietary Info */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-2">Dietary</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.dietary.map(d => (
                          <Badge key={d} variant="success">{d}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-2">Allergens</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.allergens.map(a => (
                          <span key={a} className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                            ⚠️ {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ingredients */}
                  {item.ingredients && item.ingredients.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-2">Ingredients</h4>
                      <p className="text-sm text-[rgb(var(--text-muted))]">
                        {item.ingredients.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-fade-in">
                  {item.nutrition ? (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Calories', value: `${item.nutrition.calories} kcal`, icon: '🔥' },
                        { label: 'Protein', value: item.nutrition.protein, icon: '💪' },
                        { label: 'Carbs', value: item.nutrition.carbs, icon: '🌾' },
                        { label: 'Fat', value: item.nutrition.fat, icon: '🥑' },
                      ].map(n => (
                        <div key={n.label} className="p-3 bg-[rgb(var(--bg-elevated))] rounded-xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span>{n.icon}</span>
                            <span className="text-xs text-[rgb(var(--text-muted))]">{n.label}</span>
                          </div>
                          <span className="font-bold text-[rgb(var(--text))]">{n.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-[rgb(var(--text-muted))] text-center py-6">
                      Nutrition information not available
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Special Instructions */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., No onions, extra sauce..."
                className="w-full p-3 rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm resize-none focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))/0.2] outline-none transition-all"
                rows={2}
              />
            </div>
          </div>

          {/* Footer - Add to Cart */}
          <div className="p-6 pt-0">
            <div className="flex items-center gap-4 pt-4 border-t border-[rgb(var(--border))]">
              {/* Quantity Selector */}
              <div className="qty-selector">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-12 text-base font-bold"
              >
                Add to Cart • ${(item.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
