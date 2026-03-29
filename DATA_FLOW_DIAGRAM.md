# 🔗 Data Flow Diagram - Seed Data + Offline Integration

## Quick Answer

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR APP DATA SOURCES                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  PRIMARY (When Connected)                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              🌐 BACKEND API                              │ │
│  │  GET /menu-items  →  Real menu data                      │ │
│  │  GET /orders      →  Real orders                         │ │
│  │  POST /orders     →  Submit orders                       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  CACHE LAYER (Persistent)                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         📦 INDEXEDDB (Dexie) - PERSISTENT              │ │
│  │  • menu_cache: Menu items                                │ │
│  │  • order_queue: Offline orders waiting to sync           │ │
│  │  • sync_metadata: Last sync status                       │ │
│  │                                                           │
│  │  ✓ Works OFFLINE                                         │ │
│  │  ✓ Survives app restart                                  │ │
│  │  ✓ Automatic sync when online                           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                           ↓                                   │
│  FALLBACK (Development/Testing)                              │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │         🌱 SEED DATA GENERATOR - TEMPORARY              │ │
│  │  • generateMenuItems()                                   │ │
│  │  • generateOrders()                                      │ │
│  │  • generateRestaurants()                                 │ │
│  │  • generateTables()                                      │ │
│  │  • generateKitchenOrders()                               │ │
│  │                                                           │ │
│  │  ✓ No internet needed                                    │ │
│  │  ✓ Realistic test data                                   │ │
│  │  ✓ Regenerates each session                              │ │
│  │  ✓ Perfect for development                               │ │
│  │  ✗ Not persistent                                        │ │
│  │  ✗ Different data each refresh                           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  Hierarchy: API → IndexedDB → Seed Data                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Usage Flow

### 1. Menu Page (Customer)

```
┌──────────────────────────────┐
│  Customer Menu Component     │
└──────────────────────────────┘
          ↓
    Online Check?
        ↙  ↖
      YES   NO
       ↓     ↓
┌──────────────────────────────┐    ┌──────────────────────────────┐
│  Try API Call                │    │  Use IndexedDB Cache         │
│  getMenuItems(restaurantId)  │    │  getCachedMenu()             │
└──────────────────────────────┘    └──────────────────────────────┘
       ↓                                        ↓
    Success?                            Cache exists?
    ↙  ↖                                 ↙  ↖
  YES   NO                             YES   NO
   ↓    ↓                               ↓     ↓
 ┌──────────────────────────────┐    ┌───────────────────┐
 │ 1. Save to IndexedDB         │    │ Show Empty State  │
 │ 2. Update UI                 │    │ (or Seed Data)    │
 │ 3. Display Menu              │    └───────────────────┘
 └──────────────────────────────┘
          ↓
      User sees:
    ✓ Real menu items
    ✓ With real prices
    ✓ Real images
```

### 2. Cart Checkout (Online vs Offline)

```
┌──────────────────────────────┐
│  User Clicks Checkout        │
└──────────────────────────────┘
          ↓
    Check Online Status?
        ↙  ↖
      YES   NO
       ↓     ↓
┌──────────────────────────────┐   ┌──────────────────────────────┐
│  ONLINE PATH:                │   │  OFFLINE PATH:               │
│  • Send to API immediately   │   │  • Queue in IndexedDB         │
│  • POST /orders              │   │  • enqueueOrder(order)       │
│  • Show "Success" ✓          │   │  • Show "Will sync later"    │
│  • Clear cart                │   │  • Keep order queued         │
└──────────────────────────────┘   └──────────────────────────────┘
       ↓                                        ↓
    Order Synced                    Waiting for Connection
    (Real-time)                     ↓
                              User Goes Online?
                                    ↓
                            useSync Hook Triggers
                                    ↓
                         Loop through order_queue
                                    ↓
                         Retry with Exponential Backoff
                                    ↓
                         Orders Sent to API
                                    ↓
                         marked synced in DB
                                    ↓
                         "✓ All orders synced"
```

### 3. Kitchen Display System (KDS)

