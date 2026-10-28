import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react'

interface TableContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function TableContainer({ className = '', children, ...rest }: TableContainerProps) {
  return (
    <div className={`w-full overflow-x-auto ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

export function Table({ className = '', children, ...rest }: TableProps) {
  return (
    <table className={`w-full border-collapse text-sm ${className}`.trim()} {...rest}>
      {children}
    </table>
  )
}

export function Th({ className = '', children, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`border-b border-line bg-surface px-4 py-2.5 text-left text-xs font-medium whitespace-nowrap text-sub ${className}`.trim()}
      {...rest}
    >
      {children}
    </th>
  )
}

export function Td({ className = '', children, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`border-b border-line px-4 py-2.5 align-middle text-fg ${className}`.trim()}
      {...rest}
    >
      {children}
    </td>
  )
}

export function Tr({ className = '', children, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={`transition-colors hover:bg-surface ${className}`.trim()} {...rest}>
      {children}
    </tr>
  )
}
