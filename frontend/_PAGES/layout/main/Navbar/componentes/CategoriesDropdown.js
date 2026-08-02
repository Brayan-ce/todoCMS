'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import images from '@/data/images'
import { categoriesDropdownItems } from '@/data/content'
import styles from './CategoriesDropdown.module.css'

export default function CategoriesDropdown() {
  const { t } = useIdioma()
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {categoriesDropdownItems.map((cat) => (
          <Link key={cat.name} href={`/categories/${cat.name.toLowerCase()}/`} className={styles.card}>
            <span className={styles.thumb}>
              <Imagenes src={images[cat.imageIndex]} alt={cat.name} />
            </span>
            <span className={styles.info}>
              <span className={styles.name}>{cat.name}</span>
              <span className={styles.count}>
                <svg className={styles.countIcon} width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="5" cy="3" r="2" />
                  <circle cx="9" cy="3" r="2" />
                  <rect x="2" y="5" width="9" height="7" rx="1" />
                  <path d="M11 7.5L15 5.5V11.5L11 9.5V7.5Z" />
                </svg>
                {cat.videoCount}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/categories/" className={styles.allBtn}>{t('navDropdown.allCategories')}</Link>
    </div>
  )
}
