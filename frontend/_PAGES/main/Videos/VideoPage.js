import Link from 'next/link'
import VideoPlayer from './componentes/VideoPlayer/VideoPlayer'
import VideoInfo from './componentes/VideoInfo/VideoInfo'
import RelatedVideoCard from './componentes/RelatedVideoCard/RelatedVideoCard'
import styles from './VideoPage.module.css'

export default function VideoPage({ video, image, related, allImages }) {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.mainCol}>
          <VideoPlayer />
          <VideoInfo video={video} image={image} />
        </div>

        <aside className={styles.sidebarCol}>
          <div className={styles.adContainer}>
            <div className={styles.adHeader}>ADVERTISEMENT</div>
            <div className={styles.adBox}>
              <div className={styles.adBoxInner}>
                <div className={styles.adBoxAvatar} />
                <div className={styles.adBoxInfo}>
                  <strong className={styles.adBoxName}>Hot Babe</strong>
                  <span className={styles.adBoxCta}>view profile</span>
                </div>
                <button type="button" className={styles.adBoxBtn}>LIVE</button>
              </div>
            </div>
            <div className={styles.adBox}>
              <div className={styles.adBoxInner}>
                <div className={styles.adBoxAvatar} />
                <div className={styles.adBoxInfo}>
                  <strong className={styles.adBoxName}>Cam Star</strong>
                  <span className={styles.adBoxCta}>view profile</span>
                </div>
                <button type="button" className={styles.adBoxBtn}>LIVE</button>
              </div>
            </div>
            <div className={styles.adBox}>
              <div className={styles.adBoxInner}>
                <div className={styles.adBoxAvatar} />
                <div className={styles.adBoxInfo}>
                  <strong className={styles.adBoxName}>Sexy Doll</strong>
                  <span className={styles.adBoxCta}>view profile</span>
                </div>
                <button type="button" className={styles.adBoxBtn}>LIVE</button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.fullSection}>
        <div className={styles.comments}>
          <h3 className={styles.commentsTitle}>
            Comments 0 <span className={styles.chevronUp}>&#8743;</span>
          </h3>
          <p className={styles.commentsPrompt}>
            <Link href="/login/" className={styles.commentLink}>Login</Link> or <Link href="/signup/" className={styles.commentLink}>Sign up</Link> now to post a comment!
          </p>
        </div>

        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}>RELATED VIDEOS</h2>
        </div>

        <div className={styles.relatedGrid}>
          {related.map((v) => (
            <RelatedVideoCard key={v.id} video={v} image={allImages[v.imageIndex] || allImages[0]} />
          ))}
        </div>

        <div className={styles.footerAds}>
          <div className={styles.adCard}>
            <div className={styles.adInner}>
              <div className={styles.adAvatar} />
              <div className={styles.adInfo}>
                <strong className={styles.adName}>SexyCam</strong>
                <span className={styles.adCta}>view profile</span>
              </div>
              <button type="button" className={styles.adBtn}>CHAT NOW</button>
            </div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adInner}>
              <div className={styles.adAvatar} />
              <div className={styles.adInfo}>
                <strong className={styles.adName}>LiveJasmin</strong>
                <span className={styles.adCta}>view profile</span>
              </div>
              <button type="button" className={styles.adBtn}>FUCK HER LIVE</button>
            </div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adInner}>
              <div className={styles.adAvatar} />
              <div className={styles.adInfo}>
                <strong className={styles.adName}>BongaCams</strong>
                <span className={styles.adCta}>view profile</span>
              </div>
              <button type="button" className={styles.adBtn}>CHAT NOW</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
