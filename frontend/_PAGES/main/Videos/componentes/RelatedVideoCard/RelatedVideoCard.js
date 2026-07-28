import Link from 'next/link'
import styles from './RelatedVideoCard.module.css'

export default function RelatedVideoCard({ video, image }) {
  return (
    <div className={styles.card}>
      <Link href={video.href} className={styles.thumb}>
        <div className={styles.thumbInner} style={{ backgroundImage: `url(${image})` }}>
          {video.hd && <span className={styles.hdBadge}>HD</span>}
          <span className={styles.duration}>{video.duration}</span>
        </div>
      </Link>
      <Link href={video.href} className={styles.title}>{video.title}</Link>
      <div className={styles.meta}>
        <span>&#128065; {video.views.toLocaleString()}</span>
        <span className={video.rating >= 80 ? styles.ratingHigh : styles.ratingLow}>{video.rating}%</span>
        <span>&#128197; 3 years ago</span>
      </div>
    </div>
  )
}
