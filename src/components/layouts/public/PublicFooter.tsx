import { Link } from 'react-router-dom'
import { LuGraduationCap } from 'react-icons/lu'

const YEAR = new Date().getFullYear()

export function PublicFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-wide flex flex-wrap justify-between gap-12 py-12">
        <div className="flex max-w-80 flex-col gap-3">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <LuGraduationCap size={18} />
            </span>
            <span className="brand-name">
              Ajher <span className="brand-name-accent">Hub</span>
            </span>
          </Link>
          <p className="text-sm text-sub">
            Portal Arobidsh Corp — sistem informasi internal yang menyatukan operasional seluruh unit
            pendidikan, dari penerimaan peserta didik hingga alumni.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div className="flex min-w-30 flex-col gap-2">
            <h4 className="text-xs font-medium tracking-[0.04em] text-sub uppercase">Yayasan</h4>
            <a href="#profil" className="text-sm text-sub hover:text-link hover:no-underline">
              Profil
            </a>
            <a href="#unit" className="text-sm text-sub hover:text-link hover:no-underline">
              Unit pendidikan
            </a>
            <a href="#berita" className="text-sm text-sub hover:text-link hover:no-underline">
              Berita
            </a>
          </div>
          <div className="flex min-w-30 flex-col gap-2">
            <h4 className="text-xs font-medium tracking-[0.04em] text-sub uppercase">Akses</h4>
            <Link to="/login" className="text-sm text-sub hover:text-link hover:no-underline">
              Masuk portal
            </Link>
            <span className="text-xs text-dim">Akun dibuat oleh admin unit</span>
          </div>
          <div className="flex min-w-30 flex-col gap-2">
            <h4 className="text-xs font-medium tracking-[0.04em] text-sub uppercase">Kontak</h4>
            <a href="mailto:halo@arobidsh.sch.id" className="text-sm text-sub hover:text-link hover:no-underline">
              halo@arobidsh.sch.id
            </a>
            <span className="text-xs text-dim">Arobidsh Corp</span>
          </div>
        </div>
      </div>
      <div className="container-wide flex items-center justify-between gap-4 border-t border-line py-4 text-xs text-sub">
        <span>&copy; {YEAR} Arobidsh Corp. Seluruh hak cipta dilindungi.</span>
        <span className="font-mono text-dim">Ajher Hub &middot; v0.1.0</span>
      </div>
    </footer>
  )
}
