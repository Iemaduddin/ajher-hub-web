import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const inputBase =
  'w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-fg transition-colors ' +
  'placeholder:text-dim hover:border-line-hover ' +
  'focus:border-primary focus:outline-2 focus:-outline-offset-1 focus:outline-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

const invalidClasses = 'border-error focus:border-error focus:outline-error'

interface FieldProps {
  label: ReactNode
  htmlFor?: string
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  children: ReactNode
}

export function Field({ label, htmlFor, hint, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-fg" htmlFor={htmlFor}>
        {label}
        {required && <span className="text-error"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-sub">{hint}</p>}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export function Input({ className = '', invalid, ...rest }: InputProps) {
  return <input className={`${inputBase} ${invalid ? invalidClasses : ''} ${className}`.trim()} {...rest} />
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function Textarea({ className = '', invalid, ...rest }: TextareaProps) {
  return (
    <textarea
      className={`min-h-22 resize-y ${inputBase} ${invalid ? invalidClasses : ''} ${className}`.trim()}
      {...rest}
    />
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean
}

export function Select({ className = '', invalid, children, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`${inputBase} cursor-pointer appearance-none pr-8 ${invalid ? invalidClasses : ''} ${className}`.trim()}
        {...rest}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sub"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"
        />
      </svg>
    </div>
  )
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Checkbox({ label, className = '', ...rest }: CheckboxProps) {
  const box = (
    <span className="relative inline-flex size-4 shrink-0">
      <input
        type="checkbox"
        className="peer size-4 cursor-pointer appearance-none rounded-[3px] border border-line bg-canvas transition-colors checked:border-primary checked:bg-primary hover:border-line-hover"
        {...rest}
      />
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 text-white transition-transform peer-checked:scale-100"
        viewBox="0 0 16 16"
        width="12"
        height="12"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
        />
      </svg>
    </span>
  )

  if (!label) return <span className={className}>{box}</span>

  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 ${className}`.trim()}>
      {box}
      <span className="text-sm text-fg">{label}</span>
    </label>
  )
}

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
  id?: string
}

export function Switch({ checked, onChange, label, disabled, id }: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === 'string' ? label : undefined}
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span
        className={`relative h-[18px] w-8 rounded-pill border transition-colors peer-checked:border-secondary peer-checked:bg-secondary peer-disabled:opacity-60 ${
          checked ? '' : 'border-line bg-raised'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-3 rounded-pill transition-transform ${
            checked ? 'translate-x-[14px] bg-white' : 'bg-fg'
          }`}
        />
      </span>
      {label && <span className="text-sm text-fg">{label}</span>}
    </label>
  )
}
