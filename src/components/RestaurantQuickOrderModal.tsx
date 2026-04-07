import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, toast, Button as UIButton } from '@/components/ui'
import { getMenu } from '@/api/admin'
import type { Restaurant } from '@/api/admin'
import { generateMenuItems } from '@/utils/seedData'
import { useCartStore, useAuthStore } from '@/store/useStore'

interface MenuItem {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  restaurantId?: string
}

interface QuickOrderModalProps {
  restaurant: Restaurant | null
  isOpen: boolean
  onClose: () => void
}

export default function RestaurantQuickOrderModal({
  restaurant,
  isOpen,
  onClose,
}: QuickOrderModalProps) {
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [meals, setMeals] = useState<MenuItem[]>([])
  const [selectedMeal, setSelectedMeal] = useState<MenuItem | null>(null)
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const DEFAULT_MEAL_IMAGE = 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=600&fit=crop'

  useEffect(() => {
    if (!restaurant || !isOpen) return

    const loadMeals = async () => {
      setLoading(true)
      try {
        const menuData = await getMenu(restaurant.id)
        if (menuData?.items && menuData.items.length > 0) {
          // Get top 5 most popular meals
          const topMeals = menuData.items
            .slice(0, 5)
            .map((item: MenuItem) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image || DEFAULT_MEAL_IMAGE,
              description: item.description,
              restaurantId: restaurant.id,
            }))
          const uniqueMeals = Array.from(new Map(topMeals.map((item) => [item.id, item])).values())
          setMeals(uniqueMeals)
          if (uniqueMeals.length > 0) {
            setSelectedMeal(uniqueMeals[0])
          }
        } else {
          throw new Error('No menu data')
        }
      } catch (error) {
        console.warn('Loading generated meals:', error)
        const generated = generateMenuItems(restaurant.id)
          .slice(0, 5)
          .map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image || DEFAULT_MEAL_IMAGE,
            description: item.description,
            restaurantId: restaurant.id,
          }))

        const uniqueGenerated = Array.from(new Map(generated.map((item) => [item.id, item])).values())
        setMeals(uniqueGenerated)

        if (uniqueGenerated.length > 0) {
          setSelectedMeal(uniqueGenerated[0])
        }
      } finally {
        setLoading(false)
      }
    }

    loadMeals()
  }, [restaurant, isOpen])

  const getSizeMultiplier = () => {
    const multipliers = { small: 0.8, medium: 1, large: 1.3 }
    return multipliers[selectedSize]
  }

  const finalPrice = selectedMeal
    ? selectedMeal.price * getSizeMultiplier() * quantity
    : 0

  const handleOrder = () => {
    if (!selectedMeal || !restaurant) return

    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    // Calculate price with size multiplier
    const sizeMultiplier = { small: 0.8, medium: 1, large: 1.3 }[selectedSize]
    const finalPrice = selectedMeal.price * sizeMultiplier

    // Add to cart store
    addItem({
      id: selectedMeal.id,
      name: selectedMeal.name,
      price: finalPrice,
      image: selectedMeal.image || '',
      restaurantId: restaurant.id,
      size: selectedSize,
      quantity: quantity,
      notes: `Size: ${selectedSize}`,
    })

    toast(`Added ${quantity}x ${selectedMeal.name} (${selectedSize}) to cart!`, 'success')
    onClose()

    // Navigate to menu with the restaurant
    setTimeout(() => {
      navigate(`/menu/${restaurant.id}`)
    }, 300)
  }

  if (!restaurant) return null

  // Login prompt modal
  if (showLoginPrompt) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 text-center">
            <div className="text-4xl mb-2">🔐</div>
            <h2 className="text-2xl font-bold">Login Required</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700 text-center mb-6">
              You need to login or create an account to place an order.
            </p>
            <div className="space-y-3">
              <UIButton
                onClick={() => {
                  onClose()
                  setShowLoginPrompt(false)
                  navigate('/auth/login')
                }}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                Sign In
              </UIButton>
              <UIButton
                onClick={() => {
                  onClose()
                  setShowLoginPrompt(false)
                  navigate('/register')
                }}
                variant="outline"
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                Create Account
              </UIButton>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-orange-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3">
          <h2 className="text-xl font-bold text-center">
            🍽️ Quick Order - {restaurant.name}
          </h2>
          <p className="text-center mt-1 text-orange-100 text-sm">
            Sélectionnez un plat, une taille et ajoutez au panier.
          </p>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Chargement des plats...</p>
            </div>
          ) : meals.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500 text-sm">Aucun plat disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-200 border ${
                    selectedMeal?.id === meal.id
                      ? 'border-orange-400 shadow-md'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <img
                    src={meal.image || DEFAULT_MEAL_IMAGE}
                    alt={meal.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-1">
                    <p className="text-white text-xs font-semibold text-center line-clamp-1">
                      {meal.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {selectedMeal && (
            <>
              {/* Selected Meal Details */}
              <div className="rounded-xl p-3 mb-4 border border-gray-200">
                <div className="flex gap-2">
                  <img
                    src={selectedMeal.image || DEFAULT_MEAL_IMAGE}
                    alt={selectedMeal.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{selectedMeal.name}</h3>
                    <p className="text-gray-600 text-xs mb-1 line-clamp-2">{selectedMeal.description}</p>
                    <p className="text-sm font-semibold text-orange-600">Base: {selectedMeal.price.toFixed(2)} TND</p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 mb-1">📏 Taille</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { size: 'small' as const, label: 'Small', icon: '🥡', mult: 0.8 },
                    { size: 'medium' as const, label: 'Medium', icon: '🍽️', mult: 1 },
                    { size: 'large' as const, label: 'Large', icon: '🛍️', mult: 1.3 },
                  ].map((s) => (
                    <button
                      key={s.size}
                      onClick={() => setSelectedSize(s.size)}
                      className={`text-xs p-2 rounded-lg border transition ${
                        selectedSize === s.size
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div>{s.icon}</div>
                      <div className="font-semibold">{s.label}</div>
                      <div className="text-[11px]">{(selectedMeal.price * s.mult).toFixed(2)} TND</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="block text-sm font-semibold text-gray-800 mb-1">🔢 Quantité</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-orange-50"
                  >
                    −
                  </button>
                  <span className="text-base font-bold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-orange-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-lg p-2 mb-4 bg-orange-50 border border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Total</span>
                  <span className="text-lg font-bold text-orange-600">{finalPrice.toFixed(2)} TND</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={onClose}
                  className="w-full py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-100"
                >
                  Fermer
                </button>
                <button
                  onClick={handleOrder}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold"
                >
                  ➕ Ajouter au panier
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
