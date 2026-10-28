import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  fetchCurrentUser,
  login as requestLogin,
  logout as requestLogout,
  type AuthenticatedUser,
} from '../lib/api'

interface AuthContextValue {
  user: AuthenticatedUser | null
  ready: boolean
  activeUnitId: number | null
  setActiveUnitId: (unitId: number) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const ACTIVE_UNIT_KEY = 'ajher-hub.active-unit-id'
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [ready, setReady] = useState(false)
  const [activeUnitId, setActiveUnitIdState] = useState<number | null>(null)

  const applyAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {
    const savedUnitId = Number(window.sessionStorage.getItem(ACTIVE_UNIT_KEY))
    const selectedUnit = authenticatedUser.units.find((unit) => unit.id === savedUnitId)
      ?? authenticatedUser.units[0]
      ?? null

    setUser(authenticatedUser)
    setActiveUnitIdState(selectedUnit?.id ?? null)

    if (selectedUnit) {
      window.sessionStorage.setItem(ACTIVE_UNIT_KEY, String(selectedUnit.id))
    } else {
      window.sessionStorage.removeItem(ACTIVE_UNIT_KEY)
    }
  }

  const setActiveUnitId = (unitId: number) => {
    if (!user?.units.some((unit) => unit.id === unitId)) return

    setActiveUnitIdState(unitId)
    window.sessionStorage.setItem(ACTIVE_UNIT_KEY, String(unitId))
  }

  useEffect(() => {
    let active = true
    window.sessionStorage.removeItem('ajher-hub.access-token')

    void fetchCurrentUser()
      .then((currentUser) => {
        if (active) applyAuthenticatedUser(currentUser)
      })
      .catch(() => {
        window.sessionStorage.removeItem(ACTIVE_UNIT_KEY)
        if (active) {
          setUser(null)
          setActiveUnitIdState(null)
        }
      })
      .finally(() => {
        if (active) setReady(true)
      })

    return () => {
      active = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    applyAuthenticatedUser(await requestLogin(email, password))
  }

  const logout = async () => {
    await requestLogout()
    window.sessionStorage.removeItem(ACTIVE_UNIT_KEY)
    setUser(null)
    setActiveUnitIdState(null)
  }

  return (
    <AuthContext.Provider value={{ user, ready, activeUnitId, setActiveUnitId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
