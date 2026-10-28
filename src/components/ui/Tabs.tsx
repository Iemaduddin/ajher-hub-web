export interface TabItem {
  id: string
  label: string
  badge?: string | number
}

interface TabsProps {
  items: TabItem[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ items, active, onChange }: TabsProps) {
  return (
    <div className="flex items-stretch gap-4 overflow-x-auto border-b border-line" role="tablist">
      {items.map((item) => {
        const isActive = item.id === active
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`-mb-px flex items-center gap-2 border-b-2 pt-2 pb-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? 'border-accent text-fg' : 'border-transparent text-sub hover:text-fg'
            }`}
            onClick={() => onChange(item.id)}
          >
            <span>{item.label}</span>
            {item.badge != null && (
              <span
                className={`inline-flex h-[18px] min-w-5 items-center justify-center rounded-pill px-1.5 text-xs font-medium ${
                  isActive ? 'bg-primary/20 text-primary' : 'bg-raised text-sub'
                }`}
              >
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
