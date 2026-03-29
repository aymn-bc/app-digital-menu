/**
 * Seed Data Generator
 * Generates realistic mock data for development and testing
 */

export interface Restaurant {
  id: string
  name: string
  slug: string
  logo: string
  coverImage: string
  description: string
  tagline: string
  cuisine: string[]
  rating: number
  reviewCount: number
  deliveryTime: string
  minimumOrder: number
  deliveryFee: number
  isOpen: boolean
  openingHours: {
    day: string
    open: string
    close: string
  }[]
  contact: {
    phone: string
    email: string
    address: string
  }
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontFamily: string
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
    cardStyle: 'flat' | 'elevated' | 'bordered' | 'glass'
    headerStyle: 'solid' | 'transparent' | 'gradient'
    darkMode: boolean
  }
  heroSection: {
    type: 'image' | 'video' | 'carousel' | 'split'
    title: string
    subtitle: string
    backgroundImage?: string
    backgroundVideo?: string
    ctaText: string
    ctaLink: string
    overlayOpacity: number
    alignment: 'left' | 'center' | 'right'
    showSearch: boolean
    featuredBadge?: string
  }
  features: string[]
}

export interface Category {
  id: string
  name: string
  nameAr?: string
  description: string
  icon: string
  image: string
  itemCount: number
  sortOrder: number
}

export interface MenuItem {
  id: string
  categoryId: string
  name: string
  nameAr?: string
  description: string
  descriptionAr?: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  tags: string[]
  isAvailable: boolean
  isPopular: boolean
  isNew: boolean
  isSpicy: boolean
  isVegetarian: boolean
  calories?: number
  prepTime: string
  allergens?: string[]
  customizations?: {
    id: string
    name: string
    type: 'single' | 'multiple'
    required: boolean
    options: {
      id: string
      name: string
      price: number
    }[]
  }[]
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'admin' | 'restaurant' | 'customer'
  restaurantId?: string
  avatar?: string
}

// Palette of predefined restaurants (kept for potential future use)
// const restaurantNames = [...]
// const cuisineTypes = [...]
// const colors = [...]
// const fonts = [...]

