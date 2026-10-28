import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && (
        <div className="inline-flex size-12 items-center justify-center rounded-lg border border-line bg-raised text-sub [&>span]:text-base [&>svg]:size-[22px]">
          {icon}
        </div>
      )}
      <h3 className="text-base">{title}</h3>
      {description && <p className="max-w-[420px] text-sm text-sub">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}
