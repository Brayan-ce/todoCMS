import Icon from '@/_EXTRAS/Icons/Icons'
import styles from './Dropdown.module.css'

export default function Dropdown({ label, className = '', compact = false }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <button type="button" className={`${styles.btn} ${compact ? styles.compact : ''}`}>
        <span className={styles.text}>{label}</span>
        <Icon name="arrow-down" className={styles.arrow} />
      </button>
    </div>
  )
}
