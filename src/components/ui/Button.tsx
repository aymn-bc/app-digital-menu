import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  rounded?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white shadow-md hover:shadow-lg btn-shine',
  secondary: 'bg-[rgb(var(--secondary))] hover:opacity-90 text-[rgb(var(--accent))] shadow-md hover:shadow-lg',
  ghost: 'bg-transparent hover:bg-[rgb(var(--border)/0.5)] text-[rgb(var(--text))]',
  danger: 'bg-[rgb(var(--error))] hover:opacity-90 text-white shadow-md',
  success: 'bg-[rgb(var(--success))] hover:opacity-90 text-white shadow-md',
  outline: 'bg-transparent border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] hover:bg-[rgb(var(--primary))] hover:text-white',
}

const sizes: Record<Size, string> = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading, 
    disabled, 
    icon,
    iconPosition = 'left',
    fullWidth = false,
    rounded = false,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:ring-offset-2
          active:scale-[0.98]
          ${variants[variant]}
          ${sizes[size]}
          ${rounded ? 'rounded-full' : 'rounded-[var(--radius-lg)]'}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
