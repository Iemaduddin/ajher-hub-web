function groupThousands(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatRupiah(digits: string): string {
  const clean = digits.replace(/\D/g, '')
  if (!clean) return ''
  return `Rp ${groupThousands(clean)}`
}
