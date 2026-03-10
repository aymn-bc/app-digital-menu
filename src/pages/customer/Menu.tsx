import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/api/axios'
import { cacheMenu, getCachedMenu, enqueueOrder } from '@/db'
import { useAppStore, selectOnline, selectSetPending, selectSelectedRestaurant } from '@/store/useStore'
import { Card, CardContent, Input, Button, Badge, SkeletonMenu, toast } from '@/components/ui'
import Hero from '@/components/Hero'
import ProductDetailModal from '@/components/ProductDetailModal'
import { getRestaurants, getCategories, getMenuItems } from '@/api/admin'
import type { Restaurant, Category } from '@/api/admin'

type Item = {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  allergens?: string[]
  dietary?: string[]
  image?: string
  categoryId?: string
  isPopular?: boolean
  isNew?: boolean
  isSpicy?: boolean
  prepTime?: string
  calories?: number
  nutrition?: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
  restaurantId?: string
}

export default function CustomerMenu() {
  const navigate = useNavigate()
  const selectedRestaurantId = useAppStore(selectSelectedRestaurant)
  
  const [categories, setCategories] = useState<Category[]>([])
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null)

  // Get the selected restaurant or redirect
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await getRestaurants()
        const restaurant = data.find(r => r.id === selectedRestaurantId)
        setCurrentRestaurant(restaurant || null)
      } catch (error) {
        console.error('Failed to fetch restaurants:', error)
      }
    }
    if (selectedRestaurantId) {
      fetchRestaurant()
    }
  }, [selectedRestaurantId])

  // Redirect to restaurant selection if no restaurant selected
  useEffect(() => {
    if (!selectedRestaurantId || !currentRestaurant) {
      navigate('/')
    }
  }, [selectedRestaurantId, currentRestaurant, navigate])

  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const online = useAppStore(selectOnline)
  const setPendingOrders = useAppStore(selectSetPending)

  useEffect(() => {
    if (!currentRestaurant) return
    
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const [menuData, categoriesData] = await Promise.all([
          getMenuItems(selectedRestaurantId || undefined),
          getCategories(selectedRestaurantId || undefined)
        ])
        if (!mounted) return
        setItems(menuData as Item[])
        setCategories(categoriesData)
        await cacheMenu(menuData)
      } catch {
        // Use cached data as fallback
        const cached = await getCachedMenu()
        if (cached?.length) {
          setItems(cached as Item[])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [online, currentRestaurant, selectedRestaurantId])

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchesQuery = it.name.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || it.categoryId === category
      return matchesQuery && matchesCategory
    })
  }, [items, query, category])

  const popularItems = useMemo(() => {
    return items.filter(it => it.isPopular).slice(0, 4)
  }, [items])

  async function addToCart(item: Item, quantity: number = 1, notes?: string) {
    const order = { id: `${Date.now()}-${item.id}`, items: [{ itemId: item.id, qty: quantity, notes }], total: item.price * quantity, createdAt: Date.now() }
    if (online) {
      try {
        await api.post('/orders', order)
        toast(`Added ${quantity}x ${item.name} to cart!`, 'success')
      } catch {
        await enqueueOrder(order)
        setPendingOrders((n: number) => n + 1)
        toast('Added to cart - will sync when online', 'warning')
      }
    } else {
      await enqueueOrder(order)
      setPendingOrders((n: number) => n + 1)
      toast('Added to cart (offline)', 'info')
    }
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  const openProductDetail = (item: Item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  // Categories with 'All' option
  const categoriesWithAll = [
    { id: 'all', name: 'All Items', icon: '🍽️', itemCount: items.length },
    ...categories
  ]

  // Show loading or redirect if no restaurant
  if (!currentRestaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--primary))]"></div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Hero Section */}
      <Hero 
        hero={currentRestaurant.heroSection}
        restaurantName={currentRestaurant.name}
        onSearch={handleSearch}
      />

      {/* Main Content */}
      <div className="container-app py-8">
        {/* Popular Items Section */}
        {popularItems.length > 0 && !query && category === 'all' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[rgb(var(--text))]">🔥 Popular Right Now</h2>
                <p className="text-[rgb(var(--text-muted))]">Our most loved dishes</p>
              </div>
              <Button variant="ghost" size="sm">
                View All →
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularItems.map((item, idx) => (
                <div 
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden bg-[rgb(var(--bg-card))] shadow-md hover:shadow-xl transition-all duration-300 stagger-item cursor-pointer product-card"
                  style={{ animationDelay: `${idx * 50}ms` }}
                  onClick={() => openProductDetail(item)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400'} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-white/80 text-xs">{item.prepTime}</p>
                    </div>
                    <span className="absolute top-2 right-2 price-tag text-xs">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Navigation */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-4">Browse by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categoriesWithAll.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`
                  flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[100px] transition-all duration-300
                  ${category === cat.id 
                    ? 'bg-[rgb(var(--primary))] text-white shadow-lg scale-105' 
                    : 'bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-elevated))] border border-[rgb(var(--border))]'}
                `}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                <span className={`text-xs ${category === cat.id ? 'text-white/70' : 'text-[rgb(var(--text-muted))]'}`}>
                  {cat.itemCount} items
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Input
              placeholder="Search for dishes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 py-3 rounded-full"
              icon={
                <svg className="w-5 h-5 text-[rgb(var(--text-muted))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Menu Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[rgb(var(--text))]">
              {category === 'all' ? 'All Menu Items' : categoriesWithAll.find(c => c.id === category)?.name}
            </h2>
            <span className="text-sm text-[rgb(var(--text-muted))]">{filtered.length} items</span>
          </div>

          {loading ? (
            <SkeletonMenu />
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center mb-4">
                <span className="text-5xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">No dishes found</h3>
              <p className="text-[rgb(var(--text-muted))] mb-4">Try adjusting your search or browse categories</p>
              <Button variant="outline" onClick={() => { setQuery(''); setCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, idx) => (
                <Card 
                  key={item.id} 
                  hover 
                  className="overflow-hidden stagger-item group product-card cursor-pointer" 
                  style={{ animationDelay: `${idx * 30}ms` }}
                  onClick={() => openProductDetail(item)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600'} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {item.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">NEW</span>
                      )}
                      {item.isPopular && (
                        <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">🔥 HOT</span>
                      )}
                      {item.isSpicy && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">🌶️ SPICY</span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                      className="absolute bottom-3 right-3 w-10 h-10 bg-[rgb(var(--primary))] text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[rgb(var(--text))] text-lg line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-[rgb(var(--text-muted))] mt-1 line-clamp-2">
                          {item.description || 'Delicious dish prepared fresh with premium ingredients'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Prep time and dietary */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-[rgb(var(--text-muted))]">
                      {item.prepTime && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.prepTime}
                        </span>
                      )}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex gap-1">
                          {item.dietary.map(d => (
                            <Badge key={d} variant="info">{d}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Allergens */}
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-xs text-[rgb(var(--text-muted))] mb-3 flex items-center gap-1">
                        <span>⚠️</span> {item.allergens.join(', ')}
                      </p>
                    )}

                    {/* Price and Add Button */}
                    <div className="flex items-center justify-between pt-3 border-t border-[rgb(var(--border))]">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[rgb(var(--primary))]">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-[rgb(var(--text-muted))] line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Button size="sm" onClick={() => addToCart(item)}>
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-sm text-[rgb(var(--text-muted))] mt-8 py-4">
            Showing {filtered.length} of {items.length} menu items
          </p>
        )}
      </div>
    </div>
  )
}
