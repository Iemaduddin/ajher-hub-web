export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'ajher-theme'

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* localStorage bisa unavailable — abaikan */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* abaikan quota/private mode */
  }
}

export function initTheme(): void {
  applyTheme(getStoredTheme())
}
