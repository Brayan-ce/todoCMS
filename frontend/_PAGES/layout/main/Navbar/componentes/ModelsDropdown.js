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
              <span>&#127916; {model.videos}</span>
              <span>&#128444; {model.photos}</span>
            </span>
          </Link>
        ))}
      </div>
      <Link href="/models/" className={styles.allBtn}>{t('navDropdown.allModels')}</Link>
    </div>
  )
}
