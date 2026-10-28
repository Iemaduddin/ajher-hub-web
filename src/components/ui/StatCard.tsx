import type { ReactNode } from 'react'
import { LuTrendingDown, LuTrendingUp } from 'react-icons/lu'

interface StatCardProps {
  label: ReactNode
  value: ReactNode
  icon?: ReactNode
  delta?: number
  deltaLabel?: string
}

export function StatCard({ label, value, icon, delta, deltaLabel }: StatCardProps) {
  const trend = delta != null ? (delta >= 0 ? 'up' : 'down') : null

  return (
    <div className="flex flex-col gap-2 rounded-md border border-line bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium tracking-[0.04em] text-sub uppercase">{label}</span>
        {icon && (
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-raised text-sub [&>svg]:size-4">
            {icon}
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold tracking-[-0.02em] text-fg">{value}</div>
      {(trend || deltaLabel) && (
        <div
          className={`inline-flex items-center gap-1 text-xs font-medium ${
            trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-sub'
          }`}
        >
          {trend === 'up' && <LuTrendingUp size={14} />}
          {trend === 'down' && <LuTrendingDown size={14} />}
          {delta != null && <span>{Math.abs(delta)}%</span>}
          {deltaLabel && <span className="font-normal text-sub">{deltaLabel}</span>}
        </div>
      )}
    </div>
  )
}
