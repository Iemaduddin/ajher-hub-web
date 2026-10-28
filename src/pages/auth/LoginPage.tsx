import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { Alert, AppInput, Button, Field } from '../../components/ui'

interface LoginLocationState {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true })
    }
  }, [navigate, user])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      await login(String(formData.get('email') ?? ''), String(formData.get('password') ?? ''))
      const state = location.state as LoginLocationState | null
      navigate(state?.from?.pathname ?? '/admin', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Tidak dapat masuk. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-xl">Masuk ke Ajher Hub</h1>
        <p className="mt-2 text-sm text-sub">Gunakan akun yang diberikan admin yayasan.</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {error && <Alert tone="error">{error}</Alert>}

        <Field label="Email" htmlFor="email" required>
          <AppInput
            id="email"
            name="email"
            type="email"
            placeholder="admin.demo@arobidsh.id"
            value="admin.demo@arobidsh.id"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Kata sandi" htmlFor="password" required>
          <AppInput
            id="password"
            name="password"
            type="password"
            placeholder="Kata sandi"
            autoComplete="current-password"
            required
          />
        </Field>

        <Button type="submit" variant="primary" block loading={loading}>
          Masuk
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-sub">
        Belum memiliki akun? Hubungi admin yayasan. <Link to="/">Kembali ke beranda</Link>
      </p>
    </>
  )
}
