import { useId, useState, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { formatRupiah } from '../../lib/format'

export type AppInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'currency'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'search'

interface AppInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  type?: AppInputType
  value?: string
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  invalid?: boolean
}

const inputBase =
  'w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-fg transition-colors ' +
  'placeholder:text-dim hover:border-line-hover ' +
  'focus:border-primary focus:outline-2 focus:-outline-offset-1 focus:outline-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

export function AppInput({ type = 'text', value, onChange, invalid, className = '', ...rest }: AppInputProps) {
  const [revealed, setRevealed] = useState(false)
  const autoId = useId()
  const inputId = rest.id ?? autoId
  const classes = `${inputBase} ${invalid ? 'border-error focus:border-error focus:outline-error' : ''} ${className}`.trim()

  if (type === 'currency') {
    const digits = (value ?? '').replace(/\D/g, '')
    return (
      <input
        {...rest}
        id={inputId}
        className={classes}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={digits ? formatRupiah(digits) : ''}
        placeholder={rest.placeholder ?? 'Rp 0'}
        onChange={(event) => {
          const nextDigits = event.target.value.replace(/\D/g, '')
          onChange?.(nextDigits, event)
        }}
      />
    )
  }

  if (type === 'password') {
    return (
      <span className="relative block">
        <input
          {...rest}
          id={inputId}
          className={`${classes} pr-9.5`}
          type={revealed ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange?.(event.target.value, event)}
        />
        <button
          type="button"
          className="absolute top-1/2 right-1.5 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-sub transition-colors hover:bg-raised hover:text-fg"
          aria-label={revealed ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          tabIndex={-1}
          onClick={() => setRevealed((current) => !current)}
        >
          {revealed ? <LuEyeOff size={16} /> : <LuEye size={16} />}
        </button>
      </span>
    )
  }

  return (
    <input
      {...rest}
      id={inputId}
      className={classes}
      type={type}
      value={value}
      onChange={(event) => onChange?.(event.target.value, event)}
    />
  )
}
