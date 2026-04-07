/**
 * Seed Data Generator
 * Generates realistic mock data for development and testing
 */

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  type: string;
  logo: string;
  coverImage: string;
  description: string;
  tagline: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  minimumOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  openingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    borderRadius: "none" | "small" | "medium" | "large" | "full";
    cardStyle: "flat" | "elevated" | "bordered" | "glass";
    headerStyle: "solid" | "transparent" | "gradient";
    darkMode: boolean;
  };
  heroSection: {
    type: "image" | "video" | "carousel" | "split";
    title: string;
    subtitle: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText: string;
    ctaLink: string;
    overlayOpacity: number;
    alignment: "left" | "center" | "right";
    showSearch: boolean;
    featuredBadge?: string;
  };
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  icon: string;
  image: string;
  itemCount: number;
  sortOrder: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  tags: string[];
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  calories?: number;
  prepTime: string;
  allergens?: string[];
  ingredients?: string[];
  customizations?: {
    id: string;
    name: string;
    type: "single" | "multiple";
    required: boolean;
    options: {
      id: string;
      name: string;
      price: number;
    }[];
  }[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "restaurant" | "customer";
  restaurantId?: string;
  avatar?: string;
}

// Palette of predefined restaurants (kept for potential future use)
// const restaurantNames = [...]
// const cuisineTypes = [...]
// const colors = [...]
// const fonts = [...]

type SeedMenuItem = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSpicy: boolean;
  isVegetarian: boolean;
  calories: number;
  prepTime: string;
  ingredients?: string[];
};

