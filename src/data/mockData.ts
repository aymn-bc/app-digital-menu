// Mock data for the Digital Menu System

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
  theme: RestaurantTheme
  heroSection: HeroSection
  features: string[]
}

export interface RestaurantTheme {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
  cardStyle: 'flat' | 'elevated' | 'bordered' | 'glass'
  headerStyle: 'solid' | 'transparent' | 'gradient'
  darkMode: boolean
}

export interface HeroSection {
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
  customizations?: Customization[]
}

export interface Customization {
  id: string
  name: string
  type: 'single' | 'multiple'
  required: boolean
  options: {
    id: string
    name: string
    price: number
  }[]
}

// Sample Restaurants with Different Themes
export const sampleRestaurants: Restaurant[] = [
  {
    id: 'rest-001',
    name: 'Crispy Chicken House',
    slug: 'crispy-chicken',
    logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1920&h=600&fit=crop',
    description: 'The best fried chicken in town with our secret 11 herbs and spices recipe.',
    tagline: 'Finger Lickin\' Good Since 1992',
    cuisine: ['American', 'Fast Food', 'Chicken'],
    rating: 4.7,
    reviewCount: 2847,
    deliveryTime: '25-35 min',
    minimumOrder: 15,
    deliveryFee: 3.99,
    isOpen: true,
    openingHours: [
      { day: 'Monday', open: '10:00', close: '23:00' },
      { day: 'Tuesday', open: '10:00', close: '23:00' },
      { day: 'Wednesday', open: '10:00', close: '23:00' },
      { day: 'Thursday', open: '10:00', close: '23:00' },
      { day: 'Friday', open: '10:00', close: '00:00' },
      { day: 'Saturday', open: '10:00', close: '00:00' },
      { day: 'Sunday', open: '11:00', close: '22:00' },
    ],
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@crispychicken.com',
      address: '123 Main Street, Foodville, FC 12345',
    },
    theme: {
      primaryColor: '#C8102E',
      secondaryColor: '#F4B223',
      accentColor: '#1C1C1C',
      fontFamily: 'Inter',
      borderRadius: 'medium',
      cardStyle: 'elevated',
      headerStyle: 'solid',
      darkMode: false,
    },
    heroSection: {
      type: 'image',
      title: 'Crispy, Juicy, Delicious',
      subtitle: 'Made fresh daily with our secret blend of herbs and spices',
      backgroundImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1920&h=800&fit=crop',
      ctaText: 'Order Now',
      ctaLink: '/menu',
      overlayOpacity: 0.5,
      alignment: 'center',
      showSearch: true,
      featuredBadge: '🔥 Hot Deal: 20% Off Family Buckets',
    },
    features: ['Dine-in', 'Takeaway', 'Delivery', 'Drive-thru'],
  },
  {
    id: 'rest-002',
    name: 'Sakura Sushi Bar',
    slug: 'sakura-sushi',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1920&h=600&fit=crop',
    description: 'Authentic Japanese cuisine with the freshest ingredients flown in daily.',
    tagline: 'Where Tradition Meets Taste',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    reviewCount: 1523,
    deliveryTime: '30-45 min',
    minimumOrder: 25,
    deliveryFee: 4.99,
    isOpen: true,
    openingHours: [
      { day: 'Monday', open: '12:00', close: '22:00' },
      { day: 'Tuesday', open: '12:00', close: '22:00' },
      { day: 'Wednesday', open: '12:00', close: '22:00' },
      { day: 'Thursday', open: '12:00', close: '22:00' },
      { day: 'Friday', open: '12:00', close: '23:00' },
      { day: 'Saturday', open: '12:00', close: '23:00' },
      { day: 'Sunday', open: '13:00', close: '21:00' },
    ],
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'reservations@sakurasushi.com',
      address: '456 Cherry Blossom Ave, Downtown, FC 12346',
    },
    theme: {
      primaryColor: '#1A1A2E',
      secondaryColor: '#E94560',
      accentColor: '#F5E6D3',
      fontFamily: 'Inter',
      borderRadius: 'small',
      cardStyle: 'bordered',
      headerStyle: 'transparent',
      darkMode: true,
    },
    heroSection: {
      type: 'carousel',
      title: 'Experience Authentic Japan',
      subtitle: 'Fresh sushi, sashimi & traditional dishes crafted by master chefs',
      backgroundImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1920&h=800&fit=crop',
      ctaText: 'View Menu',
      ctaLink: '/menu',
      overlayOpacity: 0.6,
      alignment: 'left',
      showSearch: false,
      featuredBadge: '🍣 Omakase Special Tonight',
    },
    features: ['Dine-in', 'Takeaway', 'Reservations', 'Private Dining'],
  },
  {
    id: 'rest-003',
    name: 'Pizza Paradise',
    slug: 'pizza-paradise',
    logo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=600&fit=crop',
    description: 'Wood-fired pizzas made with imported Italian ingredients and love.',
    tagline: 'A Slice of Italy in Every Bite',
    cuisine: ['Italian', 'Pizza', 'Mediterranean'],
    rating: 4.6,
    reviewCount: 3421,
    deliveryTime: '20-30 min',
    minimumOrder: 12,
    deliveryFee: 2.99,
    isOpen: true,
    openingHours: [
      { day: 'Monday', open: '11:00', close: '23:00' },
      { day: 'Tuesday', open: '11:00', close: '23:00' },
      { day: 'Wednesday', open: '11:00', close: '23:00' },
      { day: 'Thursday', open: '11:00', close: '23:00' },
      { day: 'Friday', open: '11:00', close: '00:00' },
      { day: 'Saturday', open: '11:00', close: '00:00' },
      { day: 'Sunday', open: '12:00', close: '22:00' },
    ],
    contact: {
      phone: '+1 (555) 456-7890',
      email: 'orders@pizzaparadise.com',
      address: '789 Margherita Lane, Little Italy, FC 12347',
    },
    theme: {
      primaryColor: '#D4380D',
      secondaryColor: '#52C41A',
      accentColor: '#FADB14',
      fontFamily: 'Inter',
      borderRadius: 'large',
      cardStyle: 'glass',
      headerStyle: 'gradient',
      darkMode: false,
    },
    heroSection: {
      type: 'split',
      title: 'Handcrafted with Passion',
      subtitle: 'Every pizza tells a story of Italian tradition',
      backgroundImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=800&fit=crop',
      ctaText: 'Build Your Pizza',
      ctaLink: '/menu',
      overlayOpacity: 0.4,
      alignment: 'right',
      showSearch: true,
      featuredBadge: '🍕 2-for-1 Tuesdays!',
    },
    features: ['Dine-in', 'Takeaway', 'Delivery', 'Catering'],
  },
  {
    id: 'rest-004',
    name: 'The Green Bowl',
    slug: 'green-bowl',
    logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&h=600&fit=crop',
    description: 'Fresh, healthy, and delicious plant-based meals for conscious eaters.',
    tagline: 'Nourish Your Body, Love Your Planet',
    cuisine: ['Healthy', 'Vegan', 'Salads', 'Bowls'],
    rating: 4.8,
    reviewCount: 892,
    deliveryTime: '15-25 min',
    minimumOrder: 10,
    deliveryFee: 2.49,
    isOpen: true,
    openingHours: [
      { day: 'Monday', open: '08:00', close: '20:00' },
      { day: 'Tuesday', open: '08:00', close: '20:00' },
      { day: 'Wednesday', open: '08:00', close: '20:00' },
      { day: 'Thursday', open: '08:00', close: '20:00' },
      { day: 'Friday', open: '08:00', close: '21:00' },
      { day: 'Saturday', open: '09:00', close: '21:00' },
      { day: 'Sunday', open: '09:00', close: '19:00' },
    ],
    contact: {
      phone: '+1 (555) 321-9876',
      email: 'hello@greenbowl.com',
      address: '321 Wellness Way, Organic District, FC 12348',
    },
    theme: {
      primaryColor: '#389E0D',
      secondaryColor: '#7CB305',
      accentColor: '#FFF7E6',
      fontFamily: 'Inter',
      borderRadius: 'full',
      cardStyle: 'flat',
      headerStyle: 'transparent',
      darkMode: false,
    },
    heroSection: {
      type: 'image',
      title: 'Eat Clean, Feel Amazing',
      subtitle: '100% organic ingredients • Plant-powered • Zero guilt',
      backgroundImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1920&h=800&fit=crop',
      ctaText: 'Explore Menu',
      ctaLink: '/menu',
      overlayOpacity: 0.3,
      alignment: 'center',
      showSearch: true,
      featuredBadge: '🥗 New: Summer Detox Bowl',
    },
    features: ['Dine-in', 'Takeaway', 'Delivery', 'Meal Prep'],
  },
]

