import { useState } from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { applyTheme, getStoredTheme, type Theme } from '../../lib/theme'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme())

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <button
      type="button"
      className={`inline-flex size-8 items-center justify-center rounded-md border border-line bg-transparent text-sub transition-[background-color,border-color,color] duration-100 hover:border-line-hover hover:bg-raised hover:text-fg ${className}`.trim()}
      aria-label={theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
      onClick={toggle}
    >
      {theme === 'dark' ? <LuSun size={16} /> : <LuMoon size={16} />}
    </button>
  )
}
