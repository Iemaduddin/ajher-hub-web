import { useMemo, useState } from 'react'
import { LuDownload, LuFilter, LuEllipsis, LuPlus, LuTrash2 } from 'react-icons/lu'
import {
  Alert,
  AppInput,
  Avatar,
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  EmptyState,
  Field,
  Modal,
  Pagination,
  PageHeader,
  SearchInput,
  Select,
  StatusBadge,
  Table,
  Td,
  Th,
  Tr,
} from '../../components/ui'
import { AdminPage } from '../../components/layouts/AdminLayout'

interface Student {
  id: number
  name: string
  nis: string
  kelas: string
  unit: string
  status: 'Aktif' | 'Cuti' | 'Pindah' | 'Lulus'
  wali: string
}

const students: Student[] = [
  { id: 1, name: 'Aisyah Putri', nis: '2410012', kelas: 'X-A', unit: 'SMA', status: 'Aktif', wali: 'Hendra Wijaya' },
  { id: 2, name: 'Rizky Ramadhan', nis: '2410013', kelas: 'X-B', unit: 'SMA', status: 'Aktif', wali: 'Sari Ramadhan' },
  { id: 3, name: 'Nadia Khalila', nis: '2310045', kelas: 'XI-IPA1', unit: 'SMA', status: 'Pindah', wali: 'Ahmad Khalil' },
  { id: 4, name: 'Dimas Prayoga', nis: '2410018', kelas: 'X-C', unit: 'SMA', status: 'Cuti', wali: 'Rina Prayoga' },
  { id: 5, name: 'Salsabila Nur', nis: '2410021', kelas: 'X-A', unit: 'SMA', status: 'Aktif', wali: 'Yusuf Nur' },
  { id: 6, name: 'Farhan Maulana', nis: '2310052', kelas: 'XI-IPS2', unit: 'SMA', status: 'Aktif', wali: 'Lia Maulana' },
  { id: 7, name: 'Kayla Oktaviani', nis: '2410030', kelas: 'X-B', unit: 'SMA', status: 'Aktif', wali: 'Doni Oktavianto' },
  { id: 8, name: 'Bagas Saputra', nis: '2210009', kelas: 'XII-MIPA1', unit: 'SMA', status: 'Lulus', wali: 'Tuti Saputri' },
]

const statusTone: Record<Student['status'], 'success' | 'warning' | 'info' | 'neutral'> = {
  Aktif: 'success',
  Cuti: 'warning',
  Pindah: 'info',
  Lulus: 'neutral',
}

const PAGE_SIZE = 6