// Sample Categories
export const sampleCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'Signature Buckets',
    nameAr: 'دلو التوقيع',
    description: 'Our famous bucket meals perfect for sharing',
    icon: '🍗',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop',
    itemCount: 8,
    sortOrder: 1,
  },
  {
    id: 'cat-002',
    name: 'Burgers & Sandwiches',
    nameAr: 'البرغر والسندويشات',
    description: 'Juicy burgers and crispy chicken sandwiches',
    icon: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    itemCount: 12,
    sortOrder: 2,
  },
  {
    id: 'cat-003',
    name: 'Sides & Extras',
    nameAr: 'الأطباق الجانبية',
    description: 'Perfect companions for your meal',
    icon: '🍟',
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop',
    itemCount: 15,
    sortOrder: 3,
  },
  {
    id: 'cat-004',
    name: 'Beverages',
    nameAr: 'المشروبات',
    description: 'Refreshing drinks to complete your meal',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=300&fit=crop',
    itemCount: 10,
    sortOrder: 4,
  },
  {
    id: 'cat-005',
    name: 'Desserts',
    nameAr: 'الحلويات',
    description: 'Sweet treats to end your meal right',
    icon: '🍰',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    itemCount: 6,
    sortOrder: 5,
  },
  {
    id: 'cat-006',
    name: 'Family Meals',
    nameAr: 'وجبات عائلية',
    description: 'Value meals for the whole family',
    icon: '👨‍👩‍👧‍👦',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    itemCount: 5,
    sortOrder: 6,
  },
]

