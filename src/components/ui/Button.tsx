import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'danger' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  iconEnd?: ReactNode
  loading?: boolean
  block?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-secondary text-on-primary hover:bg-secondary-hover',
  outline: 'border border-line bg-transparent text-outline hover:border-line-hover hover:bg-raised',
  danger: 'border border-error/40 bg-transparent text-error hover:border-error hover:bg-error/10',
  ghost: 'bg-transparent text-sub hover:bg-raised hover:text-fg',
  link: 'bg-transparent p-0 text-link hover:text-primary-hover hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'h-8 px-5 text-sm',
  sm: 'h-7 px-3 text-xs',
}

export function Button({
  variant = 'outline',
  size = 'md',
  icon,
  iconEnd,
  loading = false,
  block = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium leading-none whitespace-nowrap',
    'transition-[background-color,border-color,color] duration-100',
    'disabled:opacity-60 disabled:pointer-events-none',
    variantClasses[variant],
    variant === 'link' ? 'h-auto' : sizeClasses[size],
    block ? 'w-full' : '',
    loading ? 'pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {loading && (
        <span
          className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      )}
      {!loading && icon && <span className="inline-flex items-center [&>svg]:size-4">{icon}</span>}
      {children != null && <span className={loading ? 'opacity-80' : ''}>{children}</span>}
      {iconEnd && <span className="inline-flex items-center [&>svg]:size-4">{iconEnd}</span>}
    </button>
  )
}