export function StudentsPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Student | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter((student) => {
      const matchQuery =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.nis.includes(q) ||
        student.kelas.toLowerCase().includes(q)
      const matchStatus = !status || student.status === status
      return matchQuery && matchStatus
    })
  }, [query, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const rows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <AdminPage>
      <PageHeader
        title="Peserta Didik"
        description="Data induk peserta didik lintas unit — satu Global Person ID per individu."
        breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: 'Akademik' }, { label: 'Peserta Didik' }]}
        actions={
          <>
            <Button variant="outline" icon={<LuDownload size={16} />}>
              Ekspor
            </Button>
            <Button variant="primary" icon={<LuPlus size={16} />} onClick={() => setCreateOpen(true)}>
              Tambah
            </Button>
          </>
        }
      />

      <Alert tone="info" title="Data template">
        Baris di bawah adalah data contoh. Hubungkan ke REST API Laravel untuk data sebenarnya.
      </Alert>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 border-b border-line p-3">
          <SearchInput
            className="min-w-50 max-w-80 flex-1"
            placeholder="Cari nama, NIS, atau kelas…"
            shortcut={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
          <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-2.5 inline-flex text-sub" aria-hidden="true">
              <LuFilter size={14} />
            </span>
            <Select
              aria-label="Filter status"
              className="min-w-40 pl-8"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value)
                setPage(1)
              }}
            >
              <option value="">Semua status</option>
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Pindah">Pindah</option>
              <option value="Lulus">Lulus</option>
            </Select>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Chip variant="topic">SMA</Chip>
            <Chip variant="neutral">TA 2026/2027</Chip>
          </div>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title="Tidak ada peserta didik"
            description="Ubah kata kunci atau filter status untuk melihat data lain."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('')
                  setStatus('')
                }}
              >
                Reset filter
              </Button>
            }
          />
        ) : (
          <>
            <Table>
              <thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th>NIS</Th>
                  <Th>Kelas</Th>
                  <Th>Wali</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Aksi</Th>
                </Tr>
              </thead>
              <tbody>
                {rows.map((student) => (
                  <Tr key={student.id}>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Avatar name={student.name} size="sm" />
                        <div className="flex flex-col leading-tight">
                          <span className="font-medium">{student.name}</span>
                          <span className="text-xs font-normal text-sub">{student.unit}</span>
                        </div>
                      </div>
                    </Td>
                    <Td>
                      <span className="font-mono text-xs text-sub">{student.nis}</span>
                    </Td>
                    <Td>{student.kelas}</Td>
                    <Td className="text-sub">{student.wali}</Td>
                    <Td>
                      <StatusBadge tone={statusTone[student.status]} dot>
                        {student.status}
                      </StatusBadge>
                    </Td>
                    <Td className="text-right">
                      <Dropdown
                        trigger={() => (
                          <button
                            type="button"
                            className="inline-flex size-7 items-center justify-center rounded-md text-sub hover:bg-raised hover:text-fg"
                            aria-label={`Aksi ${student.name}`}
                          >
                            <LuEllipsis size={16} />
                          </button>
                        )}
                      >
                        <DropdownItem onSelect={() => setSelected(student)}>Lihat detail</DropdownItem>
                        <DropdownItem>Edit data</DropdownItem>
                        <DropdownItem>Pindahkan kelas</DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem danger icon={<LuTrash2 size={16} />}>
                          Nonaktifkan
                        </DropdownItem>
                      </Dropdown>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              total={filtered.length}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Tambah peserta didik"
        description="Entri baru ke data induk. Nomor induk unit dibuat otomatis."
        footer={
          <>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={() => setCreateOpen(false)}>
              Simpan
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Field label="Nama lengkap" htmlFor="new-name" required>
            <AppInput id="new-name" placeholder="Nama sesuai akta" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="NIS (opsional)" htmlFor="new-nis">
              <AppInput id="new-nis" placeholder="Otomatis jika kosong" />
            </Field>
            <Field label="Kelas" htmlFor="new-class" required>
              <Select id="new-class" defaultValue="X-A">
                <option>X-A</option>
                <option>X-B</option>
                <option>X-C</option>
                <option>XI-IPA1</option>
              </Select>
            </Field>
          </div>
          <Field label="Wali / orang tua" htmlFor="new-wali">
            <AppInput id="new-wali" placeholder="Nama wali terdaftar" />
          </Field>
        </div>
      </Modal>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        description={selected ? `NIS ${selected.nis} · Kelas ${selected.kelas}` : undefined}
        footer={
          <Button variant="outline" onClick={() => setSelected(null)}>
            Tutup
          </Button>
        }
      >
        {selected && (
          <dl className="flex flex-col gap-3">
            {[
              {
                label: 'Status',
                value: (
                  <StatusBadge tone={statusTone[selected.status]} dot>
                    {selected.status}
                  </StatusBadge>
                ),
              },
              { label: 'Unit', value: selected.unit },
              { label: 'Wali', value: selected.wali },
              {
                label: 'Global Person ID',
                value: <span className="font-mono">GPI-{String(selected.id).padStart(6, '0')}</span>,
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0">
                <dt className="text-xs text-sub">{row.label}</dt>
                <dd className="text-right text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>
    </AdminPage>
  )
}