// Sample Menu Items
export const sampleMenuItems: MenuItem[] = [
  {
    id: 'item-001',
    categoryId: 'cat-001',
    name: '8-Piece Original Bucket',
    nameAr: 'دلو 8 قطع أصلي',
    description: '8 pieces of our signature crispy fried chicken with our secret blend of 11 herbs and spices',
    descriptionAr: '8 قطع من الدجاج المقلي المقرمش مع خلطتنا السرية من 11 نوع من الأعشاب والتوابل',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop',
    tags: ['Best Seller', 'Family Size'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    calories: 1840,
    prepTime: '12-15 min',
    allergens: ['Gluten', 'Eggs'],
    customizations: [
      {
        id: 'cust-001',
        name: 'Choose Your Pieces',
        type: 'single',
        required: true,
        options: [
          { id: 'opt-001', name: 'All Drumsticks', price: 0 },
          { id: 'opt-002', name: 'All Wings', price: 0 },
          { id: 'opt-003', name: 'Mixed Pieces', price: 0 },
        ],
      },
      {
        id: 'cust-002',
        name: 'Add Sides',
        type: 'multiple',
        required: false,
        options: [
          { id: 'opt-004', name: 'Coleslaw', price: 2.99 },
          { id: 'opt-005', name: 'Mashed Potatoes', price: 2.99 },
          { id: 'opt-006', name: 'Corn on the Cob', price: 2.49 },
        ],
      },
    ],
  },
  {
    id: 'item-002',
    categoryId: 'cat-001',
    name: '12-Piece Spicy Bucket',
    nameAr: 'دلو 12 قطع حار',
    description: '12 pieces of extra spicy fried chicken for those who like it hot',
    descriptionAr: '12 قطعة من الدجاج المقلي الحار جداً لمحبي الطعم الحار',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=400&fit=crop',
    tags: ['Spicy', 'Party Size'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: true,
    isVegetarian: false,
    calories: 2760,
    prepTime: '15-18 min',
    allergens: ['Gluten', 'Eggs'],
  },
  {
    id: 'item-003',
    categoryId: 'cat-002',
    name: 'Classic Chicken Burger',
    nameAr: 'برغر الدجاج الكلاسيكي',
    description: 'Crispy chicken fillet, fresh lettuce, tomatoes, and our special sauce in a toasted bun',
    descriptionAr: 'فيليه دجاج مقرمش، خس طازج، طماطم، وصلصتنا الخاصة في خبز محمص',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop',
    tags: ['Classic'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: false,
    calories: 650,
    prepTime: '8-10 min',
    allergens: ['Gluten', 'Eggs', 'Sesame'],
  },
  {
    id: 'item-004',
    categoryId: 'cat-002',
    name: 'Double Stack Burger',
    nameAr: 'برغر دبل ستاك',
    description: 'Two crispy chicken fillets, double cheese, bacon, pickles, and signature sauce',
    descriptionAr: 'فيليه دجاج مقرمش مزدوج، جبن مضاعف، لحم مقدد، مخلل، وصلصة خاصة',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop',
    tags: ['New', 'Limited Time'],
    isAvailable: true,
    isPopular: false,
    isNew: true,
    isSpicy: false,
    isVegetarian: false,
    calories: 980,
    prepTime: '10-12 min',
    allergens: ['Gluten', 'Eggs', 'Dairy', 'Sesame'],
  },
  {
    id: 'item-005',
    categoryId: 'cat-003',
    name: 'Crispy Fries (Large)',
    nameAr: 'بطاطس مقلية (كبير)',
    description: 'Golden crispy fries seasoned with our special spice blend',
    descriptionAr: 'بطاطس مقلية ذهبية متبلة بخلطة التوابل الخاصة',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&h=400&fit=crop',
    tags: ['Vegetarian'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: true,
    calories: 420,
    prepTime: '5-7 min',
    allergens: [],
  },
  {
    id: 'item-006',
    categoryId: 'cat-003',
    name: 'Loaded Cheese Fries',
    nameAr: 'بطاطس بالجبن',
    description: 'Crispy fries topped with melted cheese, bacon bits, and jalapeños',
    descriptionAr: 'بطاطس مقلية مغطاة بالجبن الذائب، قطع اللحم المقدد، والهالبينو',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&h=400&fit=crop',
    tags: ['Indulgent'],
    isAvailable: true,
    isPopular: false,
    isNew: false,
    isSpicy: true,
    isVegetarian: false,
    calories: 680,
    prepTime: '7-9 min',
    allergens: ['Dairy'],
  },
  {
    id: 'item-007',
    categoryId: 'cat-004',
    name: 'Fresh Lemonade',
    nameAr: 'ليموناضة طازجة',
    description: 'Freshly squeezed lemonade with a hint of mint',
    descriptionAr: 'ليموناضة طازجة مع لمسة من النعناع',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&h=400&fit=crop',
    tags: ['Refreshing', 'Fresh'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: true,
    calories: 120,
    prepTime: '2-3 min',
  },
  {
    id: 'item-008',
    categoryId: 'cat-005',
    name: 'Chocolate Lava Cake',
    nameAr: 'كيك الشوكولاتة السائلة',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    descriptionAr: 'كيك شوكولاتة دافئ مع قلب سائل، يقدم مع آيس كريم الفانيليا',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
    tags: ['Dessert', 'Indulgent'],
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    isVegetarian: true,
    calories: 480,
    prepTime: '8-10 min',
    allergens: ['Gluten', 'Eggs', 'Dairy'],
  },
]

// Color presets for theme customization
export const colorPresets = [
  { name: 'Classic Red', primary: '#C8102E', secondary: '#F4B223' },
  { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#06B6D4' },
  { name: 'Forest Green', primary: '#16A34A', secondary: '#84CC16' },
  { name: 'Royal Purple', primary: '#7C3AED', secondary: '#EC4899' },
  { name: 'Sunset Orange', primary: '#EA580C', secondary: '#FBBF24' },
  { name: 'Midnight Dark', primary: '#1E293B', secondary: '#6366F1' },
  { name: 'Rose Gold', primary: '#BE185D', secondary: '#F472B6' },
  { name: 'Earthy Brown', primary: '#78350F', secondary: '#D97706' },
]

// Font presets
export const fontPresets = [
  { name: 'Inter', value: 'Inter, system-ui, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Montserrat', value: 'Montserrat, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
]

// Admin statistics (appearance-focused, no financial data)
export const adminStats = {
  totalRestaurants: 156,
  activeMenus: 142,
  totalMenuItems: 4832,
  customThemes: 89,
  pendingApprovals: 12,
  recentUpdates: 28,
}

// Theme update history (for admin)
export const themeUpdateHistory = [
  {
    id: 'update-001',
    restaurantId: 'rest-001',
    restaurantName: 'Crispy Chicken House',
    changeType: 'Color Update',
    changedBy: 'Admin',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    details: 'Updated primary color from #C8102E to #DC2626',
  },
  {
    id: 'update-002',
    restaurantId: 'rest-002',
    restaurantName: 'Sakura Sushi Bar',
    changeType: 'Hero Section',
    changedBy: 'Restaurant Owner',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    details: 'Changed hero type from image to carousel',
  },
  {
    id: 'update-003',
    restaurantId: 'rest-003',
    restaurantName: 'Pizza Paradise',
    changeType: 'Layout Change',
    changedBy: 'Admin',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    details: 'Updated card style to glass effect',
  },
]
