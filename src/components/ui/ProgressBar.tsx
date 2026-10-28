interface ProgressBarProps {
  value: number
  max?: number
  tone?: 'primary' | 'success' | 'warning' | 'error'
  label?: string
}

const toneClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

export function ProgressBar({ value, max = 100, tone = 'primary', label }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-pill bg-raised"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={`h-full rounded-pill transition-[width] duration-150 ${toneClasses[tone]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
