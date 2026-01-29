type Props = {
  id: string
  name: string
  description?: string
  price: number
  onOrder: () => void
}

export default function MenuItemCard({ name, description, price, onOrder }: Props) {
  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">${price.toFixed(2)}</div>
            <button onClick={onOrder} className="mt-3 px-3 py-1 rounded bg-blue-600 text-white text-sm">Order</button>
          </div>
        </div>
      </div>
    </article>
  )
}