const menuItems = [
  {
    name: 'Crispy Chicken Burger',
    description: 'Golden fried chicken patty with fresh lettuce, tomato and special sauce',
    price: 9.99,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    isSpicy: false,
    isVegetarian: false,
    calories: 450,
    prepTime: '10',
  },
  {
    name: 'Spicy Wings',
    description: 'Hot and crispy chicken wings with special spice blend',
    price: 7.99,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    isSpicy: true,
    isVegetarian: false,
    calories: 380,
    prepTime: '12',
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan cheese and house-made dressing',
    price: 8.99,
    category: 'Salads',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    isSpicy: false,
    isVegetarian: true,
    calories: 280,
    prepTime: '5',
  },
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, basil and tomato sauce',
    price: 12.99,
    category: 'Pizzas',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    isSpicy: false,
    isVegetarian: true,
    calories: 520,
    prepTime: '15',
  },
  {
    name: 'Sushi Roll Platter',
    description: 'Assorted fresh sushi rolls with wasabi and ginger',
    price: 16.99,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    isSpicy: false,
    isVegetarian: false,
    calories: 380,
    prepTime: '10',
  },
  {
    name: 'French Fries',
    description: 'Golden crispy fries with sea salt',
    price: 4.49,
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1585238341710-4dd0c06ff1be?w=400',
    isSpicy: false,
    isVegetarian: true,
    calories: 320,
    prepTime: '8',
  },
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate frosting',
    price: 6.99,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    isSpicy: false,
    isVegetarian: true,
    calories: 450,
    prepTime: '2',
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing cold iced tea',
    price: 2.99,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1437268884999-a42d9266b955?w=400',
    isSpicy: false,
    isVegetarian: true,
    calories: 120,
    prepTime: '2',
  },
]

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomPrice(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

export function generateUsers(): User[] {
  return [
    {
      id: 'user-admin-001',
      email: 'admin@example.com',
      password: 'password123',
      name: 'Admin Manager',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
      id: 'user-rest-001',
      email: 'pizza@palace.com',
      password: 'password123',
      name: 'Pizza Palace Manager',
      role: 'restaurant',
      restaurantId: 'rest-001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 'user-rest-002',
      email: 'sushi@master.com',
      password: 'password123',
      name: 'Sushi Master Manager',
      role: 'restaurant',
      restaurantId: 'rest-002',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      id: 'user-rest-003',
      email: 'burger@heaven.com',
      password: 'password123',
      name: 'Burger Heaven Manager',
      role: 'restaurant',
      restaurantId: 'rest-003',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    {
      id: 'user-customer-001',
      email: 'john@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713566543-abdb180e24ac?w=100&h=100&fit=crop',
    },
    {
      id: 'user-customer-002',
      email: 'jane@example.com',
      password: 'password123',
      name: 'Jane Smith',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      id: 'user-customer-003',
      email: 'bob@example.com',
      password: 'password123',
      name: 'Bob Johnson',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  ]
}

export function generateRestaurants(): Restaurant[] {
  return [
    {
      id: 'rest-001',
      name: 'Crispy Chicken Palace',
      slug: 'crispy-chicken-palace',
      logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=100',
      coverImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800',
      description: 'Experience the best fried chicken in town with our secret recipe',
      tagline: 'Finger-licking good since 2015',
      cuisine: ['Fast Food', 'Chicken'],
      rating: 4.8,
      reviewCount: 324,
      deliveryTime: '20-30',
      minimumOrder: 15,
      deliveryFee: 2.99,
      isOpen: true,
      openingHours: [
        { day: 'Monday', open: '10:00', close: '23:00' },
        { day: 'Tuesday', open: '10:00', close: '23:00' },
        { day: 'Wednesday', open: '10:00', close: '23:00' },
        { day: 'Thursday', open: '10:00', close: '23:00' },
        { day: 'Friday', open: '10:00', close: '00:00' },
        { day: 'Saturday', open: '11:00', close: '00:00' },
        { day: 'Sunday', open: '11:00', close: '22:00' },
      ],
      contact: {
        phone: '+1-555-0101',
        email: 'contact@crispy.com',
        address: '123 Main Street, City, State 12345',
      },
      theme: {
        primaryColor: '#FF6B6B',
        secondaryColor: '#FFE66D',
        accentColor: '#FF8C42',
        fontFamily: 'Poppins',
        borderRadius: 'medium',
        cardStyle: 'elevated',
        headerStyle: 'solid',
        darkMode: true,
      },
      heroSection: {
        type: 'image',
        title: 'Welcome to Crispy Chicken Palace',
        subtitle: 'Taste the difference of quality',
        backgroundImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800',
        ctaText: 'Order Now',
        ctaLink: '/menu',
        overlayOpacity: 0.4,
        alignment: 'center',
        showSearch: true,
        featuredBadge: 'Top Rated 🌟',
      },
      features: ['Free Delivery on Orders $50+', 'Fast Delivery', 'Quality Guaranteed', '24/7 Support'],
    },
    {
      id: 'rest-002',
      name: 'Sakura Sushi House',
      slug: 'sakura-sushi-house',
      logo: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=100',
      coverImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      description: 'Fresh, authentic Japanese sushi crafted daily by master chefs',
      tagline: 'Authentic taste from Japan',
      cuisine: ['Japanese', 'Sushi'],
      rating: 4.9,
      reviewCount: 456,
      deliveryTime: '25-35',
      minimumOrder: 20,
      deliveryFee: 3.99,
      isOpen: true,
      openingHours: [
        { day: 'Monday', open: '11:00', close: '22:00' },
        { day: 'Tuesday', open: '11:00', close: '22:00' },
        { day: 'Wednesday', open: '11:00', close: '22:00' },
        { day: 'Thursday', open: '11:00', close: '22:00' },
        { day: 'Friday', open: '11:00', close: '23:30' },
        { day: 'Saturday', open: '12:00', close: '23:30' },
        { day: 'Sunday', open: '12:00', close: '22:00' },
      ],
      contact: {
        phone: '+1-555-0102',
        email: 'contact@sakura.com',
        address: '456 Oak Avenue, City, State 12345',
      },
      theme: {
        primaryColor: '#E74C3C',
        secondaryColor: '#ECF0F1',
        accentColor: '#2C3E50',
        fontFamily: 'Montserrat',
        borderRadius: 'small',
        cardStyle: 'flat',
        headerStyle: 'gradient',
        darkMode: false,
      },
      heroSection: {
        type: 'carousel',
        title: 'Authentic Japanese Sushi',
        subtitle: 'Experience Japan in every bite',
        backgroundImage: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
        ctaText: 'View Menu',
        ctaLink: '/menu',
        overlayOpacity: 0.3,
        alignment: 'left',
        showSearch: true,
        featuredBadge: 'Premium Quality',
      },
      features: ['Fresh Ingredients Daily', 'Expert Chefs', 'Premium Quality', 'Special Rolls Available'],
    },
    {
      id: 'rest-003',
      name: 'Pizza Paradise',
      slug: 'pizza-paradise',
      logo: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=100',
      coverImage: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800',
      description: 'Authentic Italian pizzas baked in our wood-fired oven',
      tagline: 'Heaven in every slice',
      cuisine: ['Italian', 'Pizza'],
      rating: 4.7,
      reviewCount: 287,
      deliveryTime: '22-32',
      minimumOrder: 12,
      deliveryFee: 2.49,
      isOpen: true,
      openingHours: [
        { day: 'Monday', open: '11:00', close: '23:00' },
        { day: 'Tuesday', open: '11:00', close: '23:00' },
        { day: 'Wednesday', open: '11:00', close: '23:00' },
        { day: 'Thursday', open: '11:00', close: '23:00' },
        { day: 'Friday', open: '11:00', close: '00:30' },
        { day: 'Saturday', open: '12:00', close: '00:30' },
        { day: 'Sunday', open: '12:00', close: '23:00' },
      ],
      contact: {
        phone: '+1-555-0103',
        email: 'contact@pizza.com',
        address: '789 Pine Street, City, State 12345',
      },
      theme: {
        primaryColor: '#27AE60',
        secondaryColor: '#FFFFFF',
        accentColor: '#E74C3C',
        fontFamily: 'Playfair Display',
        borderRadius: 'large',
        cardStyle: 'glass',
        headerStyle: 'solid',
        darkMode: true,
      },
      heroSection: {
        type: 'split',
        title: 'Premium Italian Pizza',
        subtitle: 'Traditional recipes, modern flavors',
        backgroundImage: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800',
        ctaText: 'Order Pizza',
        ctaLink: '/menu',
        overlayOpacity: 0.35,
        alignment: 'right',
        showSearch: true,
        featuredBadge: 'Wood-Fired',
      },
      features: ['Wood-Fired Oven', 'Fresh Ingredients', 'Same Day Delivery', 'Custom Pizzas'],
    },
  ]
}

export function generateCategories(restaurantId: string): Category[] {
  const categories = ['Appetizers', 'Burgers', 'Pizzas', 'Salads', 'Sushi', 'Sides', 'Desserts', 'Beverages']
  
  return categories.map((cat, idx) => ({
    id: `cat-${restaurantId}-${idx}`,
    name: cat,
    nameAr: cat, // Add Arabic translation
    description: `Discover our delicious ${cat.toLowerCase()}`,
    icon: '🍽️',
    image: `https://images.unsplash.com/photo-1${600000 + idx}?w=200`,
    itemCount: randomInt(5, 15),
    sortOrder: idx,
  }))
}

export function generateMenuItems(restaurantId: string): MenuItem[] {
  const categories = generateCategories(restaurantId)
  const items: MenuItem[] = []

  categories.forEach((category) => {
    const itemCount = randomInt(5, 10)
    
    for (let i = 0; i < itemCount; i++) {
      const baseItem = randomElement(menuItems)
      items.push({
        id: `item-${restaurantId}-${category.id}-${i}`,
        categoryId: category.id,
        name: baseItem.name,
        nameAr: baseItem.name, // Add Arabic translation
        description: baseItem.description,
        descriptionAr: baseItem.description,
        price: randomPrice(5.99, 24.99),
        originalPrice: Math.random() > 0.7 ? randomPrice(25, 40) : undefined,
        image: baseItem.image,
        images: [baseItem.image],
        tags: ['Popular', 'Fresh', 'New'].filter(() => Math.random() > 0.6),
        isAvailable: Math.random() > 0.1,
        isPopular: Math.random() > 0.7,
        isNew: Math.random() > 0.8,
        isSpicy: baseItem.isSpicy || Math.random() > 0.7,
        isVegetarian: baseItem.isVegetarian || Math.random() > 0.7,
        calories: baseItem.calories || randomInt(200, 600),
        prepTime: baseItem.prepTime,
        allergens: ['Dairy', 'Gluten', 'Nuts'].filter(() => Math.random() > 0.6),
        customizations: Math.random() > 0.6 ? [
          {
            id: `custom-1`,
            name: 'Size',
            type: 'single' as const,
            required: true,
            options: [
              { id: 'size-s', name: 'Small', price: 0 },
              { id: 'size-m', name: 'Medium', price: 1.99 },
              { id: 'size-l', name: 'Large', price: 3.99 },
            ],
          },
          {
            id: `custom-2`,
            name: 'Sauce',
            type: 'single' as const,
            required: false,
            options: [
              { id: 'sauce-mayo', name: 'Mayo', price: 0 },
              { id: 'sauce-spicy', name: 'Spicy Mayo', price: 0.5 },
              { id: 'sauce-garlic', name: 'Garlic Sauce', price: 0.5 },
            ],
          },
        ] : undefined,
      })
    }
  })

  return items
}

export function generateOrders() {
  const statuses: Array<'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'> = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
  ]
  
  const orders = []
  
  for (let i = 0; i < 20; i++) {
    orders.push({
      id: `order-${i}`,
      orderNumber: `#ORD-2024-${String(1000 + i).padStart(3, '0')}`,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      status: randomElement(statuses),
      items: Array.from({ length: randomInt(1, 4) }, (_, j) => ({
        id: `item-${j}`,
        name: randomElement(menuItems).name,
        quantity: randomInt(1, 3),
        price: randomPrice(5, 20),
      })),
      total: randomPrice(15, 100),
      tableNumber: String(randomInt(1, 12)),
      estimatedTime: `${randomInt(5, 45)} mins`,
    })
  }
  
  return orders
}

export function generateKitchenOrders() {
  const statuses: Array<'queued' | 'cooking' | 'ready'> = ['queued', 'cooking', 'ready']
  const priorities: Array<'normal' | 'rush'> = ['normal', 'rush']
  
  const orders = []
  
  for (let i = 0; i < 10; i++) {
    orders.push({
      id: `#${2840 + i}`,
      table: `Table ${randomInt(1, 12)}`,
      items: Array.from({ length: randomInt(1, 3) }, () => ({
        name: randomElement(menuItems).name,
        quantity: randomInt(1, 2),
        notes: Math.random() > 0.7 ? 'No onions' : undefined,
      })),
      status: randomElement(statuses),
      priority: randomElement(priorities),
      waitTime: randomInt(0, 30),
    })
  }
  
  return orders
}

export function generateTables() {
  const tables = []
  const statuses: Array<'available' | 'occupied' | 'reserved' | 'cleaning'> = [
    'available',
    'occupied',
    'reserved',
    'cleaning',
  ]
  
  for (let i = 1; i <= 12; i++) {
    const status = randomElement(statuses)
    tables.push({
      id: i,
      number: String(i),
      capacity: randomElement([2, 4, 6, 8]),
      status,
      currentOrder: status === 'occupied' ? {
        id: `#${2840 + i}`,
        guests: randomInt(1, 8),
        total: randomPrice(30, 150),
        duration: randomInt(5, 60),
      } : undefined,
    })
  }
  
  return tables
}

export function generateCartItems() {
  return Array.from({ length: randomInt(2, 5) }, (_, i) => ({
    id: String(i + 1),
    name: randomElement(menuItems).name,
    price: randomPrice(5, 25),
    quantity: randomInt(1, 3),
    image: randomElement(menuItems).image,
    notes: Math.random() > 0.6 ? 'Special request' : undefined,
    dietary: Math.random() > 0.7 ? ['Vegetarian'] : undefined,
  }))
}