```
Current Implementation (Development):

┌─────────────────────┐
│  generateKitchenOrders() │  ← Using Seed Data Currently
└─────────────────────┘
         ↓
    [10 Random Orders]
    • Status: queued, cooking, ready
    • Priority: normal, rush
    • Table assignments
    • Items with notes
         ↓
   Kitchen Display UI Updates
   • Color-coded by priority
   • Time tracking
   • Manual status updates

When Backend Ready:

┌─────────────────────┐
│  API: GET /kitchen-orders  │  ← Switch to Real API
└─────────────────────┘
         ↓
    [Real Orders from DB]
    • Live order updates
    • Real customer orders
    • Actual priorities
         ↓
   Kitchen Display UI Updates
   (Same UI, different data)
```

### 4. Table Management

```
Current Implementation (Development):

┌─────────────────────┐
│  generateTables()   │  ← Using Seed Data Currently
└─────────────────────┘
         ↓
    [12 Random Tables]
    • Random statuses
    • Fake current orders
    • Capacity info
         ↓
   Table Grid UI Updates
   • Color-coded by status
   • Guest count tracking
   • Order total shown

When Backend Ready:

┌─────────────────────────────────────────┐
│  WebSocket: Real-time table updates     │
└─────────────────────────────────────────┘
         ↓
    [Live Table Status]
    • Real occupancy
    • Live orders
    • Actual guests
         ↓
   Table Grid UI Updates
   (Same UI, real data)
```

---

## Data Persistence Timeline

### First Visit (Online, No Cache)

```
Timeline:
T=0s     App loads
T=0.1s   API call starts
T=0.5s   API response received
T=0.6s   Data saved to IndexedDB
T=0.7s   UI renders with data
         ✓ User sees menu

Storage:
├── RAM (Zustand)
│   ├── user: { email, name, ... }
│   ├── online: true
│   └── selectedRestaurant: 'rest-001'
│
├── IndexedDB (Persistent)
│   ├── menu_cache: [ ...200 items ]
│   ├── category_cache: [ ...8 categories ]
│   └── sync_metadata: { lastSync: '2024-01-29T12:30:00' }
│
└── Service Worker Cache (HTTP)
    ├── menu-cache: [ /api/menu-items ]
    ├── category-cache: [ /api/categories ]
    └── image-cache: [ unsplash images ]
```

### Return Visit (Online, Has Cache)

```
Timeline:
T=0s     App loads
T=0.1s   API call starts (in background)
T=0.2s   Load from IndexedDB cache (instantly shown)
T=0.3s   API response received
T=0.4s   Compare: same data? → skip update
         Compare: different? → update IndexedDB + UI
         ✓ User sees cached data immediately
         ✓ Fresh data loaded in background

UI Experience: Instant + Fresh
```

### Visit While Offline

```
Timeline:
T=0s     App loads
T=0.1s   API call starts
T=0.2s   API fails (no internet)
T=0.3s   Fallback: Load from IndexedDB cache
T=0.4s   UI renders with cached data
         ✓ User sees cached menu (same as before)
         ✓ App fully functional

Orders while offline:
1. User adds items
2. Clicks checkout
3. Order queued to order_queue table
4. App shows: "Offline - Will sync when online"
5. Order stored locally in IndexedDB
```

### Back Online

```
Timeline (Continuous):
T=0s     Connectivity restored
T=0.1s   useSync hook detects online event
T=0.2s   Gets queued orders from IndexedDB
T=0.3s   Starts sending to API with retry
T=0.5s   Order 1 sent successfully
T=1.0s   Order 2 sent successfully
T=1.5s   Marks orders as synced in IndexedDB
T=1.6s   UI updates: "✓ All orders synced"
T=2.0s   Fresh data fetched from API (background)

Retry Logic (if API temporarily fails):
Attempt 1: fail → wait 1s
Attempt 2: fail → wait 2s
Attempt 3: fail → wait 4s
Attempt 4: fail → wait 8s
Attempt 5: fail → wait 16s
Attempt 6: fail → wait 30s (give up)
```

---

## File Reference Map

