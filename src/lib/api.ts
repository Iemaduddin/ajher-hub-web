export interface UnitAccess {
  id: number
  code: string
  name: string
  level: string
  roles: string[]
}

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  person: {
    id: number
    legal_name: string
    preferred_name: string | null
  } | null
  units: UnitAccess[]
}

export interface UnitStudentSummary {
  id: number
  membership_type: 'student'
  local_number: string | null
  start_date: string
  end_date: string | null
  status: string
  person: {
    id: number
    legal_name: string
    preferred_name: string | null
    birth_date: string | null
    status: string
    guardians: { name: string; relationship: string }[]
  }
}

export interface StudentProfile {
  id: number
  legal_name: string
  preferred_name: string | null
  national_id: string | null
  national_student_number: string | null
  place_of_birth: string | null
  birth_date: string | null
  gender: 'male' | 'female' | 'other' | 'unspecified' | null
  religion: string | null
  phone: string | null
  address: string | null
  status: string
  membership: {
    id: number
    local_number: string | null
    status: string
    start_date: string | null
    end_date: string | null
  }
  guardians: { name: string; relationship: string; verified_at: string | null }[]
}

export interface StudentProfilePayload {
  legal_name: string
  preferred_name: string | null
  national_id: string | null
  national_student_number: string | null
  place_of_birth: string | null
  birth_date: string | null
  gender: StudentProfile['gender']
  religion: string | null
  phone: string | null
  address: string | null
}

interface ApiEnvelope<T> {
  data: T
}

interface ApiErrorPayload {
  message?: string
  errors?: Record<string, string[]>
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/+$/, '')
const API_ORIGIN = API_BASE_URL.startsWith('http') ? new URL(API_BASE_URL).origin : ''
const CSRF_COOKIE_URL = `${API_ORIGIN}/sanctum/csrf-cookie`

export class ApiRequestError extends Error {
  public readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')

  if (init.body) {
    headers.set('Content-Type', 'application/json')
  }

  const xsrfCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
    ?.slice('XSRF-TOKEN='.length)

  if (xsrfCookie) {
    headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfCookie))
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers, credentials: 'include' })
  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const errorPayload = payload as ApiErrorPayload | null
    const validationMessage = errorPayload?.errors
      ? Object.values(errorPayload.errors).flat()[0]
      : undefined

    throw new ApiRequestError(
      validationMessage || errorPayload?.message || 'Permintaan ke server gagal.',
      response.status,
    )
  }

  return payload as T
}

export async function login(email: string, password: string): Promise<AuthenticatedUser> {
  const csrfResponse = await fetch(CSRF_COOKIE_URL, {
    headers: { Accept: 'application/json' },
    credentials: 'include',
  })

  if (!csrfResponse.ok) {
    throw new ApiRequestError('Gagal menyiapkan sesi aman. Coba lagi.', csrfResponse.status)
  }

  const response = await request<ApiEnvelope<AuthenticatedUser>>('/session/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  return response.data
}

export async function fetchCurrentUser(): Promise<AuthenticatedUser> {
  const response = await request<ApiEnvelope<AuthenticatedUser>>('/me')
  return response.data
}

export async function fetchUnitStudents(unitId: number): Promise<UnitStudentSummary[]> {
  const query = new URLSearchParams({
    membership_type: 'student',
    status: 'all',
    per_page: '100',
  })
  const response = await request<ApiEnvelope<UnitStudentSummary[]>>(`/units/${unitId}/people?${query}`)
  return response.data
}

export async function fetchStudentProfile(unitId: number, personId: number): Promise<StudentProfile> {
  const response = await request<ApiEnvelope<StudentProfile>>(`/units/${unitId}/students/${personId}`)
  return response.data
}

export async function updateStudentProfile(
  unitId: number,
  personId: number,
  profile: StudentProfilePayload,
): Promise<StudentProfile> {
  const response = await request<ApiEnvelope<StudentProfile>>(`/units/${unitId}/students/${personId}`, {
    method: 'PATCH',
    body: JSON.stringify(profile),
  })
  return response.data
}

export async function logout(): Promise<void> {
  await request<{ message: string }>('/session/logout', { method: 'POST' })
}
