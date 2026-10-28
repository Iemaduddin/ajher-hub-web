import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div className={`rounded-md border border-line bg-surface ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
}

export function CardHeader({ title, description, actions }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line p-4">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-1 text-xs text-sub">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

export function CardBody({ className = '', children }: CardProps) {
  return <div className={`p-4 ${className}`.trim()}>{children}</div>
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="rounded-b-md border-t border-line bg-canvas/50 p-3">{children}</div>
}
