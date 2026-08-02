import Link from 'next/link'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './ModelCard.module.css'

export default function ModelCard({ model, image }) {
  return (
    <Link href={`/models/${model.slug}/`} className={styles.card}>
      <div className={styles.thumb}>
        <Imagenes src={image} alt={model.name} />
      </div>
      <div className={styles.body}>
        <span className={styles.name}>{model.name}</span>
        <div className={styles.meta}>
          <div className={styles.metaLeft}>
            <span className={styles.metric}>
              <svg className={styles.camcorderIcon} width="14" height="11" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="5" cy="3" r="2" fill="currentColor" />
                <circle cx="9" cy="3" r="2" fill="currentColor" />
                <rect x="2" y="5" width="9" height="7" rx="1" fill="currentColor" />
                <path d="M11 7.5L15 5.5V11.5L11 9.5V7.5Z" fill="currentColor" />
              </svg>
              {model.videos}
            </span>
            <span className={styles.metric}>
              <svg className={styles.thumbsIcon} width="12" height="12" viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M0.376 12.371h6.101v18.993h-6.101zM26.812 14.819l-2.542 14.443c0 1.381-1.138 2.6-2.542 2.6h-11.693c-1.403 0-2.542-1.321-2.542-2.702v-14.593c0.051-1.040 0.742-1.891 1.696-2.219 2.45-3.104 5.409-7.927 5.409-11.119 0-3.498 6.277 2.118 4.067 7.549-0.456 1.121-0.809 2.101-1.083 3.6h6.675c1.405 0 2.542 1.069 2.542 2.448z" fill="currentColor" />
              </svg>
              <span className={styles.rating}>{model.rating}%</span>
            </span>
          </div>
          <span className={styles.metric}>
            <svg className={styles.imageIcon} width="13" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="1" y="1.5" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="5.5" cy="5" r="1.5" fill="currentColor" />
              <path d="M1.5 12.5L6.5 7.5L9 10.5L11.5 8L14.5 11V12.5H1.5Z" fill="currentColor" />
            </svg>
            {model.photos}
          </span>
        </div>
      </div>
    </Link>
  )
}
