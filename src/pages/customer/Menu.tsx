import { useEffect, useState, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppStore, selectLanguage, useCartStore } from "@/store/useStore"
import { Card, CardContent, Input, Button, toast } from "@/components/ui"

type Item = {
  id: string
  name: string
  price: number
  image: string
  description: string
  categoryName: string
}

export default function CustomerMenu() {
  const navigate = useNavigate()
  const { restaurantId } = useParams()
  const language = useAppStore(selectLanguage)
  const { addItem } = useCartStore()

  const [items, setItems] = useState<Item[]>([])
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [sliderIndex, setSliderIndex] = useState(0)

  // 🍔 REAL MENU (NO DUPLICATES)
  const realMenu: Item[] = [
    {
      id: "1",
      name: "Pizza Margherita",
      price: 12.5,
      categoryName: "Pizza",
      image: "https://www.foodandwine.com/thmb/7BpSJWDh1s-2M2ooRPHoy07apq4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg",
      description: "Classic pizza with tomato sauce, mozzarella & basil",
    },
    {
      id: "2",
      name: "Pizza Thon",
      price: 14,
      categoryName: "Pizza",
      image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
      description: "Tuna pizza with olives and cheese",
    },
    {
      id: "3",
      name: "Cheeseburger",
      price: 10.5,
      categoryName: "Burger",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      description: "Juicy beef burger with melted cheese",
    },
    {
      id: "4",
      name: "Crispy Chicken Burger",
      price: 11.2,
      categoryName: "Burger",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2025/04/Crispiest-buttermilk-fried-chicken-burgers-90854e5.jpg",
      description: "Fried chicken burger with crispy coating",
    },
    {
      id: "5",
      name: "California Rolls",
      price: 18,
      categoryName: "Sushi",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      description: "Crab, avocado, cucumber sushi rolls",
    },
    {
      id: "6",
      name: "Salmon Sushi",
      price: 20,
      categoryName: "Sushi",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
      description: "Fresh salmon sushi pieces",
    },
    {
      id: "7",
      name: "Spaghetti Carbonara",
      price: 13,
      categoryName: "Pasta",
      image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c",
      description: "Creamy pasta with bacon and parmesan",
    },
    {
      id: "8",
      name: "Chicken Alfredo",
      price: 15,
      categoryName: "Pasta",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
      description: "Pasta with creamy Alfredo sauce & chicken",
    },
    {
      id: "9",
      name: "Grilled Steak",
      price: 25,
      categoryName: "Main",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      description: "Juicy grilled steak with sides",
    },
    {
      id: "10",
      name: "Caesar Salad",
      price: 9,
      categoryName: "Salad",
      image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
      description: "Fresh salad with chicken and Caesar dressing",
    },
  ]

  useEffect(() => {
    if (!restaurantId) {
      navigate("/")
      return
    }

    setItems(realMenu)
  }, [restaurantId, navigate])

  const categories = ["all", ...new Set(items.map((i) => i.categoryName))]

  const filtered = useMemo(() => {
    return items.filter((i) => {
      return (
        i.name.toLowerCase().includes(query.toLowerCase()) &&
        (category === "all" || i.categoryName === category)
      )
    })
  }, [items, query, category])

  const sliderItems = items.slice(0, 5)

  useEffect(() => {
    if (sliderItems.length === 0) return
    const int = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % sliderItems.length)
    }, 4000)
    return () => clearInterval(int)
  }, [sliderItems.length])

  const addToCart = (item: Item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
    toast(`Added ${item.name}`, "success")
  }

  return (
    <div className="p-4 space-y-8">

      {/* 🔥 HEADER */}
      <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl">
        <div
          className="flex h-full transition-transform duration-700"
          style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
        >
          {sliderItems.map((item) => (
            <div key={item.id} className="min-w-full relative">
              <img src={item.image} className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
                <h2 className="text-4xl font-bold">{item.name}</h2>
                <p>{item.price.toFixed(2)} TND</p>
                <Button onClick={() => addToCart(item)}>Order</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* CATEGORIES */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="px-3 py-1 bg-gray-200 rounded-full"
          >
            {c}
          </button>
        ))}
      </div>

      {/* MENU */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <Card key={item.id}>
            <img src={item.image} className="h-40 w-full object-cover" />
            <CardContent>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>

              <div className="flex justify-between mt-2">
                <span>{item.price.toFixed(2)} TND</span>
                <Button size="sm" onClick={() => addToCart(item)}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}