import { useState } from 'react'
import { Card, Button, Badge, Input, toast, Modal } from '@/components/ui'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'restaurant' | 'customer'
  status: 'active' | 'inactive' | 'pending'
  restaurantName?: string
  subscriptionStatus?: 'active' | 'expired' | 'trial'
  subscriptionEnd?: string
  createdAt: string
  lastLogin: string
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'john@digimenu.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-01-29',
  },
  {
    id: '2',
    name: 'KFC Manager',
    email: 'manager@kfc.com',
    role: 'restaurant',
    status: 'active',
    restaurantName: 'KFC Flagship Store',
    subscriptionStatus: 'active',
    subscriptionEnd: '2024-06-01',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-28',
  },
  {
    id: '3',
    name: 'Burger Palace Owner',
    email: 'owner@burgerpalace.com',
    role: 'restaurant',
    status: 'active',
    restaurantName: 'Burger Palace',
    subscriptionStatus: 'trial',
    subscriptionEnd: '2024-02-15',
    createdAt: '2024-01-20',
    lastLogin: '2024-01-27',
  },
  {
    id: '4',
    name: 'Sushi Master',
    email: 'chef@sushimaster.com',
    role: 'restaurant',
    status: 'inactive',
    restaurantName: 'Sushi Master',
    subscriptionStatus: 'expired',
    subscriptionEnd: '2024-01-01',
    createdAt: '2023-06-10',
    lastLogin: '2024-01-10',
  },
]

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'restaurant' as User['role'],
    restaurantName: '',
    subscriptionStatus: 'trial' as User['subscriptionStatus'],
    subscriptionEnd: '',
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const openAddModal = () => {
    setEditingUser(null)
    setFormData({
      name: '',
      email: '',
      role: 'restaurant',
      restaurantName: '',
      subscriptionStatus: 'trial',
      subscriptionEnd: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })
    setIsModalOpen(true)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      restaurantName: user.restaurantName || '',
      subscriptionStatus: user.subscriptionStatus || 'trial',
      subscriptionEnd: user.subscriptionEnd || '',
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      toast('Please fill in all required fields', 'error')
      return
    }

    if (editingUser) {
      setUsers(users => 
        users.map(user => 
          user.id === editingUser.id 
            ? { 
                ...user, 
                ...formData,
                subscriptionStatus: formData.role === 'restaurant' ? formData.subscriptionStatus : undefined,
                subscriptionEnd: formData.role === 'restaurant' ? formData.subscriptionEnd : undefined,
              } 
            : user
        )
      )
      toast('User updated successfully', 'success')
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'active',
        restaurantName: formData.role === 'restaurant' ? formData.restaurantName : undefined,
        subscriptionStatus: formData.role === 'restaurant' ? formData.subscriptionStatus : undefined,
        subscriptionEnd: formData.role === 'restaurant' ? formData.subscriptionEnd : undefined,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: '-',
      }
      setUsers(users => [...users, newUser])
      toast('User created successfully', 'success')
    }

    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleDelete = () => {
    if (userToDelete) {
      setUsers(users => users.filter(user => user.id !== userToDelete.id))
      toast('User deleted successfully', 'success')
      setIsDeleteModalOpen(false)
      setUserToDelete(null)
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users =>
      users.map(user =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      )
    )
  }

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'admin': return <Badge variant="error">Admin</Badge>
      case 'restaurant': return <Badge variant="info">Restaurant</Badge>
      case 'customer': return <Badge variant="default">Customer</Badge>
    }
  }

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active': return <Badge variant="success">Active</Badge>
      case 'inactive': return <Badge variant="default">Inactive</Badge>
      case 'pending': return <Badge variant="warning">Pending</Badge>
    }
  }

  const getSubscriptionBadge = (status?: User['subscriptionStatus']) => {
    switch (status) {
      case 'active': return <Badge variant="success">Subscribed</Badge>
      case 'trial': return <Badge variant="warning">Trial</Badge>
      case 'expired': return <Badge variant="error">Expired</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">User Management</h1>
          <p className="text-[rgb(var(--text-muted))]">Manage users and restaurant subscriptions</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center gap-2">
          <span>➕</span> Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[rgb(var(--text))]">{users.length}</p>
              <p className="text-sm text-[rgb(var(--text-muted))]">Total Users</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <span className="text-2xl">🏪</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[rgb(var(--text))]">
                {users.filter(u => u.role === 'restaurant').length}
              </p>
              <p className="text-sm text-[rgb(var(--text-muted))]">Restaurants</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[rgb(var(--text))]">
                {users.filter(u => u.subscriptionStatus === 'trial').length}
              </p>
              <p className="text-sm text-[rgb(var(--text-muted))]">In Trial</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[rgb(var(--text))]">
                {users.filter(u => u.subscriptionStatus === 'expired').length}
              </p>
              <p className="text-sm text-[rgb(var(--text-muted))]">Expired</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<span>🔍</span>}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <select
              className="px-4 py-2 rounded-lg bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text))] border border-[rgb(var(--border))] text-sm"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="restaurant">Restaurant</option>
              <option value="customer">Customer</option>
            </select>
            <select
              className="px-4 py-2 rounded-lg bg-[rgb(var(--bg-elevated))] text-[rgb(var(--text))] border border-[rgb(var(--border))] text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgb(var(--bg-elevated))]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider hidden lg:table-cell">Subscription</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider hidden xl:table-cell">Last Login</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgb(var(--border))]">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-[rgb(var(--bg-elevated))] transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[rgb(var(--text))] truncate">{user.name}</p>
                        <p className="text-sm text-[rgb(var(--text-muted))] truncate">{user.email}</p>
                        {user.restaurantName && (
                          <p className="text-xs text-[rgb(var(--primary))]">{user.restaurantName}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-4 py-4 hidden sm:table-cell">{getStatusBadge(user.status)}</td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    {user.role === 'restaurant' ? (
                      <div>
                        {getSubscriptionBadge(user.subscriptionStatus)}
                        {user.subscriptionEnd && (
                          <p className="text-xs text-[rgb(var(--text-muted))] mt-1">
                            Expires: {user.subscriptionEnd}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-[rgb(var(--text-muted))]">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden xl:table-cell text-sm text-[rgb(var(--text-muted))]">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`w-10 h-6 rounded-full transition-colors relative ${
                          user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                        title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                          user.status === 'active' ? 'left-4' : 'left-0.5'
                        }`} />
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditModal(user)}
                      >
                        ✏️
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUserToDelete(user)
                          setIsDeleteModalOpen(true)
                        }}
                        className="text-red-500 hover:bg-red-50"
                      >
                        🗑️
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[rgb(var(--bg-elevated))] flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <h3 className="text-lg font-bold text-[rgb(var(--text))] mb-2">No users found</h3>
            <p className="text-[rgb(var(--text-muted))]">Try adjusting your filters</p>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-[rgb(var(--text))] mb-6">
            {editingUser ? 'Edit User' : 'Add New User'}
          </h2>
          
          <div className="space-y-4">
            <Input
              label="Full Name *"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Email *"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">Role</label>
              <select
                className="w-full p-3 rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as User['role'] })}
              >
                <option value="restaurant">Restaurant Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            {formData.role === 'restaurant' && (
              <>
                <Input
                  label="Restaurant Name"
                  placeholder="My Restaurant"
                  value={formData.restaurantName}
                  onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[rgb(var(--text))] mb-2">Subscription</label>
                    <select
                      className="w-full p-3 rounded-xl border-2 border-[rgb(var(--border))] bg-[rgb(var(--bg))] text-[rgb(var(--text))] text-sm"
                      value={formData.subscriptionStatus}
                      onChange={(e) => setFormData({ ...formData, subscriptionStatus: e.target.value as User['subscriptionStatus'] })}
                    >
                      <option value="trial">14-Day Trial</option>
                      <option value="active">Active Subscription</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <Input
                    label="Expires On"
                    type="date"
                    value={formData.subscriptionEnd}
                    onChange={(e) => setFormData({ ...formData, subscriptionEnd: e.target.value })}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-[rgb(var(--border))]">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} size="sm">
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-[rgb(var(--text))] mb-2">Delete User?</h3>
          <p className="text-[rgb(var(--text-muted))] mb-6">
            Are you sure you want to delete "{userToDelete?.name}"? This action cannot be undone.
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
