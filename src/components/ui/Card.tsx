import type { HTMLAttributes, ReactNode } from 'react'

type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass' | 'gradient'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variants: Record<CardVariant, string> = {
  default: 'bg-[rgb(var(--bg-card))] shadow-[var(--shadow-sm)]',
  elevated: 'bg-[rgb(var(--bg-card))] shadow-[var(--shadow-md)]',
  bordered: 'bg-[rgb(var(--bg-card))] border-2 border-[rgb(var(--border))]',
  glass: 'glass border border-[rgb(var(--border)/0.5)]',
  gradient: 'bg-gradient-to-br from-[rgb(var(--bg-card))] to-[rgb(var(--bg-elevated))] shadow-[var(--shadow)]',
}

const paddings = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
}

export default function Card({ 
  children, 
  hover = false, 
  variant = 'default',
  padding = 'none',
  className = '', 
  ...props 
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl overflow-hidden
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ 
  children, 
  className = '',
  action,
}: { 
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <div className={`px-5 py-4 border-b border-[rgb(var(--border))] flex items-center justify-between ${className}`}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-5 py-3 border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-elevated)/0.5)] ${className}`}>
      {children}
    </div>
  )
}

// Image Card variant for menu items
export function ImageCard({
  image,
  title,
  subtitle,
  badge,
  price,
  originalPrice,
  onAction,
  className = '',
}: {
  image: string
  title: string
  subtitle?: string
  badge?: string
  price?: number
  originalPrice?: number
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={`group card-hover rounded-xl overflow-hidden bg-[rgb(var(--bg-card))] shadow-md ${className}`}>
      {/* Image Container */}
      <div className="menu-img-container aspect-4/3 relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[rgb(var(--primary))] text-white text-xs font-bold rounded-full">
            {badge}
          </span>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[rgb(var(--text))] text-lg mb-1 line-clamp-1">{title}</h3>
        {subtitle && (
          <p className="text-[rgb(var(--text-muted))] text-sm mb-3 line-clamp-2">{subtitle}</p>
        )}
        
        <div className="flex items-center justify-between">
          {price !== undefined && (
            <div className="flex items-center gap-2">
              <span className="price-tag">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-[rgb(var(--text-muted))] line-through text-sm">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
          {onAction && (
            <button 
              onClick={onAction}
              className="w-10 h-10 rounded-full bg-[rgb(var(--primary))] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
