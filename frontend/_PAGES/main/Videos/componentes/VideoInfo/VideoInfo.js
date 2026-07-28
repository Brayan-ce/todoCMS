import Icon from '@/_EXTRAS/Icons/Icons'
import styles from './VideoInfo.module.css'

export default function VideoInfo({ video, image }) {
  if (!video) return null

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{video.title}</h1>

      <div className={styles.actionBar}>
        <button type="button" className={`${styles.actionBtn} ${styles.activeTab}`}>
          <span className={styles.activePill}>i INFO</span>
        </button>
        <button type="button" className={styles.actionBtn}>+ ADD TO</button>
        <button type="button" className={styles.actionBtn}>&#128247; SCREENSHOTS</button>
        <button type="button" className={styles.actionBtn}>&#128257; SHARE</button>
        <button type="button" className={styles.actionBtn}>&#9872; REPORT</button>
        <button type="button" className={styles.actionBtn}>&#11021; DOWNLOAD</button>
      </div>

      <div className={styles.metadata}>
        <span>&#9201; {video.duration}</span>
        <span>&#128065; {video.views.toLocaleString()}</span>
        <span>&#128197; 3 minutes ago</span>
      </div>

      <div className={styles.uploader}>
        <div className={styles.uploaderLeft}>
          <div className={styles.avatar} />
          <div className={styles.uploaderInfo}>
            <strong className={styles.uploaderName}>slyfox17</strong>
            <span className={styles.subs}>353 Subscribers</span>
          </div>
        </div>
        <button type="button" className={styles.subscribeBtn}>SUBSCRIBE</button>
      </div>

      <p className={styles.description}>
        Experience the ultimate pleasure with this exclusive video. High quality HD content
        featuring your favorite performers. Enjoy the show!
      </p>

      <div className={styles.tagsSection}>
        <span className={styles.tagLabel}>Categories:</span>
        <span className={styles.tag}>Softcore</span>
      </div>

      <div className={styles.tagsSection}>
        <span className={styles.tagLabel}>Tags:</span>
        <span className={styles.tag}>Azw</span>
        <span className={styles.tag}>HD</span>
        <span className={styles.tag}>Teen</span>
      </div>
    </div>
  )
}
