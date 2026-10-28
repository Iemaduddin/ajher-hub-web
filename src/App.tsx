import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import { AdminLayout } from './components/layouts/AdminLayout'
import { AuthLayout } from './components/layouts/AuthLayout'
import { PublicLayout } from './components/layouts/PublicLayout'
import { AuthProvider } from './auth/AuthContext'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ModulePage } from './pages/admin/ModulePage'
import { StudentsPage } from './pages/admin/StudentsPage'
import { LandingPage } from './pages/public/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="peserta-didik" element={<StudentsPage />} />
              <Route
                path="presensi"
                element={
                  <ModulePage
                    title="Presensi"
                    description="Presensi QR online/offline, izin, sakit, keterlambatan, dan rekap kehadiran."
                  />
                }
              />
              <Route
                path="akademik"
                element={
                  <ModulePage
                    title="Akademik"
                    description="Kurikulum, kelas, jadwal, penugasan pengajar, penilaian, dan rapor."
                  />
                }
              />
              <Route
                path="sdm"
                element={
                  <ModulePage
                    title="SDM"
                    description="Data pegawai, kontrak, penugasan lintas unit, cuti, dan beban kerja."
                  />
                }
              />
              <Route
                path="keuangan"
                element={
                  <ModulePage
                    title="Keuangan"
                    description="Tagihan, pembayaran, kas unit, anggaran, dan konsolidasi yayasan."
                  />
                }
              />
              <Route
                path="pengaturan"
                element={
                  <ModulePage
                    title="Pengaturan"
                    description="Konfigurasi unit, periode akademik, role, alur persetujuan, dan notifikasi."
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App