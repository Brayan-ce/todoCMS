import Link from 'next/link'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './CategoryCard.module.css'

export default function CategoryCard({ name, href, imageSrc }) {
  return (
    <div className={styles.thumb}>
      <div className={styles.box}>
        <Link className={styles.item} href={href} title={name}>
          <span className={styles.thumbImg}>
            <Imagenes src={imageSrc} alt={name} />
            <span className={styles.label}>{name}</span>
          </span>
        </Link>
      </div>
    </div>
  )
}
