import { Link } from 'react-router-dom'
import {
  LuArrowUpRight,
  LuCalendarCheck,
  LuCircleDollarSign,
  LuFileText,
  LuQrCode,
  LuUserPlus,
  LuUsers,
} from 'react-icons/lu'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  LanguageDot,
  PageHeader,
  ProgressBar,
  StatusBadge,
  StatCard,
  Table,
  Td,
  Th,
  Tr,
} from '../../components/ui'
import { AdminGrid, AdminGridSidebar, AdminPage } from '../../components/layouts/AdminLayout'

const stats = [
  { label: 'Peserta didik aktif', value: '1.248', icon: <LuUsers size={16} />, delta: 4.2, deltaLabel: 'vs bulan lalu' },
  { label: 'Kehadiran hari ini', value: '94,6%', icon: <LuCalendarCheck size={16} />, delta: 1.1, deltaLabel: 'vs kemarin' },
  { label: 'Tagihan belum lunas', value: 'Rp 84,2 jt', icon: <LuCircleDollarSign size={16} />, delta: -6.8, deltaLabel: 'vs bulan lalu' },
  { label: 'Pengumuman aktif', value: '12', icon: <LuFileText size={16} />, deltaLabel: '3 baru minggu ini' },
]

const weekAttendance = [
  { day: 'Sen', value: 96 },
  { day: 'Sel', value: 94 },
  { day: 'Rab', value: 97 },
  { day: 'Kam', value: 93 },
  { day: 'Jum', value: 91 },
  { day: 'Sab', value: 88 },
]

const recentStudents = [
  { name: 'Aisyah Putri', nis: '2410012', kelas: 'X-A', status: 'Aktif', tone: 'success' as const },
  { name: 'Rizky Ramadhan', nis: '2410013', kelas: 'X-B', status: 'Aktif', tone: 'success' as const },
  { name: 'Nadia Khalila', nis: '2310045', kelas: 'XI-IPA1', status: 'Pindah', tone: 'warning' as const },
  { name: 'Dimas Prayoga', nis: '2410018', kelas: 'X-C', status: 'Cuti', tone: 'neutral' as const },
]

const activities = [
  { title: 'Pembayaran SPP diterima', meta: 'Aisyah Putri · XI IPA 1 · 8 menit lalu', tone: 'success' },
  { title: 'Presensi QR gagal sinkron', meta: 'Kelas X-B · 1 antrean lokal · 21 menit lalu', tone: 'error' },
  { title: 'Pengajuan izin menunggu persetujuan', meta: 'Dimas Prayoga · sakit · 1 jam lalu', tone: 'warning' },
  { title: 'Data pegawai diperbarui', meta: 'Siti Rahayu · kontrak diperpanjang · 3 jam lalu', tone: 'info' },
]

const activityDotClasses: Record<string, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-primary',
}

function CardLink({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-link hover:text-primary-hover hover:no-underline">
      {children}
    </span>
  )
}

export function DashboardPage() {
  return (
    <AdminPage>
      <PageHeader
        title="Dasbor"
        description="Ringkasan operasional SMA Nusantara 1 · Tahun Ajaran 2026/2027"
        breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Dasbor' }]}
        actions={
          <>
            <Link to="/admin/presensi" className="hover:no-underline">
              <Button variant="outline" icon={<LuQrCode size={16} />}>
                Presensi QR
              </Button>
            </Link>
            <Link to="/admin/peserta-didik" className="hover:no-underline">
              <Button variant="primary" icon={<LuUserPlus size={16} />}>
                Tambah peserta didik
              </Button>
            </Link>
          </>
        }
      />

      <AdminGrid>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </AdminGrid>

      <AdminGridSidebar>
        <Card>
          <CardHeader
            title="Kehadiran minggu ini"
            description="Persentase hadir dari seluruh kelas"
            actions={
              <Link to="/admin/presensi" className="hover:no-underline">
                <CardLink>
                  Detail <LuArrowUpRight size={14} />
                </CardLink>
              </Link>
            }
          />
          <CardBody>
            <div className="flex h-44 items-end gap-4" role="img" aria-label="Grafik kehadiran mingguan">
              {weekAttendance.map((item) => (
                <div key={item.day} className="flex h-full flex-1 flex-col items-center gap-2">
                  <span className="font-mono text-[11px] text-sub">{item.value}%</span>
                  <div className="flex w-full max-w-10 flex-1 items-end overflow-hidden rounded-[3px] bg-raised">
                    <div
                      className="w-full rounded-t-[3px] bg-linear-to-b from-primary to-primary/55"
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-xs text-sub">{item.day}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Aktivitas terbaru" description="Perubahan & peristiwa penting hari ini" />
          <CardBody>
            <ul className="flex flex-col">
              {activities.map((item, index) => (
                <li
                  key={item.title}
                  className={`flex items-start gap-3 py-3 ${
                    index === 0 ? 'pt-0' : index === activities.length - 1 ? 'border-b-0 pb-0' : ''
                  } ${index !== activities.length - 1 ? 'border-b border-line' : ''}`}
                >
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-pill ${activityDotClasses[item.tone]}`}
                    aria-hidden="true"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm text-fg">{item.title}</span>
                    <span className="text-xs text-sub">{item.meta}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </AdminGridSidebar>

      <Card>
        <CardHeader
          title="Peserta didik terbaru"
          description="Entri terakhir pada data induk"
          actions={
            <Link to="/admin/peserta-didik">
              <Button variant="outline" size="sm">
                Lihat semua
              </Button>
            </Link>
          }
        />
        <Table>
          <thead>
            <Tr>
              <Th>Nama</Th>
              <Th>NIS</Th>
              <Th>Kelas</Th>
              <Th>Status</Th>
              <Th className="text-right">Aksi</Th>
            </Tr>
          </thead>
          <tbody>
            {recentStudents.map((student) => (
              <Tr key={student.nis}>
                <Td>
                  <div className="flex items-center gap-2 font-medium">
                    <Avatar name={student.name} size="sm" />
                    <span>{student.name}</span>
                  </div>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-sub">{student.nis}</span>
                </Td>
                <Td>{student.kelas}</Td>
                <Td>
                  <StatusBadge tone={student.tone} dot>
                    {student.status}
                  </StatusBadge>
                </Td>
                <Td className="text-right">
                  <Link to="/admin/peserta-didik" className="hover:no-underline">
                    <CardLink>
                      Detail <LuArrowUpRight size={14} />
                    </CardLink>
                  </Link>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <div className="flex flex-col gap-2 border-t border-line p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-sub">Kelengkapan data induk</span>
            <span className="font-mono">86%</span>
          </div>
          <ProgressBar value={86} tone="success" label="Kelengkapan data induk" />
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-sub">
            <span className="inline-flex items-center gap-1">
              <LanguageDot color="#3FB950" /> Terlengkap
            </span>
            <span>Sisa 14%: dokumen & riwayat wali</span>
          </div>
        </div>
      </Card>
    </AdminPage>
  )
}
