// SEED DATA USAGE EXAMPLES

// ============================================================
// 1. GETTING USERS (For Authentication)
// ============================================================

import { generateUsers, SEED_USERS } from '@/store/useStore'

// Get all users
const allUsers = generateUsers()
console.log(allUsers)
// Output:
// [
//   { id: 'user-admin-001', email: 'admin@restaurant.com', name: 'Admin Manager', role: 'admin', ... },
//   { id: 'user-rest-001', email: 'manager@crispy.com', name: 'Crispy Chicken Manager', role: 'restaurant', restaurantId: 'rest-001', ... },
//   ...
// ]

// Get user by email
const seedUser = SEED_USERS['admin@restaurant.com']
console.log(seedUser.password) // 'admin123456'
console.log(seedUser.user.name) // 'Admin Manager'

// ============================================================
// 2. GETTING RESTAURANTS
// ============================================================

import { generateRestaurants } from '@/utils/seedData'

// Generate all restaurants
const restaurants = generateRestaurants()
console.log(restaurants.length) // 3

// Access restaurant data
const crispyChicken = restaurants[0]
console.log(crispyChicken.name)           // 'Crispy Chicken Palace'
console.log(crispyChicken.rating)         // 4.8
console.log(crispyChicken.theme.primaryColor) // '#FF6B6B'
console.log(crispyChicken.openingHours)   // Opening hours array
console.log(crispyChicken.contact.phone)  // '+1-555-0101'

// ============================================================
// 3. GENERATING MENU CATEGORIES AND ITEMS
// ============================================================

import { generateCategories, generateMenuItems } from '@/utils/seedData'

// Get categories for a restaurant
const categories = generateCategories('rest-001')
console.log(categories.length) // 8 categories
console.log(categories[0].name) // 'Appetizers'

// Get menu items for a restaurant
const menuItems = generateMenuItems('rest-001')
console.log(menuItems.length)           // ~50-100 items
console.log(menuItems[0].name)          // Random item name
console.log(menuItems[0].price)         // Random price (5.99-24.99)
console.log(menuItems[0].isPopular)     // Random boolean
console.log(menuItems[0].customizations) // Optional customizations

// ============================================================
// 4. USING IN REACT COMPONENTS - CART
// ============================================================

import { useState, useEffect } from 'react'
import { generateCartItems } from '@/utils/seedData'

export default function CartComponent() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Generate random cart items on component mount
    const cartItems = generateCartItems()
    setItems(cartItems)
  }, [])

  // items will contain:
  // [
  //   { id: '1', name: 'Item Name', price: 9.99, quantity: 2, image: 'url', ... },
  //   { id: '2', name: 'Another Item', price: 12.99, quantity: 1, image: 'url', ... },
  //   ...
  // ]

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 5. USING IN REACT COMPONENTS - ORDERS
// ============================================================

import { useState, useEffect } from 'react'
import { generateOrders } from '@/utils/seedData'

export default function OrdersComponent() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate random orders on component mount
    const generatedOrders = generateOrders()
    setOrders(generatedOrders)
    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>

  // orders will contain:
  // [
  //   {
  //     id: 'order-0',
  //     orderNumber: '#ORD-2024-100',
  //     date: '2024-01-28',
  //     time: '14:30',
  //     status: 'preparing',
  //     items: [
  //       { id: 'item-0', name: 'Item Name', quantity: 2, price: 9.99 },
  //       ...
  //     ],
  //     total: 45.99,
  //     tableNumber: '5',
  //     estimatedTime: '15 mins'
  //   },
  //   ...
  // ]

  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>{order.orderNumber}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total}</p>
          <p>Estimated Time: {order.estimatedTime}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 6. USING IN REACT COMPONENTS - KITCHEN DISPLAY
// ============================================================

import { useState, useEffect } from 'react'
import { generateKitchenOrders } from '@/utils/seedData'

