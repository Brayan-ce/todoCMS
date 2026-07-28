import Icon from '@/_EXTRAS/Icons/Icons'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './ModelVideoCard.module.css'

export default function ModelVideoCard({ video, imageSrc }) {
  return (
    <div className={styles.card}>
      <a href={video.href} className={styles.thumbLink}>
        <span className={styles.thumb}>
          <Imagenes src={imageSrc} alt={video.title} />
          {video.hd && <span className={styles.hdBadge}>HD</span>}
          <span className={styles.duration}>{video.duration}</span>
        </span>
      </a>
      <a href={video.href} className={styles.title}>{video.title}</a>
      <div className={styles.meta}>
        <span className={styles.metaLeft}>
          <span>&#128065; {video.views.toLocaleString()}</span>
          <span className={styles.rating}>&#128077; {video.rating}%</span>
        </span>
        <span className={styles.date}>&#128197; 3 years ago</span>
      </div>
    </div>
  )
}
