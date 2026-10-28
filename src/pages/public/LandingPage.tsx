import { Link } from 'react-router-dom'
import {
  LuArrowRight,
  LuCalendarDays,
  LuClock,
  LuMail,
  LuMapPin,
  LuNewspaper,
  LuPhone,
  LuSchool,
} from 'react-icons/lu'
import { Button, Chip } from '../../components/ui'

const units = [
  {
    name: 'SD Nusantara 1',
    level: 'SD',
    description: 'Pendidikan dasar dengan fokus literasi, numerasi, dan karakter.',
  },
  {
    name: 'SMP Nusantara 1',
    level: 'SMP',
    description: 'Pendidikan menengah pertama dengan pembinaan akademik dan ekstrakurikuler.',
  },
  {
    name: 'SMA Nusantara 1',
    level: 'SMA/SMK',
    description: 'Pendidikan menengah atas dan keahlian dengan jalur IPA, IPS, dan kompetensi keahlian.',
  },
]

const news = [
  {
    date: '20 Oktober 2026',
    title: 'Daftar ulang TA 2026/2027 dibuka kembali',
    excerpt: 'Periode daftar ulang diperpanjang untuk seluruh jenjang. Hubungi unit masing-masing.',
  },
  {
    date: '12 Oktober 2026',
    title: 'Jadwal ujian tengah semester diumumkan',
    excerpt: 'Jadwal dan kisi-kisi ujian tengah semester telah dipublikasikan di portal masing-masing unit.',
  },
  {
    date: '28 September 2026',
    title: 'Prestasi siswa tingkat provinsi',
    excerpt: 'Tim Olimpiade Sains SMA Nusantara 1 meraih juara pada kompetisi tingkat provinsi.',
  },
]

const contacts = [
  { icon: <LuMapPin size={16} />, label: 'Alamat', value: 'Jl. Pendidikan Nusantara No. 1, Tangerang, Banten' },
  { icon: <LuMail size={16} />, label: 'Email', value: 'halo@arobidsh.sch.id' },
  { icon: <LuPhone size={16} />, label: 'Telepon', value: '(021) 5555-0123' },
  { icon: <LuClock size={16} />, label: 'Layanan', value: 'Senin–Jumat, 08.00–16.00 WIB' },
]

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 flex max-w-[640px] flex-col gap-3">
      <h2 className="text-3xl tracking-[-0.02em]">{title}</h2>
      <p className="text-base text-sub">{subtitle}</p>
    </div>
  )
}

