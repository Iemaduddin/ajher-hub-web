import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

interface PaginationProps {
  page: number
  pageCount: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, total, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-between gap-4 border-t border-line p-3">
      <span className="text-xs text-sub">{total} data</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs text-sub transition-colors hover:bg-raised hover:text-fg disabled:pointer-events-none disabled:opacity-40"
          disabled={page <= 1}
          aria-label="Halaman sebelumnya"
          onClick={() => onPageChange(page - 1)}
        >
          <LuChevronLeft size={14} />
        </button>
        {pages.map((value) => (
          <button
            key={value}
            type="button"
            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs transition-colors ${
              value === page
                ? 'border border-line bg-raised font-medium text-fg'
                : 'text-sub hover:bg-raised hover:text-fg'
            }`}
            aria-current={value === page ? 'page' : undefined}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-xs text-sub transition-colors hover:bg-raised hover:text-fg disabled:pointer-events-none disabled:opacity-40"
          disabled={page >= pageCount}
          aria-label="Halaman berikutnya"
          onClick={() => onPageChange(page + 1)}
        >
          <LuChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