export default function KitchenDisplayComponent() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Generate random kitchen orders
    const kitchenOrders = generateKitchenOrders()
    setOrders(kitchenOrders)
  }, [])

  // orders will contain:
  // [
  //   {
  //     id: '#2840',
  //     table: 'Table 5',
  //     items: [
  //       { name: 'Item Name', quantity: 1, notes: 'No onions' },
  //       ...
  //     ],
  //     status: 'cooking', // 'queued', 'cooking', 'ready'
  //     priority: 'rush',   // 'normal', 'rush'
  //     waitTime: 8
  //   },
  //   ...
  // ]

  return (
    <div>
      {orders.map(order => (
        <div key={order.id} style={{
          border: order.priority === 'rush' ? '2px solid red' : '1px solid gray',
          padding: '10px',
          margin: '5px'
        }}>
          <h3>{order.id} - {order.table}</h3>
          <p>Status: {order.status}</p>
          <p>Priority: {order.priority}</p>
          <p>Wait Time: {order.waitTime} mins</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.quantity}x {item.name}
                {item.notes && ` (${item.notes})`}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 7. USING IN REACT COMPONENTS - TABLE MANAGEMENT
// ============================================================

import { useState, useEffect } from 'react'
import { generateTables } from '@/utils/seedData'

export default function TableManagementComponent() {
  const [tables, setTables] = useState([])

  useEffect(() => {
    // Generate random table statuses
    const allTables = generateTables()
    setTables(allTables)
  }, [])

  // tables will contain:
  // [
  //   {
  //     id: 1,
  //     number: '1',
  //     capacity: 2,
  //     status: 'available', // 'available', 'occupied', 'reserved', 'cleaning'
  //     currentOrder: null
  //   },
  //   {
  //     id: 2,
  //     number: '2',
  //     capacity: 4,
  //     status: 'occupied',
  //     currentOrder: {
  //       id: '#2841',
  //       guests: 3,
  //       total: 67.50,
  //       duration: 12
  //     }
  //   },
  //   ...
  // ]

  const statusColors = {
    available: '#10b981',
    occupied: '#ef4444',
    reserved: '#f59e0b',
    cleaning: '#3b82f6'
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {tables.map(table => (
        <div
          key={table.id}
          style={{
            backgroundColor: statusColors[table.status],
            padding: '20px',
            borderRadius: '8px',
            color: 'white'
          }}
        >
          <h3>Table {table.number}</h3>
          <p>Capacity: {table.capacity}</p>
          <p>Status: {table.status}</p>
          {table.currentOrder && (
            <p>Order: {table.currentOrder.id} - ${table.currentOrder.total}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 8. COMBINING DATA - RESTAURANT WITH MENU
// ============================================================

import { 
  generateRestaurants, 
  generateCategories, 
  generateMenuItems 
} from '@/utils/seedData'

export default function RestaurantMenuComponent() {
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    const restaurants = generateRestaurants()
    const selectedRestaurant = restaurants[0] // Crispy Chicken Palace

    const cats = generateCategories(selectedRestaurant.id)
    const items = generateMenuItems(selectedRestaurant.id)

    setRestaurant(selectedRestaurant)
    setCategories(cats)
    setMenuItems(items)
  }, [])

  if (!restaurant) return <div>Loading...</div>

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <p>Rating: {restaurant.rating}★ ({restaurant.reviewCount} reviews)</p>

      <div>
        <h2>Categories ({categories.length})</h2>
        {categories.map(cat => (
          <div key={cat.id}>
            <h3>{cat.name}</h3>
            <p>{cat.itemCount} items</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Menu Items ({menuItems.length})</h2>
        {menuItems.slice(0, 5).map(item => (
          <div key={item.id}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
            <p>{item.description}</p>
            {item.isPopular && <span>⭐ Popular</span>}
            {item.isNew && <span>🆕 New</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 9. ERROR HANDLING WITH SEED DATA
// ============================================================

import { generateOrders } from '@/utils/seedData'

export default function SafeOrdersComponent() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const generatedOrders = generateOrders()
      
      // Validation
      if (!Array.isArray(generatedOrders)) {
        throw new Error('Orders should be an array')
      }

      if (generatedOrders.length === 0) {
        throw new Error('No orders generated')
      }

      setOrders(generatedOrders)
    } catch (err) {
      setError(err.message)
      console.error('Error loading orders:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) return <div>Loading orders...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (orders.length === 0) return <div>No orders available</div>

  return (
    <div>
      <h1>Orders ({orders.length})</h1>
      {/* Render orders */}
    </div>
  )
}

// ============================================================
// 10. TESTING - MOCKING IN JEST
// ============================================================

import { generateRestaurants, generateMenuItems } from '@/utils/seedData'

describe('RestaurantMenu', () => {
  test('should display restaurant with menu items', () => {
    const restaurants = generateRestaurants()
    expect(restaurants).toHaveLength(3)

    const restaurant = restaurants[0]
    expect(restaurant.name).toBe('Crispy Chicken Palace')

    const items = generateMenuItems(restaurant.id)
    expect(items.length).toBeGreaterThan(0)
    
    const firstItem = items[0]
    expect(firstItem.price).toBeGreaterThan(4.99)
    expect(firstItem.price).toBeLessThan(25)
  })

  test('all orders should have required fields', () => {
    const orders = generateOrders()
    
    orders.forEach(order => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('orderNumber')
      expect(order).toHaveProperty('status')
      expect(order).toHaveProperty('items')
      expect(order).toHaveProperty('total')
      expect(Array.isArray(order.items)).toBe(true)
      expect(order.items.length).toBeGreaterThan(0)
    })
  })
})

// ============================================================
// NOTES
// ============================================================

/*
1. All seed data functions are pure and stateless
2. Each call generates fresh random data
3. Images use Unsplash for realistic product photos
4. Prices are realistic and varied
5. Dates are within the last 7 days
6. Statuses have realistic distributions
7. All data includes proper TypeScript types
8. Ready for integration with real backend APIs
9. No data persistence (refreshes on page load)
10. Suitable for development and testing
*/
