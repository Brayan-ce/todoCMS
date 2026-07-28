'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Icon from '@/_EXTRAS/Icons/Icons'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './VideoCard.module.css'

function formatViews(views, lang) {
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  return new Intl.NumberFormat(locale).format(views)
}

export default function VideoCard({ video, imageSrc }) {
  const { lang } = useIdioma()
  return (
    <div className={styles.thumb}>
      <div className={styles.box}>
        <Link className={styles.item} href={video.href} title={video.title}>
          <span className={styles.thumbImg}>
            <Imagenes src={imageSrc} alt={video.title} />
            {video.hd && <span className={styles.isHd}>HD</span>}
            <span className={styles.duration}>{video.duration}</span>
            <span className={styles.playOverlay} aria-hidden="true">
              <Icon name="play" className={styles.playIcon} />
            </span>
          </span>
          <span className={styles.description}>
            <b className={styles.name}>{video.title}</b>
          </span>
          <span className={styles.info}>
            <span className={styles.infoItem}>
              <Icon name="view" className={`${styles.svgIcon} ${styles.view}`} />
              <span>{formatViews(video.views, lang)}</span>
            </span>
            <span className={styles.rating}>
              <span className={styles.voters}>
                <Icon name="like" className={styles.svgIcon} />
                <span>{video.rating}%</span>
              </span>
            </span>
          </span>
        </Link>
      </div>
    </div>
  )
}
