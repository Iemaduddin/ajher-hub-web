import type { ReactNode } from 'react'

interface TooltipProps {
  label: ReactNode
  children: ReactNode
  placement?: 'top' | 'bottom'
}

export function Tooltip({ label, children, placement = 'top' }: TooltipProps) {
  const bubbleClasses =
    'tooltip-arrow pointer-events-none absolute left-1/2 z-[950] w-max max-w-[250px] -translate-x-1/2 ' +
    'rounded-md border border-line bg-overlay px-2.5 py-1.5 text-center text-xs leading-snug text-outline ' +
    'invisible opacity-0 transition-all duration-150 delay-200 group-hover:visible group-hover:opacity-100 ' +
    'group-focus-within:visible group-focus-within:opacity-100'

  return (
    <span className={`group relative inline-flex tooltip-${placement}`}>
      <span className="inline-flex">{children}</span>
      <span
        className={`${bubbleClasses} ${placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}`}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  )
}
