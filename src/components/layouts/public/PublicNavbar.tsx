import { Link } from 'react-router-dom'
import { LuGraduationCap } from 'react-icons/lu'
import { Button, ThemeToggle } from '../../ui'

const navLinks = [
  { href: '#profil', label: 'Profil' },
  { href: '#unit', label: 'Unit' },
  { href: '#berita', label: 'Berita' },
  { href: '#kontak', label: 'Kontak' },
]

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-[100] h-16 border-b border-line-muted bg-surface shadow-sticky">
      <div className="container-wide flex h-full items-center justify-between gap-6">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <LuGraduationCap size={18} />
          </span>
          <span className="brand-name">
            Ajher <span className="brand-name-accent">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-sub hover:text-fg hover:no-underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login" className="hover:no-underline">
            <Button variant="primary" size="sm">
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
