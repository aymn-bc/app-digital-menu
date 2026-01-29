import { useState } from 'react'
import { Card, Button, Badge, Input, toast, Modal } from '@/components/ui'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  isAvailable: boolean
  isPopular: boolean
  isNew: boolean
  isSpicy: boolean
  prepTime: string
  allergens: string[]
  dietary: string[]
}

interface Category {
  id: string
  name: string
  icon: string
}

const initialCategories: Category[] = [
  { id: 'chicken', name: 'Chicken', icon: '🍗' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
]

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Original Recipe Chicken',
    description: 'Our signature fried chicken with 11 herbs and spices',
    price: 12.99,
    originalPrice: 14.99,
    category: 'chicken',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400',
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: false,
    prepTime: '10-15 min',
    allergens: ['Gluten'],
    dietary: [],
  },
  {
    id: '2',
    name: 'Zinger Burger',
    description: 'Spicy chicken fillet with fresh lettuce and mayo',
    price: 8.99,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    isAvailable: true,
    isPopular: true,
    isNew: false,
    isSpicy: true,
    prepTime: '8-12 min',
    allergens: ['Gluten', 'Egg'],
    dietary: [],
  },
  {
    id: '3',
    name: 'Large Fries',
    description: 'Crispy golden fries, perfectly salted',
    price: 4.49,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    isAvailable: true,
    isPopular: false,
    isNew: false,
    isSpicy: false,
    prepTime: '5 min',
    allergens: [],
    dietary: ['Vegan'],
  },
]

export default function RestaurantMenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [categories] = useState<Category[]>(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'chicken',
    image: '',
    isAvailable: true,
    isPopular: false,
    isNew: true,
    isSpicy: false,
    prepTime: '10-15 min',
    allergens: [],
    dietary: [],
  })

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'chicken',
      image: '',
      isAvailable: true,
      isPopular: false,
      isNew: true,
      isSpicy: false,
      prepTime: '10-15 min',
      allergens: [],
      dietary: [],
    })
    setIsModalOpen(true)
  }

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({ ...item })
    setIsModalOpen(true)
  }

  const openDeleteModal = (item: MenuItem) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast('Please fill in all required fields', 'error')
      return
    }

    if (editingItem) {
      // Update existing item
      setMenuItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData } as MenuItem 
            : item
        )
      )
      toast('Menu item updated successfully', 'success')
    } else {
      // Add new item
      const newItem: MenuItem = {
        ...formData,
        id: Date.now().toString(),
      } as MenuItem
      setMenuItems(items => [...items, newItem])
      toast('Menu item added successfully', 'success')
    }

    setIsModalOpen(false)
    setEditingItem(null)
  }

  const handleDelete = () => {
    if (itemToDelete) {
      setMenuItems(items => items.filter(item => item.id !== itemToDelete.id))
      toast('Menu item deleted', 'success')
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
    }
  }

  const toggleAvailability = (itemId: string) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <p className="text-gray-400">Add, edit, and manage your menu items</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <span>➕</span> Add New Item
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<span>🔍</span>}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[rgb(var(--primary))] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-[rgb(var(--primary))] text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-white">{menuItems.length}</p>
          <p className="text-gray-400 text-sm">Total Items</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{menuItems.filter(i => i.isAvailable).length}</p>
          <p className="text-gray-400 text-sm">Available</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-amber-400">{menuItems.filter(i => i.isPopular).length}</p>
          <p className="text-gray-400 text-sm">Popular</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-3xl font-bold text-blue-400">{categories.length}</p>
          <p className="text-gray-400 text-sm">Categories</p>
        </Card>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <Card key={item.id} className={`overflow-hidden ${!item.isAvailable ? 'opacity-60' : ''}`}>
            <div className="relative h-40">
              <img
                src={item.image || 'https://via.placeholder.com/400x200'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                {item.isNew && <Badge variant="success">NEW</Badge>}
                {item.isPopular && <Badge variant="warning">🔥 HOT</Badge>}
                {item.isSpicy && <Badge variant="error">🌶️</Badge>}
                {!item.isAvailable && <Badge variant="default">Unavailable</Badge>}
              </div>
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-black/70 text-white rounded-lg text-sm font-bold">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white mb-1">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">⏱️ {item.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      item.isAvailable ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      item.isAvailable ? 'left-6' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditModal(item)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteModal(item)}
                >
                  🗑️
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🍽️</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your filters or add new items</p>
          <Button onClick={openAddModal}>Add First Item</Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-6">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Item Name *"
                placeholder="e.g., Zinger Burger"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Price *"
                type="number"
                placeholder="0.00"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">Description</label>
              <textarea
                className="w-full p-3 rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm resize-none focus:border-[rgb(var(--primary))] outline-none transition-all"
                rows={3}
                placeholder="Describe your menu item..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">Category</label>
                <select
                  className="w-full p-3 rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm focus:border-[rgb(var(--primary))] outline-none transition-all"
                  value={formData.category || 'chicken'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              <Input
                label="Prep Time"
                placeholder="e.g., 10-15 min"
                value={formData.prepTime || ''}
                onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
              />
            </div>

            <Input
              label="Image URL"
              placeholder="https://..."
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4 accent-[rgb(var(--primary))]"
                />
                <span className="text-sm text-[rgb(var(--text))]">Available</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                  className="w-4 h-4 accent-[rgb(var(--primary))]"
                />
                <span className="text-sm text-[rgb(var(--text))]">Popular</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 accent-[rgb(var(--primary))]"
                />
                <span className="text-sm text-[rgb(var(--text))]">New Item</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isSpicy}
                  onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
                  className="w-4 h-4 accent-[rgb(var(--primary))]"
                />
                <span className="text-sm text-[rgb(var(--text))]">🌶️ Spicy</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-[rgb(var(--border))]">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} size="sm">
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🗑️</span>
          </div>
          <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">Delete Item?</h3>
          <p className="text-[rgb(var(--text-muted))] mb-6">
            Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} className="flex-1">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
