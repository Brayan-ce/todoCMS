'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { videoDropdownItems } from '@/data/content'
import styles from './VideoDropdown.module.css'

const videoKeyMap = {
  'Latest': 'navDropdown.videos.latest',
  'Most Viewed': 'navDropdown.videos.mostViewed',
  'Top Rated': 'navDropdown.videos.topRated',
}

export default function VideoDropdown() {
  const { t } = useIdioma()
  return (
    <div className={styles.menu}>
      {videoDropdownItems.map((item) => (
        <Link key={item.label} href={item.href} className={styles.item}>{t(videoKeyMap[item.label])}</Link>
      ))}
    </div>
  )
}
