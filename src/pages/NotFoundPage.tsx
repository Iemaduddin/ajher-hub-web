import { Link } from 'react-router-dom'
import { Button, EmptyState } from '../components/ui'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
      <EmptyState
        icon={<span className="font-mono">404</span>}
        title="Halaman tidak ditemukan"
        description="Alamat yang kamu buka tidak ada atau sudah dipindahkan."
        action={
          <Link to="/" className="hover:no-underline">
            <Button variant="primary">Kembali ke beranda</Button>
          </Link>
        }
      />
    </div>
  )
}
