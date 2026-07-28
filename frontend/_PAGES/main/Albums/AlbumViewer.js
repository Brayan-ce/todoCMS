'use client'

import { useState } from 'react'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import AlbumCard from './componentes/AlbumCard'
import styles from './AlbumViewer.module.css'

export default function AlbumViewer({ album, images, related = [] }) {
  const [current, setCurrent] = useState(0)
  const photoCount = album.photos || 10
  const photos = Array.from({ length: Math.min(photoCount, 10) }, (_, i) => images[(album.imageIndex + i) % images.length])

  function prev() { setCurrent((c) => (c > 0 ? c - 1 : photos.length - 1)) }
  function next() { setCurrent((c) => (c < photos.length - 1 ? c + 1 : 0)) }

  return (
    <>
      <div className={styles.page}>
        <div className={styles.mainCol}>
          <div className={styles.viewer}>
            <button type="button" className={styles.navBtn} onClick={prev} aria-label="Previous">
              &#8249;
            </button>
            <div className={styles.imageWrap}>
              <Imagenes src={photos[current]} alt={`${album.name} ${current + 1}`} unoptimized />
            </div>
            <button type="button" className={styles.navBtn} onClick={next} aria-label="Next">
              &#8250;
            </button>
          </div>

          <div className={styles.thumbs}>
          {photos.map((src, i) => (
            <div
              key={i}
              role="button"
              tabIndex={0}
              className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
              onClick={() => setCurrent(i)}
              onKeyDown={(e) => e.key === 'Enter' && setCurrent(i)}
            >
              <Imagenes src={src} alt="" />
            </div>
          ))}
          </div>

        <div className={styles.actionBar}>
          <div className={styles.likeBlock}>
            <button type="button" className={styles.voteBtn} aria-label="Like">
              <svg className={styles.voteIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
            </button>
            <button type="button" className={styles.voteBtn} aria-label="Dislike">
              <svg className={styles.voteIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
              </svg>
            </button>
            <div className={styles.ratingInfo}>
              <span className={styles.ratingPct}>100%</span>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>
              <span className={styles.ratingDetail}>40 Like | 0 Dislike</span>
            </div>
          </div>
          <div className={styles.actionBtns}>
            <button type="button" className={styles.actionBtn}>&#9829; ADD TO &#8743;</button>
            <button type="button" className={styles.actionBtn}>&#128172; COMMENTS (0)</button>
            <button type="button" className={styles.actionBtn}>&#8599; SHARE</button>
            <button type="button" className={styles.actionBtn}>&#9872; REPORT</button>
          </div>
        </div>

          <div className={styles.details}>
            <h1 className={styles.albumTitle}>{album.name}</h1>
            <div className={styles.metaRow}>
              <span>&#128444; {album.photos}</span>
              <span>&#128065; {album.views.toLocaleString('en-US')}</span>
              <span>&#128197; {album.age}</span>
              <span>By: <strong className={styles.uploader}>booze@69</strong></span>
            </div>

            <div className={styles.taxonomy}>
              <div className={styles.taxRow}>
                <span className={styles.taxLabel}>Models:</span>
                <span className={styles.chip}>Tori Black</span>
              </div>
              <div className={styles.taxRow}>
                <span className={styles.taxLabel}>Categories:</span>
                <span className={styles.chip}>Anal</span>
                <span className={styles.chip}>Big Ass</span>
                <span className={styles.chip}>Hardcore</span>
              </div>
              <div className={styles.taxRow}>
                <span className={styles.taxLabel}>Tags:</span>
                <span className={styles.chip}>Anal</span>
                <span className={styles.chip}>Big Ass</span>
                <span className={styles.chip}>Hardcore</span>
                <span className={styles.chip}>Small Tits</span>
              </div>
            </div>

            <p className={styles.description}>
              Out of all the places she is taken to by her husband, Paris is her favorite. Sure, he works a lot, but being alone in such a beautiful city isn&rsquo;t all bad. Unfortunately, even all the boutiques and restaurants can become boring so she has found something to relieve her boredom in each of the places she finds herself &mdash; and here, it is the driver that chauffeurs her from one fabulous place to another. Time for some fun.
            </p>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.adLabel}>ADVERTISEMENT</div>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
        </aside>
      </div>

      <div className={styles.fullSection}>
        <div className={styles.relatedHeader}>
          <h2 className={styles.relatedTitle}><span>RELATED</span> ALBUMS</h2>
        </div>
        <div className={styles.relatedGrid}>
          {related.slice(0, 12).map((a) => (
            <AlbumCard key={a.slug} album={a} image={images[a.imageIndex]} />
          ))}
        </div>

        <div className={styles.footerAds}>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
          <div className={styles.adCard}>
            <div className={styles.adOverlay}>Create your own AI GF</div>
          </div>
        </div>
      </div>
    </>
  )
}
