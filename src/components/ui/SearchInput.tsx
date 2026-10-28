import type { InputHTMLAttributes } from 'react'
import { LuSearch } from 'react-icons/lu'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  shortcut?: boolean
}

export function SearchInput({ className = '', shortcut = true, placeholder = 'Cari…', ...rest }: SearchInputProps) {
  return (
    <div className={`relative flex w-full items-center ${className}`.trim()}>
      <span className="pointer-events-none absolute left-2.5 inline-flex text-sub" aria-hidden="true">
        <LuSearch size={16} />
      </span>
      <input
        type="search"
        className="h-8 w-full rounded-md border border-line bg-canvas py-0 pr-10 pl-8.5 text-sm text-fg transition-[border-color,box-shadow] placeholder:text-dim hover:border-line-hover focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35 [&::-webkit-search-cancel-button]:appearance-none"
        placeholder={placeholder}
        {...rest}
      />
      {shortcut && <kbd className="pointer-events-none absolute right-2">/</kbd>}
    </div>
  )
}
