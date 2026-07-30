'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { videoSections } from '@/data/content'
import images from '@/data/images'
import VideoCard from '../Home/componentes/VideoCard/VideoCard'
import styles from './VideosGuardados.module.css'

export default function VideosGuardados() {
  const { t } = useIdioma()

  const savedVideos = videoSections.flatMap(s => s.videos).slice(0, 12)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('profile.savedVideos')}</h1>

      {savedVideos.length === 0 ? (
        <div className={styles.card}>
          <div className={styles.emptySaved}>
            <ion-icon name="bookmark-outline" class={styles.emptyIcon}></ion-icon>
            <p className={styles.emptyText}>{t('profile.noSavedVideos')}</p>
            <p className={styles.emptyDesc}>{t('profile.noSavedVideosDesc')}</p>
            <Link href="/" className={styles.exploreBtn}>{t('profile.exploreVideos')}</Link>
          </div>
        </div>
      ) : (
        <div className={styles.videoGrid}>
          {savedVideos.map(v => (
            <VideoCard key={v.id} video={v} imageSrc={images[v.imageIndex % images.length]} />
          ))}
        </div>
      )}
    </div>
  )
}
