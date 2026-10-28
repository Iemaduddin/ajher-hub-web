import type { ReactNode } from 'react'
import { LuConstruction } from 'react-icons/lu'
import { Button, Card, EmptyState, PageHeader } from '../../components/ui'
import { AdminPage } from '../../components/layouts/AdminLayout'

interface ModulePageProps {
  title: string
  description: string
  icon?: ReactNode
}

export function ModulePage({ title, description, icon }: ModulePageProps) {
  return (
    <AdminPage>
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={[{ label: 'Admin', to: '/admin' }, { label: title }]}
        actions={
          <Button variant="primary" icon={icon}>
            Aksi utama
          </Button>
        }
      />
      <Card>
        <EmptyState
          icon={icon ?? <LuConstruction size={22} />}
          title={`${title} — template siap pakai`}
          description="Halaman ini adalah placeholder modul. Ganti EmptyState dengan tabel, form, atau dashboard modul saat implementasi API dimulai."
          action={<Button variant="outline">Pelajari alur modul</Button>}
        />
      </Card>
    </AdminPage>
  )
}
