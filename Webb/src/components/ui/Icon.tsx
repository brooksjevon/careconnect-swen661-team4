type IconProps = {
  src: string
  /** Rendered size in CSS pixels (icons are square). */
  size: number
  className?: string
  /** Defer loading until the icon is near the viewport (use for below-the-fold icons). */
  lazy?: boolean
}

/**
 * Decorative icon image. Always sets width/height (no layout shift) and decodes
 * off the main thread. Icons are SVG: vector, so one small file is sharp at every
 * size and pixel density — no WebP/srcset variants needed.
 */
export function Icon({ src, size, className, lazy = false }: IconProps) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={className}
      decoding="async"
      loading={lazy ? "lazy" : undefined}
    />
  )
}
