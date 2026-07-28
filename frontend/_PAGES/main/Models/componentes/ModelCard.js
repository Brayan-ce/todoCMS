import Link from 'next/link'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './ModelCard.module.css'

export default function ModelCard({ model, image }) {
  return (
    <Link href={`/models/${model.slug}/`} className={styles.card}>
      <div className={styles.thumb}>
        <Imagenes src={image} alt={model.name} />
      </div>
      <span className={styles.name}>{model.name}</span>
      <div className={styles.meta}>
        <span>&#127916; {model.videos}</span>
        <span>&#128077; <span className={styles.rating}>{model.rating}%</span></span>
        <span>&#128444; {model.photos}</span>
      </div>
    </Link>
  )
}
