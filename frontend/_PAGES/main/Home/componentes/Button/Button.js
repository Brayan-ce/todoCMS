import Link from 'next/link'
import styles from './Button.module.css'

export default function Button({
  children,
  href,
  variant = 'default',
  className = '',
  type = 'button',
  ...props
}) {
  const cls = `${styles.btn} ${styles[variant] || ''} ${className}`
  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  )
}
