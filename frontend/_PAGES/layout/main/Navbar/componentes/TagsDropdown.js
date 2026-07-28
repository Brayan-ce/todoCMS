'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { tagsDropdownItems } from '@/data/content'
import styles from './TagsDropdown.module.css'

export default function TagsDropdown() {
  const { t } = useIdioma()
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {tagsDropdownItems.map((tag) => (
          <Link key={tag.name} href={`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}/`} className={styles.item}>
            <span className={styles.name}>{tag.name}</span>
            <span className={styles.count}>{tag.count.toLocaleString()}</span>
          </Link>
        ))}
      </div>
      <Link href="/tags/" className={styles.allBtn}>{t('navDropdown.allTags')}</Link>
    </div>
  )
}
