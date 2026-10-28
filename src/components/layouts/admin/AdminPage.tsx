import type { ReactNode } from 'react'

export function AdminPage({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex max-w-[1280px] flex-col gap-6">{children}</div>
}

export function AdminGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">{children}</div>
}

export function AdminGridSidebar({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">{children}</div>
}
