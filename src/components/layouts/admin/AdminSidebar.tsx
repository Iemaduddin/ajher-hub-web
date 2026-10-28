import { NavLink, Link } from 'react-router-dom'
import { type ReactNode } from 'react'
import {
  LuBookOpen,
  LuCalendarCheck,
  LuGraduationCap,
  LuLayoutDashboard,
  LuSettings,
  LuSparkles,
  LuUsers,
  LuWallet,
  LuX,
} from 'react-icons/lu'
import { useAuth } from '../../../auth/AuthContext'

interface NavSection {
  label: string
  items: { to: string; label: string; icon: ReactNode; badge?: string }[]
}

const navSections: NavSection[] = [
  {
    label: 'Utama',
    items: [
      { to: '/admin', label: 'Dasbor', icon: <LuLayoutDashboard size={16} /> },
      { to: '/admin/presensi', label: 'Presensi', icon: <LuCalendarCheck size={16} />, badge: '12' },
    ],
  },
  {
    label: 'Akademik',
    items: [
      { to: '/admin/peserta-didik', label: 'Peserta Didik', icon: <LuUsers size={16} /> },
      { to: '/admin/akademik', label: 'Akademik', icon: <LuBookOpen size={16} /> },
    ],
  },
  {
    label: 'Operasional',
    items: [
      { to: '/admin/sdm', label: 'SDM', icon: <LuUsers size={16} /> },
      { to: '/admin/keuangan', label: 'Keuangan', icon: <LuWallet size={16} /> },
    ],
  },
  {
    label: 'Sistem',
    items: [{ to: '/admin/pengaturan', label: 'Pengaturan', icon: <LuSettings size={16} /> }],
  },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-md border-l-2 px-3 py-[7px] text-sm transition-[background-color,color] duration-100',
    isActive
      ? 'border-accent rounded-l-none bg-surface font-medium text-fg'
      : 'border-transparent text-sub hover:bg-surface hover:text-fg',
  ].join(' ')

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, activeUnitId } = useAuth()
  const activeUnit = user?.units.find((unit) => unit.id === activeUnitId) ?? user?.units[0]

  return (
    <>
      <aside
        className={`fixed top-0 bottom-0 left-0 z-[800] flex w-[248px] -translate-x-full flex-col overflow-y-auto border-r border-line-muted bg-canvas transition-transform duration-150 lg:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-muted px-4">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <LuGraduationCap size={18} />
            </span>
            <span className="brand-name">
              Ajher <span className="brand-name-accent">Hub</span>
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex size-7 items-center justify-center rounded-md text-sub hover:bg-raised hover:text-fg lg:hidden"
            aria-label="Tutup menu"
            onClick={onClose}
          >
            <LuX size={18} />
          </button>
        </div>

        <div className="mx-3 mt-3 flex flex-col gap-0.5 rounded-md border border-line bg-surface p-2">
          <span className="text-[11px] tracking-[0.04em] text-sub uppercase">Unit aktif</span>
          <span className="text-xs font-medium text-fg">{activeUnit?.name ?? 'Belum ada unit'}</span>
        </div>

        <nav className="flex flex-col gap-4 p-3" aria-label="Navigasi admin">
          {navSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-0.5">
              <span className="px-3 pb-1 text-[11px] font-medium tracking-[0.06em] text-dim uppercase">
                {section.label}
              </span>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  className={navLinkClass}
                  onClick={onClose}
                >
                  <span className="inline-flex shrink-0">{item.icon}</span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex h-[18px] min-w-5 items-center justify-center rounded-pill bg-primary/20 px-1.5 text-[11px] font-medium text-primary">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-line-muted p-3">
          <NavLink to="/" className={navLinkClass}>
            <span className="inline-flex shrink-0">
              <LuSparkles size={16} />
            </span>
            <span className="min-w-0 flex-1 truncate">Lihat situs publik</span>
          </NavLink>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-[750] bg-backdrop lg:hidden" aria-hidden="true" onClick={onClose} />
      )}
    </>
  )
}
