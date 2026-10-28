import { useEffect, useRef, useState, type ReactNode } from 'react'

interface DropdownProps {
  trigger: (props: { open: boolean }) => ReactNode
  children: ReactNode
  align?: 'start' | 'end'
  width?: number
}

export function Dropdown({ trigger, children, align = 'end', width }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="relative inline-flex" ref={rootRef}>
      <button
        type="button"
        className="inline-flex items-center gap-2 border-0 bg-transparent p-0 text-inherit"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {trigger({ open })}
      </button>
      {open && (
        <div
          className={`absolute top-[calc(100%+6px)] z-[900] min-w-[200px] animate-dropdown-in rounded-md border border-line bg-overlay p-1 shadow-pop ${
            align === 'end' ? 'end-0' : 'start-0'
          }`}
          role="menu"
          style={width ? { width } : undefined}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  icon?: ReactNode
  danger?: boolean
  selected?: boolean
  onSelect?: () => void
}

export function DropdownItem({ children, icon, danger, selected, onSelect }: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={`flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors ${
        danger
          ? 'text-error hover:bg-error hover:text-white'
          : selected
            ? 'text-primary'
            : 'text-fg hover:bg-primary hover:text-white'
      }`}
      onClick={onSelect}
    >
      {icon && <span className="inline-flex text-current [&>svg]:size-4">{icon}</span>}
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </button>
  )
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-line" role="separator" />
}