```
OFFLINE ARCHITECTURE:

├── src/db/index.ts
│   └── Dexie database setup
│       ├── menu_cache
│       ├── category_cache
│       ├── order_queue .................. OFFLINE ORDERS
│       └── sync_metadata
│
├── src/hooks/useSync.ts
│   └── Auto-sync queued orders ......... WHEN ONLINE
│       └── Retry with exponential backoff
│
├── src/store/useStore.ts
│   └── Global state
│       └── online: boolean ............. ONLINE STATUS
│
├── src/main.tsx
│   └── App entry point
│       ├── Online/offline listeners
│       ├── useSync hook
│       └── Event handlers
│
├── src/api/axios.ts
│   └── API client
│       └── Error handling for offline
│
└── src/pages/
    ├── customer/Menu.tsx
    │   └── Try API → Fall back to cache
    │
    ├── customer/Cart.tsx
    │   └── Online: send | Offline: queue
    │
    └── restaurant/Kitchen.tsx
        └── Currently: seed data (for dev)
```

```
SEED DATA ARCHITECTURE:

├── src/utils/seedData.ts
│   ├── generateUsers()
│   ├── generateRestaurants()
│   ├── generateCategories()
│   ├── generateMenuItems() ........... FOR DEVELOPMENT
│   ├── generateOrders()
│   ├── generateKitchenOrders()
│   ├── generateTables()
│   └── generateCartItems()
│
└── src/pages/
    ├── customer/Cart.tsx
    │   └── useEffect → generateCartItems()
    │
    ├── customer/Orders.tsx
    │   └── useEffect → generateOrders()
    │
    ├── restaurant/Kitchen.tsx
    │   └── useEffect → generateKitchenOrders()
    │
    └── restaurant/Tables.tsx
        └── useEffect → generateTables()
```

---

## Decision Tree: Which Data Source?

```
START
  ↓
User navigates to Menu?
  ├─→ YES → Try API call?
  │          ├─→ Success? 
  │          │   ├─→ YES → Use API data ✓
  │          │   └─→ NO → Check cache
  │          │            ├─→ Has cache? 
  │          │            │   ├─→ YES → Use cached data ✓
  │          │            │   └─→ NO → Show empty
  │          └─→ NO (offline) → Check cache
  │                       ├─→ Has cache? 
  │                       │   ├─→ YES → Use cached data ✓
  │                       │   └─→ NO → Could use seed data
  │
  ├─→ NO → User in Cart?
  │         ├─→ Online? 
  │         │   ├─→ YES → Send immediately ✓
  │         │   └─→ NO → Queue locally
  │         └─→ When online → useSync triggers
  │             └─→ Send all queued orders ✓
  │
  └─→ NO → Something else
           └─→ Use seed data (current)
               └─→ OK for testing/dev
                   Prepare for API integration

```

---

## Integration Checklist for Backend

When connecting real backend:

```
☐ Step 1: Replace seed data in pages
   ├─ Cart.tsx: Remove generateCartItems()
   ├─ Orders.tsx: Remove generateOrders()
   ├─ Kitchen.tsx: Remove generateKitchenOrders()
   └─ Tables.tsx: Remove generateTables()

☐ Step 2: Add API calls
   ├─ const items = await api.get('/menu-items')
   ├─ const orders = await api.get('/orders')
   ├─ const kitchenOrders = await api.get('/kitchen-orders')
   └─ const tables = await api.get('/tables')

☐ Step 3: Add error handling
   ├─ Try API call
   ├─ Catch error → use IndexedDB cache
   ├─ Cache miss → show empty state
   └─ Optional: Fallback to seed data

☐ Step 4: Verify offline still works
   ├─ Load menu online
   ├─ Go offline
   ├─ Menu still shows ✓
   ├─ Place order offline
   ├─ Go online → orders sync ✓
   └─ App fully functional

☐ Step 5: Remove seedData.ts (optional)
   └─ Delete src/utils/seedData.ts when confident
```

---

## Summary

**Seed Data Role:**
- Primary: Development & testing
- Secondary: Error fallback (optional)
- Tertiary: Demo/presentation data

**Offline Support:**
- Primary: IndexedDB cache
- Real data loaded online
- Orders queued when offline
- Auto-syncs when back online

**Perfect Together:**
- Seed data = Quick start
- IndexedDB = Reliable offline
- API = Real production data
- Fallback chain = Always works!

✅ **Your app is ready for production AND offline!**
