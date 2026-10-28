import { useEffect, type ReactNode } from 'react'
import { LuX } from 'react-icons/lu'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = { sm: 'max-w-sm', md: 'max-w-[520px]', lg: 'max-w-[720px]' }

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center overflow-y-auto bg-backdrop px-4 pt-16"
      role="presentation"
      onClick={onClose}
    >
      <div
        className={`w-full ${sizeClasses[size]} animate-modal-in rounded-md border border-line bg-overlay shadow-pop`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-4">
          <div>
            <h3 className="text-base">{title}</h3>
            {description && <p className="mt-1 text-xs text-sub">{description}</p>}
          </div>
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-md text-sub transition-colors hover:bg-raised hover:text-fg"
            aria-label="Tutup"
            onClick={onClose}
          >
            <LuX size={16} />
          </button>
        </div>
        {children && <div className="p-4">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-line p-3">{footer}</div>
        )}
      </div>
    </div>
  )
}
