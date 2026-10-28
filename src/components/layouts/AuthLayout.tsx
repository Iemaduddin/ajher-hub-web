import { Link, Outlet } from 'react-router-dom'
import { LuGraduationCap } from 'react-icons/lu'
import { ThemeToggle } from '../ui'

const YEAR = new Date().getFullYear()

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(47,129,247,0.12),transparent)] px-4 py-8">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="w-full max-w-[400px] rounded-md border border-line bg-surface p-8">
        <Link to="/" className="brand mx-auto mb-6 justify-center">
          <span className="brand-mark" aria-hidden="true">
            <LuGraduationCap size={18} />
          </span>
          <span className="brand-name">
            Ajher <span className="brand-name-accent">Hub</span>
          </span>
        </Link>
        <Outlet />
      </div>
      <p className="text-center text-xs text-dim">
        &copy; {YEAR} Ajher Hub &middot; Arobidsh Corp
      </p>
    </div>
  )
}
