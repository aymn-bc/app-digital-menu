import { useState, useEffect } from 'react'
import { Card, Badge } from '@/components/ui'
import { generateTables } from '@/utils/seedData'

type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

interface Table {
  id: number
  number: string
  capacity: number
  status: TableStatus
  currentOrder?: {
    id: string
    guests: number
    total: number
    duration: number // minutes
  }
}

const statusConfig: Record<TableStatus, { color: 'success' | 'error' | 'warning' | 'info'; label: string; bgColor: string }> = {
  available: { color: 'success', label: 'Available', bgColor: 'bg-green-500/20 border-green-500' },
  occupied: { color: 'error', label: 'Occupied', bgColor: 'bg-red-500/20 border-red-500' },
  reserved: { color: 'warning', label: 'Reserved', bgColor: 'bg-yellow-500/20 border-yellow-500' },
  cleaning: { color: 'info', label: 'Cleaning', bgColor: 'bg-blue-500/20 border-blue-500' },
}

export default function Tables() {
  const [tables, setTables] = useState<Table[]>([])
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  // Initialize with generated tables
  useEffect(() => {
    setTables(generateTables())
  }, [])

  const stats = {
    available: tables.filter((t) => t.status === 'available').length,
    occupied: tables.filter((t) => t.status === 'occupied').length,
    reserved: tables.filter((t) => t.status === 'reserved').length,
    cleaning: tables.filter((t) => t.status === 'cleaning').length,
  }

  const totalCapacity = tables.reduce((sum, t) => sum + t.capacity, 0)
  const occupiedCapacity = tables
    .filter((t) => t.status === 'occupied')
    .reduce((sum, t) => sum + (t.currentOrder?.guests || 0), 0)

  const updateStatus = (tableId: number, status: TableStatus) => {
    setTables(tables.map((t) => (t.id === tableId ? { ...t, status, currentOrder: status === 'available' ? undefined : t.currentOrder } : t)))
    setSelectedTable(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Table Management</h1>
          <p className="text-gray-400 mt-1">Monitor and manage restaurant tables</p>
        </div>
        <div className="text-sm text-gray-400">
          Capacity: <span className="text-white font-medium">{occupiedCapacity}</span> / {totalCapacity} guests
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-2xl font-bold text-green-400">{stats.available}</p>
          <p className="text-sm text-gray-400">Available</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-2xl font-bold text-red-400">{stats.occupied}</p>
          <p className="text-sm text-gray-400">Occupied</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
          <p className="text-2xl font-bold text-yellow-400">{stats.reserved}</p>
          <p className="text-sm text-gray-400">Reserved</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-2xl font-bold text-blue-400">{stats.cleaning}</p>
          <p className="text-sm text-gray-400">Cleaning</p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => setSelectedTable(table)}
            className={`
              aspect-square rounded-xl border-2 cursor-pointer transition-all hover:scale-105
              flex flex-col items-center justify-center p-4
              ${statusConfig[table.status].bgColor}
            `}
          >
            <span className="text-3xl font-bold">{table.number}</span>
            <span className="text-xs text-gray-400 mt-1">👤 {table.capacity}</span>
            <Badge variant={statusConfig[table.status].color} className="mt-2 text-[10px]">
              {statusConfig[table.status].label}
            </Badge>
            {table.currentOrder && (
              <span className="text-xs text-gray-400 mt-1">{table.currentOrder.duration}m</span>
            )}
          </div>
        ))}
      </div>

      {/* Table Details Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-xl font-bold">Table {selectedTable.number}</h3>
              <button onClick={() => setSelectedTable(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <Badge variant={statusConfig[selectedTable.status].color}>
                  {statusConfig[selectedTable.status].label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Capacity</span>
                <span>{selectedTable.capacity} guests</span>
              </div>

              {selectedTable.currentOrder && (
                <>
                  <hr className="border-gray-700" />
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Order</span>
                    <span className="font-medium">{selectedTable.currentOrder.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Guests</span>
                    <span>{selectedTable.currentOrder.guests}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold text-green-400">${selectedTable.currentOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span>{selectedTable.currentOrder.duration} minutes</span>
                  </div>
                </>
              )}

              <hr className="border-gray-700" />
              <div className="grid grid-cols-2 gap-2">
                {selectedTable.status !== 'available' && (
                  <button
                    onClick={() => updateStatus(selectedTable.id, 'available')}
                    className="py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
                  >
                    Set Available
                  </button>
                )}
                {selectedTable.status === 'available' && (
                  <button
                    onClick={() => updateStatus(selectedTable.id, 'occupied')}
                    className="py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
                  >
                    Seat Guests
                  </button>
                )}
                {selectedTable.status === 'available' && (
                  <button
                    onClick={() => updateStatus(selectedTable.id, 'reserved')}
                    className="py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors"
                  >
                    Reserve
                  </button>
                )}
                {selectedTable.status === 'occupied' && (
                  <button
                    onClick={() => updateStatus(selectedTable.id, 'cleaning')}
                    className="py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                  >
                    Needs Cleaning
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
