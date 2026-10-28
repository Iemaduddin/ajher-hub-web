interface AvatarProps {
  name: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'size-5 rounded-sm text-[9px]',
  sm: 'size-6 rounded-md text-[10px]',
  md: 'size-8 rounded-lg text-xs',
  lg: 'size-10 rounded-lg text-sm',
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const classes = `inline-flex shrink-0 items-center justify-center border border-line bg-raised font-medium select-none ${sizeClasses[size]}`

  if (src) {
    return <img className={`${classes} object-cover`} src={src} alt={name} />
  }

  return (
    <span className={classes} role="img" aria-label={name}>
      {initials(name) || '?'}
    </span>
  )
}
