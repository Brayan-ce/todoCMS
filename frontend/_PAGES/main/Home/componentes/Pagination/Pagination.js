'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Icon from '@/_EXTRAS/Icons/Icons'
import styles from './Pagination.module.css'

export default function Pagination({ current = 1, totalHint = 10, basePath = '/latest-updates' }) {
  const { t } = useIdioma()
  const pages = [2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className={styles.paginationWrap}>
      <div className={styles.row}>
        <Link href={`${basePath}/${current > 1 ? current - 1 : 1}/`} className={`${styles.prev} ${current <= 1 ? styles.disabled : ''}`}>
          <Icon name="arrow-left" className={styles.chevron} />
          <span>{t('pagination.previous')}</span>
        </Link>

        <div className={styles.pages}>
          <span className={styles.active}>{current}</span>

          {pages.map((n) => (
            <Link key={n} href={`${basePath}/${n}/`} className={styles.page}>{n}</Link>
          ))}

          <span className={styles.ellipsis}>...</span>
        </div>

        <Link href={`${basePath}/${current + 1}/`} className={styles.next}>
          <span>{t('pagination.next')}</span>
          <Icon name="arrow-right" className={styles.chevron} />
        </Link>
      </div>

      <div className={styles.jumpRow}>
        <label htmlFor={`jump-${basePath}`}>{t('pagination.jumpTo')}</label>
        <input type="number" id={`jump-${basePath}`} className={styles.jumpInput} min={1} />
        <button type="button" className={styles.jumpOk}>{t('pagination.ok')}</button>
      </div>
    </div>
  )
}
