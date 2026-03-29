# Seed Data Generator Documentation

## Overview

The seed data generator provides realistic mock data for development and testing of the Digital Menu application. All mock data has been removed from individual components and replaced with dynamically generated data from a centralized utility.

## Location

- **Seed Generator**: `src/utils/seedData.ts`
- **Store Users**: `src/store/useStore.ts` (uses `SEED_USERS`)

## Generated Data

### Users

The system generates 5 predefined users:

```
Admin Account:
- Email: admin@restaurant.com
- Password: admin123456
- Role: Admin

Restaurant Managers:
- Email: manager@crispy.com / Password: restaurant123
- Email: manager@sakura.com / Password: restaurant123
- Email: manager@pizza.com / Password: restaurant123
- Role: Restaurant

Customer:
- Email: customer@example.com
- Password: customer123
- Role: Customer
```

### Restaurants

3 fully configured restaurants are generated:

1. **Crispy Chicken Palace** (rest-001)
   - Cuisine: Fast Food, Chicken
   - Rating: 4.8/5 (324 reviews)
   - Theme: Red/Yellow with dark mode
   - Features: Free delivery, fast delivery, quality guaranteed

2. **Sakura Sushi House** (rest-002)
   - Cuisine: Japanese, Sushi
   - Rating: 4.9/5 (456 reviews)
   - Theme: Red/White with light mode
   - Features: Fresh daily, expert chefs, premium quality

3. **Pizza Paradise** (rest-003)
   - Cuisine: Italian, Pizza
   - Rating: 4.7/5 (287 reviews)
   - Theme: Green/White with dark mode
   - Features: Wood-fired oven, fresh ingredients, custom pizzas

### Menu Items

Each restaurant gets:
- **8 categories**: Appetizers, Burgers, Pizzas, Salads, Sushi, Sides, Desserts, Beverages
- **5-15 items per category** with randomized properties:
  - Random pricing ($5.99 - $24.99)
  - Random descriptions
  - Dietary tags (Vegetarian, Spicy)
  - Allergen information
  - Prep times
  - Customization options (Size, Sauce, etc.)
  - Images from Unsplash

### Orders

Generated customer orders include:
- Random order numbers and dates
- Multiple item combinations
- Various order statuses (pending, confirmed, preparing, ready, delivered)
- Estimated preparation times
- Total amounts ($15 - $100)

### Kitchen Orders

Generated kitchen display orders include:
- Table assignments
- Multiple items per order
- Status progression (queued → cooking → ready)
- Priority levels (normal, rush)
- Wait times

### Table Management

Generated table data includes:
- 12 tables with varying capacities (2, 4, 6, 8 seats)
- Random statuses (available, occupied, reserved, cleaning)
- Current orders for occupied tables
- Guest counts and duration tracking

### Cart Items

Generated cart items include:
- 2-5 random menu items
- Quantities
- Special notes and dietary requirements
- Images

## How to Use

### 1. Authentication

Login with any of the seed user credentials:

```typescript
// Example
Email: admin@restaurant.com
Password: admin123456
```

### 2. Generating Fresh Data

Each component that needs data imports from `seedData.ts`:

```typescript
import { 
  generateUsers,
  generateRestaurants,
  generateCategories,
  generateMenuItems,
  generateOrders,
  generateKitchenOrders,
  generateTables,
  generateCartItems
} from '@/utils/seedData'

// Use in components
const users = generateUsers()
const restaurants = generateRestaurants()
```

### 3. Component Updates

All pages have been updated to use seed data:

- **Cart** (`src/pages/customer/Cart.tsx`): Uses `generateCartItems()`
- **Orders** (Customer, `src/pages/customer/Orders.tsx`): Uses `generateOrders()`
- **Orders** (Restaurant, `src/pages/restaurant/Orders.tsx`): Uses `generateOrders()`
- **Kitchen Display** (`src/pages/restaurant/Kitchen.tsx`): Uses `generateKitchenOrders()`
- **Table Management** (`src/pages/restaurant/Tables.tsx`): Uses `generateTables()`

## Files Modified

1. **Created**: `src/utils/seedData.ts` - Central seed data generator
2. **Updated**: `src/store/useStore.ts` - Changed from `TEST_USERS` to `SEED_USERS`
3. **Updated**: `src/pages/auth/Login.tsx` - Uses `SEED_USERS`
4. **Updated**: `src/pages/customer/Cart.tsx` - Generates cart items dynamically
5. **Updated**: `src/pages/customer/Orders.tsx` - Generates orders dynamically
6. **Updated**: `src/pages/restaurant/Orders.tsx` - Generates orders dynamically
7. **Updated**: `src/pages/restaurant/Kitchen.tsx` - Generates kitchen orders dynamically
8. **Updated**: `src/pages/restaurant/Tables.tsx` - Generates tables dynamically

## Data Characteristics

### Randomization

- Prices are randomized but realistic ($2-$25 range)
- Quantities vary (1-3 items per order)
- Wait times are realistic (0-30 minutes)
- Dates use the past 7 days
- All statuses have realistic distributions

### Realism

- Restaurant themes use professional colors
- Font choices are modern (Poppins, Montserrat, etc.)
- Opening hours follow typical restaurant patterns
- Menu items have realistic pricing tiers
- Customizations (Size, Sauce) are relevant to dishes
- Contact information is properly formatted

## Integration with Backend

When connecting to a real backend:

1. Remove calls to seed data functions
2. Replace with API calls to your backend
3. The data structures already match the API interfaces in `src/api/admin.ts`
4. Use the same `User`, `Restaurant`, `MenuItem`, `Category` interfaces

## Future Enhancements

To extend the seed data:

1. Add more restaurants by modifying `generateRestaurants()`
2. Create restaurant-specific menu items
3. Add user preferences and order history
4. Implement seasonal menu variations
5. Add promotional codes and discounts

## Notes

- All data is generated fresh on component mount
- Data is not persisted (regenerates on refresh)
- Randomization ensures variety across sessions
- Images use Unsplash for realistic product photos
- Responsive design works with all generated data sizes