const menuItems: SeedMenuItem[] = [
  {
    name: "Crispy Chicken Burger",
    description:
      "Golden fried chicken patty with fresh lettuce, tomato and special sauce",
    price: 9.99,
    category: "Burgers",
    image:
      "https://www.allrecipes.com/thmb/y4aIWGJJuw3_Alk_JGD9InuvUuQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(2994x905:2996x907)/AR-89268-triple-dipped-fried-chicken-beauty-2x1-2ece2beac2344ad68477c9ebd4c1f4d5.jpg",
    isSpicy: false,
    isVegetarian: false,
    calories: 450,
    prepTime: "10",
  },
  {
    name: "Spicy Wings",
    description: "Hot and crispy chicken wings with special spice blend",
    price: 7.99,
    category: "Appetizers",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
    isSpicy: true,
    isVegetarian: false,
    calories: 380,
    prepTime: "12",
  },
  {
    name: "Caesar Salad",
    description:
      "Fresh romaine lettuce with parmesan cheese and house-made dressing",
    price: 8.99,
    category: "Salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    isSpicy: false,
    isVegetarian: true,
    calories: 280,
    prepTime: "5",
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, basil and tomato sauce",
    price: 12.99,
    category: "Pizzas",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
    isSpicy: false,
    isVegetarian: true,
    calories: 520,
    prepTime: "15",
  },
  {
    name: "Sushi Roll Platter",
    description: "Assorted fresh sushi rolls with wasabi and ginger",
    price: 16.99,
    category: "Sushi",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    isSpicy: false,
    isVegetarian: false,
    calories: 380,
    prepTime: "10",
  },
  {
    name: "French Fries",
    description: "Golden crispy fries with sea salt",
    price: 4.49,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1585238341710-4dd0c06ff1be?w=400",
    isSpicy: false,
    isVegetarian: true,
    calories: 320,
    prepTime: "8",
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate cake with chocolate frosting",
    price: 6.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    isSpicy: false,
    isVegetarian: true,
    calories: 450,
    prepTime: "2",
  },
  {
    name: "Iced Tea",
    description: "Refreshing cold iced tea",
    price: 2.99,
    category: "Tea",
    image:
      "https://ourzestylife.com/wp-content/uploads/2025/05/Iced-Tea-Recipe-OurZestyLife-3.jpg",
    isSpicy: false,
    isVegetarian: true,
    calories: 120,
    prepTime: "2",
  },
  {
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection with herbs",
    price: 18.99,
    category: "Main Courses",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
    isSpicy: false,
    isVegetarian: false,
    calories: 320,
    prepTime: "20",
  },
  {
    name: "Pad Thai",
    description: "Traditional Thai stir-fried noodles with shrimp and peanuts",
    price: 11.99,
    category: "Asian",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400",
    isSpicy: true,
    isVegetarian: false,
    calories: 480,
    prepTime: "15",
  },
  {
    name: "Tacos al Pastor",
    description: "Mexican pork tacos with pineapple and cilantro",
    price: 9.49,
    category: "Mexican",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400",
    isSpicy: true,
    isVegetarian: false,
    calories: 350,
    prepTime: "12",
  },
  {
    name: "Pasta Carbonara",
    description: "Classic Italian pasta with pancetta, eggs and parmesan",
    price: 13.99,
    category: "Italian",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    isSpicy: false,
    isVegetarian: false,
    calories: 620,
    prepTime: "18",
  },
];
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^ (h >>> 16)) >>> 0;
  };
}

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPrice(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export function generateUsers(): User[] {
  return [
    {
      id: "user-admin-001",
      email: "admin@example.com",
      password: "password123",
      name: "Admin Manager",
      role: "admin",
      avatar:
        "C:\\Users\\user1\\Desktop\\app-digital-menu\\src\\images\\image0 (1).jpeg",
    },
    {
      id: "user-rest-001",
      email: "pizza@palace.com",
      password: "password123",
      name: "Pizza Palace Manager",
      role: "restaurant",
      restaurantId: "rest-001",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: "user-rest-002",
      email: "sushi@master.com",
      password: "password123",
      name: "Sushi Master Manager",
      role: "restaurant",
      restaurantId: "rest-002",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: "user-rest-003",
      email: "burger@heaven.com",
      password: "password123",
      name: "Burger Heaven Manager",
      role: "restaurant",
      restaurantId: "rest-003",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: "user-customer-001",
      email: "john@example.com",
      password: "password123",
      name: "John Doe",
      role: "customer",
      avatar:
        "https://images.unsplash.com/photo-1535713566543-abdb180e24ac?w=100&h=100&fit=crop",
    },
    {
      id: "user-customer-002",
      email: "jane@example.com",
      password: "password123",
      name: "Jane Smith",
      role: "customer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      id: "user-customer-003",
      email: "bob@example.com",
      password: "password123",
      name: "Bob Johnson",
      role: "customer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  ];
}

export function generateRestaurants(): Restaurant[] {
  /////////////////////////////////////////////////cover
  // High-quality unique restaurant images from Unsplash (food-only, no faces)
  const restaurantImages = [
    "https://cdn.prod.website-files.com/63e1602211f9df8c73321b01/643dc05c5a293e7c45b2e173_WhEFbLdwryLXGIXdGVIGaM6IstfsR93wCSx6EZZw.jpg", // kfc tunis
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJ5cMOZUqLmUP_xykwtnWmPQFo6-0gYns6A&s", // mcdonald tunis
    "https://res.cloudinary.com/grubhub/image/upload/d_search:browse-images:default.jpg/w_339,q_80,fl_lossy,dpr_2.0,c_fill,f_auto,h_156/vjvkobfhhwgjnrwg1tee", // 7deli
    "https://www.lcbo.com/content/dam/lcbo/Food%20&%20Drink/2021-P12/french-classics/2112-FindYourNew-5.2-IB1.jpg.transform/lcbo-enhancedcontent-desktop/image.jpg", // bistrot fr
    "https://casa-taco.com/wp-content/uploads/casa-taco-best-geo-city-mexican-restaurant-brisket-pork-beef-tacos.jpg", // casa tacos
    "https://storage.googleapis.com/mon-resto-halal/restaurants/9590985e-9c9e-4115-9ac8-7dac66e90837/thumb@1024_1ca3824d-4818-412a-88fc-c7526484ff17.jpeg", // dragon wok
    "https://blog.inivie.com/wp-content/uploads/2025/05/traditional-food-of-india.jpg", // bombay spice
    "https://www.2foodtrippers.com/wp-content/uploads/2021/01/Rigatoni-Amatriciana-in-White-Bowl-500x375.jpg", // pasta roma
    "https://images.squarespace-cdn.com/content/v1/60f976b72612757791a5df66/e140933c-983d-47a4-88ea-c56f103f5776/InCommon_0725_LizClayman_0212.jpg", // cafe momo
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9_ChvPYciYkT6Mo0kOqtWJZdm0hwiez1ZQ&s", // green vegan
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/ab/60/59/pho-with-medium-rare.jpg?w=900&h=500&s=1", // pho saigon
    "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/d4584424-c7a5-4c20-90eb-d63e68d3f2f4_Go-Biz_20230512_212208.jpeg", //el asador
    "https://sadlergates.co.uk/wp-content/uploads/2024/07/BBQ-Catering-Service.jpg", // bbq club
    "https://img.cdn4dd.com/p/fit=cover,width=1200,height=1200,format=auto,quality=90/media/photosV2/09e3d15c-af76-4dc5-9193-a39cdef9375d-retina-large.jpg", // tacos el rey
    "https://images.squarespace-cdn.com/content/v1/5a00e71a2278e7a804e532cf/aa4d50df-759e-43ec-9b7e-a9b15861a514/Lamb+Seekh+Kebab.jpg?format=2500w", // sultan kebab
    "https://media.hachette.fr/fit-in/750x488/10/2022-02/sans-titre-36.png", // la paela
    "https://tb-static.uber.com/prod/image-proc/processed_images/a1ed2f402aa54af7aa7ba4e865b67a50/4eed3468b168fc6e31dff0bb81a347bc.jpeg", // open flame pizza
    "https://takestwoeggs.com/wp-content/uploads/2023/06/Thai-Mango-Salad-Recipe-Takestwoeggs-sq.jpg", // mango thai
    "https://www.kikkoman.fr/fileadmin/user_upload/kikkoman.eu/Food-News/EU_make-your-own-sushi/sushi-kakkoii.jpeg", // eden sushi
    "https://www.seriouseats.com/thmb/pUE9Dw4RjWKEG4JED7whaHoIzNg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250523-SEA-ThickandJuicyCheeseburgers-LorenaMasso-HERO-68563a45a4184a0e82c5a8b9f68a719d.jpg", // urabn burger
    "https://www.discoverwalks.com/blog/wp-content/uploads/2017/02/french-crepe-big.jpg", // parisienne crepes
    "https://www.allrecipes.com/thmb/gErFllALd5ieWLGDOlN_S9uAsyU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/52407-chicken-shawarma-VAT-003-4x3-01-3189bab443d14bf282ffcc3b87bcf55a.jpg", // shawarlma corner
    "https://alchemiq.com/wp-content/uploads/2022/11/Mediterranean-Food-1.jpg", // mediterraneo
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfaBJggdhs7Ww8n_l3vPNr_fLaXybq8siIg&s", // jane garden
    "https://images.squarespace-cdn.com/content/v1/5e484ab628c78d6f7e602d73/569bd57b-b162-48b7-bf87-0d25f3513525/traditional-mexican-foods-min.jpeg", // la taqueria
    "https://images.immediate.co.uk/production/volatile/sites/30/2024/01/California-roll-a87199c.jpg?quality=90&resize=708,643", // sushi and beyond
    "https://pekis.net/sites/default/files/styles/social_share_1200x628/public/2025-04/doner_kebab_wrap.webp?itok=SSydbDEj", // kebbab house
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyiq7c2hBa_W6YjCDVO_4YhuNU0jdqNjALfw&s", // mama italia
    "https://blogsakura.com.br/wp-content/uploads/2021/11/Blog1_01NOV21-1024x558.jpg", // sushi oasis
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32rBN2sphLJe3xBCsTGBAw2yKxkMCzU0TcQ&s", // the dumpling spot
    "https://perfectdailygrind.com/wp-content/uploads/2019/09/Low-Waste-1.png", //brew & bites
  ];

  const base: Restaurant[] = [
    {
      id: "rest-001",
      name: "Crispy Chicken Palace",
      slug: "crispy-chicken-palace",
      type: "Burgers",
      logo: "https://t3.ftcdn.net/jpg/03/55/06/02/360_F_355060264_3MdlxU8wOKQ1OyK9Mx7oDRxtctQZEjJ8.jpg",
      coverImage:
        "https://www.allrecipes.com/thmb/y4aIWGJJuw3_Alk_JGD9InuvUuQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(2994x905:2996x907)/AR-89268-triple-dipped-fried-chicken-beauty-2x1-2ece2beac2344ad68477c9ebd4c1f4d5.jpg",
      description:
        "Experience the best fried chicken in town with our secret recipe",
      tagline: "Finger-licking good since 2015",
      cuisine: ["Fast Food", "Chicken"],
      rating: 4.8,
      reviewCount: 324,
      deliveryTime: "20-30",
      minimumOrder: 15,
      deliveryFee: 2.99,
      isOpen: true,
      openingHours: [
        { day: "Monday", open: "10:00", close: "23:00" },
        { day: "Tuesday", open: "10:00", close: "23:00" },
        { day: "Wednesday", open: "10:00", close: "23:00" },
        { day: "Thursday", open: "10:00", close: "23:00" },
        { day: "Friday", open: "10:00", close: "00:00" },
        { day: "Saturday", open: "11:00", close: "00:00" },
        { day: "Sunday", open: "11:00", close: "22:00" },
      ],
      contact: {
        phone: "(+216) 71 200 001",
        email: "contact@crispy.com",
        address: "Avenue Habib Bourguiba, Tunis",
      },
      theme: {
        primaryColor: "#FF6B6B",
        secondaryColor: "#FFE66D",
        accentColor: "#FF8C42",
        fontFamily: "Poppins",
        borderRadius: "medium",
        cardStyle: "elevated",
        headerStyle: "solid",
        darkMode: true,
      },
      heroSection: {
        type: "image",
        title: "Welcome to Crispy Chicken Palace",
        subtitle: "Taste the difference of quality",
        backgroundImage:
          "https://images.unsplash.com/photo-1626082927389-6cd097cdc626?w=1200&h=500&fit=crop",
        ctaText: "Order Now",
        ctaLink: "/menu",
        overlayOpacity: 0.4,
        alignment: "center",
        showSearch: true,
        featuredBadge: "Top Rated 🌟",
      },
      features: [
        "Free Delivery on Orders $50+",
        "Fast Delivery",
        "Quality Guaranteed",
        "24/7 Support",
      ],
    },
    {
      id: "rest-002",
      name: "Sakura Sushi House",
      slug: "sakura-sushi-house",
      type: "Sushi",
      logo: "https://cdn.dribbble.com/userupload/41999842/file/original-a6c3fc3a52da107a305d9b94ddd2a3c6.png",
      coverImage:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=520&fit=crop",
      description:
        "Fresh, authentic Japanese sushi crafted daily by master chefs",
      tagline: "Authentic taste from Japan",
      cuisine: ["Japanese", "Sushi"],
      rating: 4.9,
      reviewCount: 456,
      deliveryTime: "25-35",
      minimumOrder: 20,
      deliveryFee: 3.99,
      isOpen: true,
      openingHours: [
        { day: "Monday", open: "11:00", close: "22:00" },
        { day: "Tuesday", open: "11:00", close: "22:00" },
        { day: "Wednesday", open: "11:00", close: "22:00" },
        { day: "Thursday", open: "11:00", close: "22:00" },
        { day: "Friday", open: "11:00", close: "23:30" },
        { day: "Saturday", open: "12:00", close: "23:30" },
        { day: "Sunday", open: "12:00", close: "22:00" },
      ],
      contact: {
        phone: "(+216) 71 200 002",
        email: "hello@sakura-sushi.tn",
        address: "Rue de la Liberté, Tunis",
      },
      theme: {
        primaryColor: "#E91E63",
        secondaryColor: "#FFC107",
        accentColor: "#4CAF50",
        fontFamily: "Montserrat",
        borderRadius: "medium",
        cardStyle: "glass",
        headerStyle: "gradient",
        darkMode: false,
      },
      heroSection: {
        type: "image",
        title: "Sakura Sushi House",
        subtitle: "Taste the sea with every roll",
        backgroundImage:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
        ctaText: "Browse Menu",
        ctaLink: "/menu",
        overlayOpacity: 0.42,
        alignment: "center",
        showSearch: true,
        featuredBadge: "Chef Nitro🔥",
      },
      features: [
        "Daily Fresh Fish",
        "Premium Quality",
        "Super Fast Delivery",
        "Healthy Choices",
      ],
    },
  ];

  const extra: [string, string[]][] = [
    ["KFC Express", ["Fast Food", "Chicken"]],
    ["McDonald’s Tunis", ["Fast Food", "Burgers"]],
    ["7 Eleven Deli", ["Convenience", "Snacks"]],
    ["Le Bistrot Français", ["French", "Gourmet"]],
    ["Casa Tacos", ["Mexican", "Tacos"]],
    ["Dragon Wok", ["Chinese", "Noodles"]],
    ["Bombay Spice", ["Indian", "Curry"]],
    ["Pasta Roma", ["Italian", "Pasta"]],
    ["Café Momo", ["Café", "Brunch"]],
    ["Green Vegan", ["Vegan", "Healthy"]],
    ["Pho Saigon", ["Vietnamese", "Soup"]],
    ["El Asador", ["Grill", "Steak"]],
    ["BBQ Club", ["Barbecue", "American"]],
    ["Tacos El Rey", ["Mexican", "Burritos"]],
    ["Sultan Kebab", ["Middle Eastern", "Kebab"]],
    ["La Paella", ["Spanish", "Seafood"]],
    ["Open Flame Pizza", ["Italian", "Pizza"]],
    ["Mango Thai", ["Thai", "Spicy"]],
    ["Eden Sushi", ["Sushi", "Japanese"]],
    ["Urban Burger", ["Burgers", "Fast Food"]],
    ["Parisienne Crêpes", ["French", "Desserts"]],
    ["Shawarma Corner", ["Middle Eastern", "Street Food"]],
    ["Mediterraneo", ["Mediterranean", "Salad"]],
    ["Jade Garden", ["Chinese", "Dim Sum"]],
    ["La Taqueria", ["Mexican", "Street Food"]],
    ["Sushi & Beyond", ["Japanese", "Sushi"]],
    ["Kebab House", ["Turkish", "Kebab"]],
    ["Mama Italia", ["Italian", "Family"]],
    ["Sushi Oasis", ["Sushi", "Seafood"]],
    ["The Dumpling Spot", ["Chinese", "Dumplings"]],
    ["Brew & Bites", ["Cafe", "Sandwiches"]],
  ];

  const restaurantLogos = [
    ////logo//////////////////////////////////////////////////////////////////////////////////////////////////
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1IvitoAZ2HtmEjx7fLcJ1ny9cIfAPSatgBA&s", // kfc
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsAoTpxWSYcI2DsdvHLbvii8MjOHMH2RY-dg&s", // mcdon tuni
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRF9qAR8NhjFRPSXTYzsMZhCZ1NgSA-UDxg&s", // 711
    "https://png.pngtree.com/template/20191203/ourmid/pngtree-coffee-logo-design-vector-image_337940.jpg", // bistrot fr
    "https://static.vecteezy.com/ti/vecteur-libre/p1/6926212-tacos-logo-illustrationle-vectoriel.jpg", // casa tacos
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVf_2ExvSM_CqG-s4ijGORKTNE4-i75yXKdg&s", //dragon wok
    "https://img.freepik.com/premium-vector/indian-cuisine-spices-icon-with-culinary-seasoning_8071-9904.jpg?semt=ais_hybrid&w=740&q=80", // bombay spice
    "https://thumbs.dreamstime.com/b/italian-restaurant-logo-pasta-fork-emblem-modern-design-showcases-vector-perfect-branding-pizzeria-cafe-398083030.jpg", // pasta roma
    "https://static.vecteezy.com/ti/vecteur-libre/p1/2412377-cafe-tasse-logo-coffee-shop-vector-icon-design-gratuit-vectoriel.jpg", // cafe momo
    "https://static.vecteezy.com/system/resources/previews/006/484/309/non_2x/vegan-restaurant-logo-on-white-background-free-vector.jpg", // green vegan
    "https://www.shutterstock.com/image-vector/pho-noodles-premium-vector-best-260nw-2275949709.jpg", // pho saigon
    "https://static.vecteezy.com/system/resources/previews/065/692/926/non_2x/steak-with-fire-logo-on-white-background-barbecue-restaurant-icon-vector.jpg", //el asador
    "https://img.freepik.com/premium-vector/vector-graphic-bbq-logo-design-template_600800-597.jpg", //bbq club
    "https://t4.ftcdn.net/jpg/06/19/60/93/360_F_619609350_455Y1dviYuoomOZ9hiOdO71NxnlLQehC.jpg", // tacos el rey
    "https://img.freepik.com/vecteurs-premium/illustration-vectorielle-logo-kebab_518759-211.jpg", // sultan kebab
    "https://img.freepik.com/premium-vector/traditional-spanish-paella-food-isolated-white-background_575838-1424.jpg?semt=ais_hybrid&w=740&q=80", // la paella
    "https://img.pikbest.com/png-images/pizza-logo-vector-graphic-element_1772934.png!sw800", // open flame pizza
    "https://img.freepik.com/premium-vector/thailand-cuisine-restaurant-meal-menu-icon-sign_8071-36807.jpg", // mango thai
    "https://png.pngtree.com/png-clipart/20230922/original/pngtree-sushi-logo-free-vector-sushi-salmon-restaurant-vector-png-image_12825763.png", // eden sushi
    "https://img.freepik.com/premium-vector/burger-vector-illustration-burger-logo-design_921448-1009.jpg", //urban burger
    "https://t4.ftcdn.net/jpg/06/21/13/45/360_F_621134537_3v1tWgE8SHwcUWTNxOo11I8Dwen9eaW0.jpg", // parisienne crepes
    "https://img.freepik.com/free-vector/hand-drawn-shawarma-logo-template_23-2149540546.jpg", // shawarma corner
    "https://s.tmimgcdn.com/scr/800x500/392100/oil-olive-icon-template-logo-vector-v18_392187-original.jpg", // mediterraneo
    "https://media.istockphoto.com/id/1295890098/vector/red-noodle-logo.jpg?s=612x612&w=0&k=20&c=8a_Y5J3rINNbE-piGPUCfRPhh_YFFUSh2ngDfXU7-7E=", //jade garden
    "https://thumbs.dreamstime.com/b/mexican-restaurant-logo-design-sombrero-chili-pepper-text-vibrant-vector-illustration-featuring-graphic-398083383.jpg", //la taqueria
    "https://us.123rf.com/450wm/butenkow/butenkow1608/butenkow160800750/61573925-sushi-logo-design-template-vector-illustration-of-icon.jpg", // sushi & beyond
    "https://img.freepik.com/premium-vector/kebab-logo-design-creative-idea-label-sticker-with-circle-shape_393879-3524.jpg?semt=ais_incoming&w=740&q=80", // kebab house
    "https://t4.ftcdn.net/jpg/02/96/41/15/360_F_296411524_TiYhJcTm7ffumH70fm3OPxNpWDIh5TqP.jpg", // mama italia
    "https://thumbs.dreamstime.com/b/sushi-japon-vecteur-d-alimentation-ic%C3%B4ne-design-alimentaire-illustration-menu-restaurant-380805734.jpg", // sushi oasis
    "https://www.shutterstock.com/image-vector/dim-sum-red-chopsticks-circle-260nw-1463633477.jpg", // the dumpling spot
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHms6k4D33CwtIA6Bhwt2jzsRxOq8T3kvCQ&s", // brew & bites
  ];

  const generated: Restaurant[] = extra.map((entry, idx) => {
    const [name, cuisine] = entry;
    const id = `rest-${(idx + 3).toString().padStart(3, "0")}`;
    const imageIndex = idx % restaurantImages.length;
    const logoIndex = idx % restaurantLogos.length;

    // Determine restaurant type based on name
    let type = "Burgers";
    if (
      name.includes("Pizza") ||
      name.includes("Pasta") ||
      name.includes("Italia")
    )
      type = "Pizza";
    else if (name.includes("Sushi")) type = "Sushi";
    else if (
      name.includes("Burger") ||
      name.includes("Chicken") ||
      name.includes("KFC") ||
      name.includes("McDonald") ||
      name.includes("BBQ")
    )
      type = "Burgers";
    else if (
      name.includes("Café") ||
      name.includes("Deli") ||
      name.includes("Crêpes") ||
      name.includes("Brew") ||
      name.includes("Dumpling")
    )
      type = "Cafes";

    return {
      id,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").replace(/['']/g, ""),
      type,
      logo: restaurantLogos[logoIndex],
      coverImage: restaurantImages[imageIndex],
      description: `Enjoy delicious ${cuisine.join(" & ")} favorites with fast delivery and trusted quality.`,
      tagline: `${cuisine.join(" & ")} done right`,
      cuisine,
      rating: Number((4.2 + Math.random() * 0.7).toFixed(1)),
      reviewCount: 80 + Math.floor(Math.random() * 520),
      deliveryTime: `${15 + Math.floor(Math.random() * 15)}-${25 + Math.floor(Math.random() * 15)}`,
      minimumOrder: 10 + Math.floor(Math.random() * 20),
      deliveryFee: Number((1.5 + Math.random() * 3).toFixed(2)),
      isOpen: Math.random() > 0.1,
      openingHours: [
        { day: "Monday", open: "10:00", close: "23:00" },
        { day: "Tuesday", open: "10:00", close: "23:00" },
        { day: "Wednesday", open: "10:00", close: "23:00" },
        { day: "Thursday", open: "10:00", close: "23:00" },
        { day: "Friday", open: "10:00", close: "00:00" },
        { day: "Saturday", open: "11:00", close: "00:00" },
        { day: "Sunday", open: "11:00", close: "22:00" },
      ],
      contact: {
        phone: `(+216) 71 2${String(100 + idx).slice(1)}${Math.floor(Math.random() * 90) + 10}`,
        email: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@digimenu.tn`,
        address: `${10 + idx} Rue de la Paix, Tunis, Tunisia`,
      },
      theme: {
        primaryColor: "#4F46E5",
        secondaryColor: "#10B981",
        accentColor: "#F59E0B",
        fontFamily: "Inter",
        borderRadius: "medium",
        cardStyle: "elevated",
        headerStyle: "solid",
        darkMode: false,
      },
      heroSection: {
        type: "image",
        title: name,
        subtitle: "Fast delivery, great taste",
        backgroundImage: restaurantImages[imageIndex],
        ctaText: "View Menu",
        ctaLink: "/menu",
        overlayOpacity: 0.38,
        alignment: "center",
        showSearch: false,
      },
      features: [
        "Fast Delivery",
        "Top Quality",
        "Easy Ordering",
        "Mobile Payments",
      ],
    } as Restaurant;
  });

  return [...base, ...generated];
}

export function generateCategories(restaurantId: string): Category[] {
  // Global categories across all restaurants
  const categories = ["Burgers", "Pizzas", "Sushi", "Cafes"];

  const seed = mulberry32(xmur3(restaurantId)());
  const categoryImages = [
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1562967916-eb82221dfb22?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561404?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1543357480-c2222e5cc0f7?auto=format&fit=crop&w=400&q=80",
  ];

  return categories.map((cat, idx) => ({
    id: `cat-${restaurantId}-${idx}`,
    name: cat,
    nameAr: cat, // Add Arabic translation
    description: `Discover our delicious ${cat.toLowerCase()}`,
    icon: "🍽️",
    image: categoryImages[idx % categoryImages.length],
    itemCount: 5 + Math.floor(seed() * 11),
    sortOrder: idx,
  }));
}

export function generateMenuItems(restaurantId: string): MenuItem[] {
  const categories = generateCategories(restaurantId);
  const seed = mulberry32(xmur3(restaurantId)());

  // Keep only target categories and avoid duplicates (no repeated Carbonara, Salads, etc.)
  const allowedCategories = categories.map((c) => c.name);
  const filteredItems = menuItems
    .map((item) => {
      if (item.category === "Beverages") return { ...item, category: "Tea" };
      return item;
    })
    .filter((item) => allowedCategories.includes(item.category));

  const uniqueItems = Array.from(
    new Map(
      filteredItems.map((item) => [item.name.toLowerCase(), item]),
    ).values(),
  );

  const maxItems = Math.min(uniqueItems.length, 36);
  const selectedItems = uniqueItems.slice(0, maxItems);

  return selectedItems.map((baseItem, i) => {
    const category = categories.find((cat) => cat.name === baseItem.category);
    const image = `${baseItem.image}?sig=${i}-${restaurantId}`;

    return {
      id: `item-${restaurantId}-${baseItem.name.replace(/[^a-zA-Z0-9]/g, "-")}-${i}`,
      categoryId: category ? category.id : categories[0].id,
      name: baseItem.name,
      nameAr: baseItem.name,
      description: baseItem.description,
      descriptionAr: baseItem.description,
      price: 5.99 + Math.round(seed() * 1900) / 100,
      originalPrice:
        seed() > 0.7 ? 20 + Math.round(seed() * 2000) / 100 : undefined,
      image,
      images: [image],
      ingredients: baseItem.ingredients || [
        "Tomato",
        "Cheese",
        "Olive oil",
        "Seasonal herbs",
        "Garlic",
      ],
      tags: ["Popular", "Fresh", "New"].filter(() => seed() > 0.55),
      isAvailable: seed() > 0.1,
      isPopular: seed() > 0.6,
      isNew: seed() > 0.7,
      isSpicy: baseItem.isSpicy || seed() > 0.7,
      isVegetarian: baseItem.isVegetarian || seed() > 0.7,
      calories: baseItem.calories || 200 + Math.floor(seed() * 400),
      prepTime: baseItem.prepTime,
      allergens: ["Dairy", "Gluten", "Nuts"].filter(() => seed() > 0.7),
      customizations:
        seed() > 0.6
          ? [
              {
                id: `custom-${i}-1`,
                name: "Size",
                type: "single" as const,
                required: true,
                options: [
                  { id: "size-s", name: "Small", price: 0 },
                  { id: "size-m", name: "Medium", price: 1.99 },
                  { id: "size-l", name: "Large", price: 3.99 },
                ],
              },
              {
                id: `custom-${i}-2`,
                name: "Sauce",
                type: "single" as const,
                required: false,
                options: [
                  { id: "sauce-mayo", name: "Mayo", price: 0 },
                  { id: "sauce-spicy", name: "Spicy Mayo", price: 0.5 },
                  { id: "sauce-garlic", name: "Garlic Sauce", price: 0.5 },
                ],
              },
            ]
          : undefined,
    };
  });
}

export function generateOrders() {
  const statuses: Array<
    "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled"
  > = ["pending", "confirmed", "preparing", "ready", "delivered"];

  const orders = [];

  for (let i = 0; i < 20; i++) {
    orders.push({
      id: `order-${i}`,
      orderNumber: `#ORD-2024-${String(1000 + i).padStart(3, "0")}`,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      time: `${String(Math.floor(Math.random() * 24)).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
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
    });
  }

  return orders;
}

export function generateKitchenOrders() {
  const statuses: Array<"queued" | "cooking" | "ready"> = [
    "queued",
    "cooking",
    "ready",
  ];
  const priorities: Array<"normal" | "rush"> = ["normal", "rush"];

  const orders = [];

  for (let i = 0; i < 10; i++) {
    orders.push({
      id: `#${2840 + i}`,
      table: `Table ${randomInt(1, 12)}`,
      items: Array.from({ length: randomInt(1, 3) }, () => ({
        name: randomElement(menuItems).name,
        quantity: randomInt(1, 2),
        notes: Math.random() > 0.7 ? "No onions" : undefined,
      })),
      status: randomElement(statuses),
      priority: randomElement(priorities),
      waitTime: randomInt(0, 30),
    });
  }

  return orders;
}

export function generateTables() {
  const tables = [];
  const statuses: Array<"available" | "occupied" | "reserved" | "cleaning"> = [
    "available",
    "occupied",
    "reserved",
    "cleaning",
  ];

  for (let i = 1; i <= 12; i++) {
    const status = randomElement(statuses);
    tables.push({
      id: i,
      number: String(i),
      capacity: randomElement([2, 4, 6, 8]),
      status,
      currentOrder:
        status === "occupied"
          ? {
              id: `#${2840 + i}`,
              guests: randomInt(1, 8),
              total: randomPrice(30, 150),
              duration: randomInt(5, 60),
            }
          : undefined,
    });
  }

  return tables;
}

export function generateCartItems() {
  return Array.from({ length: randomInt(2, 5) }, (_, i) => ({
    id: String(i + 1),
    name: randomElement(menuItems).name,
    price: randomPrice(5, 25),
    quantity: randomInt(1, 3),
    image: randomElement(menuItems).image,
    notes: Math.random() > 0.6 ? "Special request" : undefined,
    dietary: Math.random() > 0.7 ? ["Vegetarian"] : undefined,
  }));
}
