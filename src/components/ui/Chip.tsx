import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  variant?: 'label' | 'topic' | 'neutral'
  color?: string
  className?: string
}

export function Chip({ children, variant = 'neutral', color, className = '' }: ChipProps) {
  const base =
    'inline-flex h-6 items-center gap-1 rounded-pill px-3 text-xs font-medium leading-none whitespace-nowrap'

  if (variant === 'label' && color) {
    return (
      <span
        className={`${base} ${className}`.trim()}
        style={{
          backgroundColor: `color-mix(in srgb, ${color} 30%, transparent)`,
          color,
        }}
      >
        {children}
      </span>
    )
  }

  const variantClasses =
    variant === 'topic'
      ? 'bg-link/15 text-link'
      : 'border border-line bg-raised text-sub'

  return <span className={`${base} ${variantClasses} ${className}`.trim()}>{children}</span>
}

type StatusTone = 'success' | 'warning' | 'error' | 'neutral' | 'info'

const toneClasses: Record<StatusTone, string> = {
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  error: 'bg-error/15 text-error',
  info: 'bg-primary/15 text-primary',
  neutral: 'bg-raised text-sub',
}

interface StatusBadgeProps {
  tone?: StatusTone
  children: ReactNode
  dot?: boolean
}

export function StatusBadge({ tone = 'neutral', children, dot = false }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex h-[22px] items-center gap-1.5 rounded-pill px-2.5 text-xs font-medium leading-none whitespace-nowrap ${toneClasses[tone]}`}
    >
      {dot && <span className="size-1.5 rounded-pill bg-current" aria-hidden="true" />}
      {children}
    </span>
  )
}

export function LanguageDot({ color }: { color: string }) {
  return <span className="inline-block size-2.5 rounded-pill" style={{ backgroundColor: color }} aria-hidden="true" />
}
