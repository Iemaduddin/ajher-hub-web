export function Spinner({ size = 16, label }: { size?: number; label?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="status"
      aria-label={label ?? 'Memuat'}
    >
      <span
        className="size-full animate-spin rounded-full border-2 border-line border-t-primary"
        aria-hidden="true"
      />
    </span>
  )
}
