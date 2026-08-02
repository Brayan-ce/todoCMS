'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import images from '@/data/images'
import { modelsDropdownItems } from '@/data/content'
import styles from './ModelsDropdown.module.css'

export default function ModelsDropdown() {
  const { t } = useIdioma()
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {modelsDropdownItems.slice(0, 8).map((model) => (
          <Link key={model.name} href={`/models/${model.name.toLowerCase().replace(/\s+/g, '-')}/`} className={styles.card}>
            <span className={styles.thumb}>
              <Imagenes src={images[model.imageIndex]} alt={model.name} />
            </span>
            <span className={styles.modelName}>{model.name}</span>
            <span className={styles.stats}>
              <span className={styles.statItem}>
                <svg className={styles.statIcon} width="14" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="5" cy="3" r="2" fill="currentColor" />
                  <circle cx="9" cy="3" r="2" fill="currentColor" />
                  <rect x="2" y="5" width="9" height="7" rx="1" fill="currentColor" />
                  <path d="M11 7.5L15 5.5V11.5L11 9.5V7.5Z" fill="currentColor" />
                </svg>
                {model.videos}
              </span>
              <span className={styles.statItem}>
                <svg className={styles.statIcon} width="14" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="1" y="1.5" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="5.5" cy="5" r="1.5" fill="currentColor" />
                  <path d="M1.5 12.5L6.5 7.5L9 10.5L11.5 8L14.5 11V12.5H1.5Z" fill="currentColor" />
                </svg>
                {model.photos}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/models/" className={styles.allBtn}>{t('navDropdown.allModels')}</Link>
    </div>
  )
}
