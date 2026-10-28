import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { LuChevronRight } from 'react-icons/lu'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1 text-xs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && (
            <span className="inline-flex text-dim" aria-hidden="true">
              <LuChevronRight size={14} />
            </span>
          )}
          {item.to ? (
            <Link className="text-sub hover:text-link" to={item.to}>
              {item.label}
            </Link>
          ) : (
            <span className="text-fg" aria-current="page">
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
