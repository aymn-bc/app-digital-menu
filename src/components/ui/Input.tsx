import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[rgb(var(--text))] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[rgb(var(--text-muted))]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-lg
              bg-[rgb(var(--bg-card))] border border-[rgb(var(--border))]
              text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-muted))]
              focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:border-transparent
              transition-all duration-150
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-[rgb(var(--error))] focus:ring-[rgb(var(--error))]' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-[rgb(var(--error))]">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
