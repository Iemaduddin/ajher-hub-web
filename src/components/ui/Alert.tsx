import type { ReactNode } from 'react'
import { LuCircleAlert, LuCircleCheckBig, LuInfo, LuTriangleAlert } from 'react-icons/lu'

type AlertTone = 'info' | 'success' | 'warning' | 'error'

interface AlertProps {
  tone?: AlertTone
  title?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  onDismiss?: () => void
}

const icons: Record<AlertTone, typeof LuInfo> = {
  info: LuInfo,
  success: LuCircleCheckBig,
  warning: LuTriangleAlert,
  error: LuCircleAlert,
}

const toneClasses: Record<AlertTone, { border: string; icon: string }> = {
  info: { border: 'border-l-primary', icon: 'text-primary' },
  success: { border: 'border-l-success', icon: 'text-success' },
  warning: { border: 'border-l-warning', icon: 'text-warning' },
  error: { border: 'border-l-error', icon: 'text-error' },
}

export function Alert({ tone = 'info', title, children, actions, onDismiss }: AlertProps) {
  const Icon = icons[tone]
  const { border, icon } = toneClasses[tone]

  return (
    <div
      className={`flex items-start gap-3 rounded-md border border-l-[3px] border-line bg-surface p-3 text-sm ${border}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <span className={`mt-px inline-flex shrink-0 ${icon}`}>
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="font-medium text-fg">{title}</p>}
        {children && <div className="mt-0.5 text-sub">{children}</div>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      {onDismiss && (
        <button
          type="button"
          className="px-0.5 text-base leading-none text-sub hover:text-fg"
          aria-label="Tutup"
          onClick={onDismiss}
        >
          &times;
        </button>
      )}
    </div>
  )
}
