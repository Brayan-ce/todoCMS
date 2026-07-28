'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { albumsDropdownItems } from '@/data/content'
import styles from './AlbumsDropdown.module.css'

const albumKeyMap = {
  'Top Rated': 'navDropdown.albums.topRated',
  'Most Viewed': 'navDropdown.albums.mostViewed',
}

export default function AlbumsDropdown() {
  const { t } = useIdioma()
  return (
    <div className={styles.menu}>
      {albumsDropdownItems.map((item) => (
        <Link key={item.label} href={item.href} className={styles.item}>{t(albumKeyMap[item.label])}</Link>
      ))}
    </div>
  )
}
