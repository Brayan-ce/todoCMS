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

function formatTimeAgo(date, lang) {
  const diff = Date.now() - date
  const years = Math.floor(diff / 31536000000)
  const months = Math.floor(diff / 2628000000)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor(diff / 3600000)
  if (lang === 'es') {
    if (years > 0) return `${years} año${years > 1 ? 's' : ''}`
    if (months > 0) return `${months} mes${months > 1 ? 'es' : ''}`
    if (days > 0) return `${days} día${days > 1 ? 's' : ''}`
    if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''}`
    return 'ahora'
  }
  if (years > 0) return `${years} year${years > 1 ? 's' : ''}`
  if (months > 0) return `${months} month${months > 1 ? 's' : ''}`
  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`
  return 'now'
}

export default function VideoCard({ video, imageSrc, className, quick, first, tags }) {
  const { lang } = useIdioma()
  const quickClass = quick
    ? first
      ? ` ${styles.quickFirst}`
      : ` ${styles.quick}`
    : ''
  const tagsClass = tags ? ` ${styles.tags}` : ''
  return (
    <div className={`${styles.thumb}${className ? ' ' + className : ''}${quickClass}${tagsClass}`}>
      <div className={styles.box}>
        <Link className={styles.item} href={video.href} title={video.title}>
          <span className={styles.thumbImg}>
            <span className={styles.imgWrap}>
              <Imagenes src={imageSrc} alt={video.title} />
            </span>
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
            {tags && (
              <span className={styles.timeAgo}>
                <svg className={styles.calendarIcon} width="13" height="13" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="1" y="2" width="14" height="13" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1 5.5H15" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 0.5V3.5M11 0.5V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {formatTimeAgo(video.date, lang)}
              </span>
            )}
          </span>
        </Link>
      </div>
    </div>
  )
}
