import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, Input, Badge, Button } from '@/components/ui'
import { getRestaurants } from '@/api/admin'
import type { Restaurant } from '@/api/admin'
import { generateRestaurants } from '@/utils/seedData'
import RestaurantQuickOrderModal from '@/components/RestaurantQuickOrderModal'

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [query, setQuery] = useState('')
  const [cuisineFilter, setCuisineFilter] = useState<string>('all')
  const [selectedRestaurantForOrder, setSelectedRestaurantForOrder] = useState<Restaurant | null>(null)
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants()
        if (data && data.length > 0) {
          setRestaurants(data)
        } else {
          setRestaurants(generateRestaurants())
        }
      } catch (error) {
        console.error('Failed to fetch restaurants:', error)
        setRestaurants(generateRestaurants())
      } finally {
        setIsLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  // Get all unique cuisines
  const allCuisines = useMemo(() => {
    const cuisines = new Set<string>()
    if (restaurants && restaurants.length > 0) {
      restaurants.forEach(r => {
        if (r.cuisine && r.cuisine.length > 0) {
          r.cuisine.forEach(c => cuisines.add(c))
        }
      })
    }
    return Array.from(cuisines).sort()
  }, [restaurants])

  const filteredRestaurants = useMemo(() => {
    if (!restaurants || restaurants.length === 0) return []
    return restaurants.filter((restaurant) => {
      const matchesQuery = restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.description?.toLowerCase().includes(query.toLowerCase()) || false
      const matchesCuisine = cuisineFilter === 'all' || (restaurant.cuisine && restaurant.cuisine.includes(cuisineFilter))
      return matchesQuery && matchesCuisine
    })
  }, [query, cuisineFilter, restaurants])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[rgb(var(--primary))] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[rgb(var(--text-muted))]">Loading restaurants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[rgb(var(--primary))] via-[rgb(var(--primary-dark))] to-[rgb(var(--accent))] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[rgb(var(--secondary))]/20 rounded-full blur-3xl" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <span className="text-xl">🍽️</span>
              <span className="text-sm font-medium">Discover Local Restaurants</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Delicious Food,
              <br />
              <span className="text-[rgb(var(--secondary))]">Delivered Fast</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Choose from the best restaurants in your area. Fresh ingredients, amazing taste, 
              and delivered right to your doorstep.
            </p>
            
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search restaurants or cuisines..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white text-[rgb(var(--text))] border-0 shadow-2xl"
                />
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[rgb(var(--text-muted))]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">{restaurants.length}+</div>
                <div className="text-white/70 text-sm">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">50+</div>
                <div className="text-white/70 text-sm">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">4.8</div>
                <div className="text-white/70 text-sm">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold">15min</div>
                <div className="text-white/70 text-sm">Avg Delivery</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="rgb(var(--bg))"
            />
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-4">Filter by Cuisine</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCuisineFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                cuisineFilter === 'all'
                  ? 'bg-[rgb(var(--primary))] text-white'
                  : 'bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--border))]'
              }`}
            >
              All
            </button>
            {allCuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setCuisineFilter(cuisine)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cuisineFilter === cuisine
                    ? 'bg-[rgb(var(--primary))] text-white'
                    : 'bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--border))]'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.id} 
              restaurant={restaurant} 
              onOrderClick={() => {
                setSelectedRestaurantForOrder(restaurant)
                setIsQuickOrderOpen(true)
              }}
            />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-[rgb(var(--text))] mb-2">No restaurants found</h3>
            <p className="text-[rgb(var(--text-muted))]">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        <RestaurantQuickOrderModal
          restaurant={selectedRestaurantForOrder}
          isOpen={isQuickOrderOpen}
          onClose={() => {
            setIsQuickOrderOpen(false)
            setSelectedRestaurantForOrder(null)
          }}
        />
      </section>
    </div>
  )
}

function RestaurantCard({ restaurant, onOrderClick }: { restaurant: Restaurant; onOrderClick: () => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-lg"
          />
          <div>
            <h3 className="font-bold text-white text-lg">{restaurant.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="text-white text-sm">{restaurant.rating}</span>
              <span className="text-white/70 text-sm">({restaurant.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <Badge variant={restaurant.isOpen ? 'success' : 'error'}>
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.cuisine?.slice(0, 3).map((c) => (
            <span 
              key={c} 
              className="px-2 py-1 text-xs rounded-md bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text-muted))]"
            >
              {c}
            </span>
          ))}
        </div>

        <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-2 mb-4">
          {restaurant.description}
        </p>

        <div className="flex items-center justify-between text-sm text-[rgb(var(--text-muted))] mb-4">
          <div className="flex items-center gap-1">
            <span>🕐</span>
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚚</span>
            <span>{restaurant.deliveryFee?.toFixed(2)} TND</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💵</span>
            <span>Min {restaurant.minimumOrder?.toFixed(2)} TND</span>
          </div>
        </div>

        <Button
          fullWidth
          variant="primary"
          onClick={onOrderClick}
        >
          Order from {restaurant.name}
        </Button>
      </CardContent>
    </Card>
  )
}