export function LandingPage() {
  return (
    <>
      {/* Hero — profil yayasan */}
      <section className="border-b border-line-muted bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(47,129,247,0.14),transparent_70%)] py-16 max-sm:pt-10">
        <div className="mx-auto flex max-w-[820px] flex-col items-center gap-4 px-6 text-center">
          <Chip variant="topic">Yayasan pendidikan &middot; SD &middot; SMP &middot; SMA/SMK</Chip>
          <h1 className="text-4xl leading-[1.1] tracking-[-0.02em] max-sm:text-[28px]">
            Arobidsh Corp
            <br />
            Mendidik Generasi, Menyatukan Operasional
          </h1>
          <p className="max-w-[640px] text-base text-sub">
            Yayasan pendidikan yang mengelola satuan SD, SMP, dan SMA/SMK di bawah satu tata kelola.
            Melalui portal Ajher Hub, seluruh unit bekerja dengan satu data induk.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link to="/login" className="hover:no-underline">
              <Button variant="primary" size="md" iconEnd={<LuArrowRight size={16} />}>
                Masuk portal
              </Button>
            </Link>
            <a href="#profil">
              <Button variant="outline" size="md">
                Kenali yayasan
              </Button>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-8 border-t border-line-muted pt-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-semibold tracking-[-0.02em]">3</span>
              <span className="text-xs tracking-[0.04em] text-sub uppercase">jenjang terpadu</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-semibold tracking-[-0.02em]">1</span>
              <span className="text-xs tracking-[0.04em] text-sub uppercase">tata kelola yayasan</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-semibold tracking-[-0.02em]">24/7</span>
              <span className="text-xs tracking-[0.04em] text-sub uppercase">akses portal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profil */}
      <section className="py-16 max-sm:py-10" id="profil">
        <div className="container-wide">
          <SectionHead title="Tentang Arobidsh Corp" subtitle="Satu yayasan, banyak unit, satu pintu data." />
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-sub">
              <p>
                Arobidsh Corp adalah yayasan pendidikan yang mengelola satuan pendidikan pada jenjang SD,
                SMP, dan SMA/SMK. Yayasan menetapkan kebijakan, standar mutu, dan tata kelola pusat,
                sementara setiap unit mempunyai otonomi atas operasional harian sesuai karakteristik
                jenjangnya.
              </p>
              <p>
                <strong className="font-semibold text-fg">Ajher Hub</strong> adalah sistem informasi internal
                yayasan yang menyatukan administrasi, akademik, keuangan, SDM, dan komunikasi seluruh unit —
                dari penerimaan peserta didik hingga alumni.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  'Data induk peserta didik & pegawai lintas unit',
                  'Presensi, akademik, dan keuangan dalam satu portal',
                  'Hak akses berbasis peran, unit, dan penugasan',
                ].map((item) => (
                  <li key={item} className="relative pl-4 text-sm text-fg">
                    <span className="absolute top-2 left-0 size-1.5 rounded-pill bg-success" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-4">
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary [&>svg]:size-5">
                <LuSchool size={20} />
              </span>
              <h3 className="text-base">Satuan pendidikan</h3>
              <p className="text-sm text-sub">
                SD, SMP, serta SMA/SMK di bawah naungan satu yayasan, dengan data dan kebijakan yang
                terhubung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unit */}
      <section className="border-y border-line-muted bg-surface py-16 max-sm:py-10" id="unit">
        <div className="container-wide">
          <SectionHead
            title="Unit pendidikan"
            subtitle="Setiap unit mengelola operasionalnya sendiri dengan standar mutu dari yayasan."
          />
          <div className="overflow-hidden rounded-md border border-line bg-canvas">
            {units.map((unit) => (
              <div
                key={unit.name}
                className="flex items-center gap-3 border-b border-line px-4 py-3 transition-colors last:border-b-0 hover:bg-surface"
              >
                <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-md border border-line bg-raised text-sub">
                  <LuSchool size={16} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium text-fg">{unit.name}</span>
                  <span className="text-xs text-sub">{unit.description}</span>
                </div>
                <Chip variant="neutral">{unit.level}</Chip>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita */}
      <section className="py-16 max-sm:py-10" id="berita">
        <div className="container-wide">
          <SectionHead title="Berita & pengumuman" subtitle="Kabar terbaru dari yayasan dan unit pendidikan." />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.title}
                className="flex flex-col gap-2 rounded-md border border-line bg-surface p-4 transition-colors hover:border-line-hover"
              >
                <span className="mb-1 inline-flex size-[34px] items-center justify-center rounded-md bg-primary/15 text-primary [&>svg]:size-[18px]">
                  <LuNewspaper size={18} />
                </span>
                <div className="inline-flex items-center gap-1 text-xs text-sub">
                  <LuCalendarDays size={14} />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base">{item.title}</h3>
                <p className="text-sm text-sub">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section className="border-y border-line-muted bg-surface py-16 max-sm:py-10" id="kontak">
        <div className="container-readable">
          <SectionHead
            title="Hubungi kami"
            subtitle="Pertanyaan seputar yayasan dan pendaftaran dapat disampaikan lewat kontak berikut."
          />
          <div className="grid grid-cols-1 gap-4 rounded-md border border-line bg-canvas p-6 sm:grid-cols-2 max-sm:p-4">
            {contacts.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-md border border-line bg-surface text-sub">
                  {item.icon}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-xs tracking-[0.04em] text-sub uppercase">{item.label}</span>
                  <span className="text-sm text-fg">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
