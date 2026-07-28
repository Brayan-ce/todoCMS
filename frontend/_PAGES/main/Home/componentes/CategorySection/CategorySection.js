'use client'

import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Dropdown from '../Dropdown/Dropdown'
import CategoryCard from '../CategoryCard/CategoryCard'
import styles from './CategorySection.module.css'

const sortLabelKeyMap = {
  'Most Viewed': 'home.sortLabels.mostViewed',
}

export default function CategorySection({ titleLead, titleRest, sortLabel, items, images }) {
  const { t } = useIdioma()

  let displaySortLabel = sortLabel
  if (sortLabel && sortLabelKeyMap[sortLabel]) {
    displaySortLabel = t(sortLabelKeyMap[sortLabel])
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.blockThumbs}>
          <div className={styles.headline}>
            <h2 className={styles.title}>
              <span>{t('home.categories.lead')}</span> {t('home.categories.rest')}
            </h2>
            {displaySortLabel && <Dropdown label={displaySortLabel} />}
          </div>
          <div className={styles.thumbs}>
            {items.map((item) => (
              <CategoryCard
                key={item.name}
                name={item.name}
                href={item.href}
                imageSrc={images[item.imageIndex % images.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
