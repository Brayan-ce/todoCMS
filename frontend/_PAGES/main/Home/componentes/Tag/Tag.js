import Link from 'next/link'
import styles from './Tag.module.css'

export default function Tag({
  href,
  children,
  active = false,
  value,
  asButton = false,
  className = '',
  title,
  onClick,
}) {
  const cls = `${styles.tag} ${active ? styles.active : ''} ${value != null ? styles.withValue : ''} ${className}`

  if (asButton) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        <span className={styles.name}>{children}</span>
      </button>
    )
  }

  return (
    <Link href={href || '#'} className={cls} title={title}>
      <span className={styles.name}>{children}</span>
      {value != null && <span className={styles.value}>{value}</span>}
    </Link>
  )
}
