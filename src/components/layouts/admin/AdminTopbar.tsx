import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuBell, LuChevronDown, LuLogOut, LuMenu } from 'react-icons/lu'
import { useAuth } from '../../../auth/AuthContext'
import { Avatar, Dropdown, DropdownItem, SearchInput, ThemeToggle } from '../../ui'

const roleLabels: Record<string, string> = {
  foundation_admin: 'Admin Yayasan',
  unit_admin: 'Admin Unit',
  teacher: 'Pengajar',
  guardian: 'Wali',
  auditor: 'Auditor',
}

export function AdminTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const navigate = useNavigate()
  const { user, logout, activeUnitId, setActiveUnitId } = useAuth()
  const activeUnit = user?.units.find((unit) => unit.id === activeUnitId) ?? user?.units[0]
  const displayName = user?.person?.preferred_name || user?.person?.legal_name || user?.name || 'Pengguna'
  const displayRole = activeUnit?.roles.map((role) => roleLabels[role] ?? role).join(', ') || 'Pengguna'
  const searchWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return
      const input = searchWrapRef.current?.querySelector('input')
      if (input) {
        event.preventDefault()
        input.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-[700] flex h-16 items-center justify-between gap-4 border-b border-line-muted bg-surface px-6 shadow-sticky">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border border-line text-sub hover:bg-raised hover:text-fg lg:hidden"
          aria-label="Buka menu"
          onClick={onOpenSidebar}
        >
          <LuMenu size={18} />
        </button>
        <div className="min-w-0 flex-1 lg:max-w-sm" ref={searchWrapRef}>
          <SearchInput placeholder="Cari siswa, tagihan, jadwal…" />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Dropdown
          trigger={({ open }) => (
            <button
              type="button"
              className={`inline-flex h-8 items-center gap-2 rounded-md border border-line bg-canvas px-2.5 text-xs font-medium text-sub transition-colors hover:border-line-hover hover:text-fg ${
                open ? 'border-line-hover text-fg' : ''
              }`}
            >
              <span className="max-w-35 truncate">{activeUnit?.name ?? 'Belum ada unit'}</span>
              <LuChevronDown size={14} />
            </button>
          )}
        >
          {user?.units.map((unit) => (
            <DropdownItem
              key={unit.id}
              selected={unit.id === activeUnit?.id}
              onSelect={() => setActiveUnitId(unit.id)}
            >
              {unit.name}
            </DropdownItem>
          ))}
          {!user?.units.length && <DropdownItem selected>Tidak ada unit yang ditugaskan</DropdownItem>}
        </Dropdown>

        <button
          type="button"
          className="relative inline-flex size-8 items-center justify-center rounded-md border border-line text-sub transition-colors hover:bg-raised hover:text-fg"
          aria-label="Notifikasi"
        >
          <LuBell size={18} />
          <span className="absolute -top-1.5 -right-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-pill border-2 border-surface bg-primary px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        <ThemeToggle />

        <Dropdown
          trigger={() => (
            <span className="inline-flex items-center gap-2 text-fg">
              <Avatar name={displayName} size="sm" />
              <span className="hidden flex-col leading-tight sm:flex">
                <span className="text-xs font-medium">{displayName}</span>
                <span className="text-[11px] text-sub">{displayRole}</span>
              </span>
              <LuChevronDown size={14} />
            </span>
          )}
        >
          <DropdownItem
            danger
            icon={<LuLogOut size={16} />}
            onSelect={() => {
              void logout().then(() => navigate('/login', { replace: true }))
            }}
          >
            Keluar
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
