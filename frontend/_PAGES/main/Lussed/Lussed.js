'use client'

import styles from './Lussed.module.css'

export default function Lussed({ title = 'you lussed' }) {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.sub}>this page is empty as hell lmao</p>
    </div>
  )
}
