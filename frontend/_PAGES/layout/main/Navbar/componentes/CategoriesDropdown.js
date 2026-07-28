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
              <span className={styles.count}>&#127916; {cat.videoCount}</span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/categories/" className={styles.allBtn}>{t('navDropdown.allCategories')}</Link>
    </div>
  )
}
