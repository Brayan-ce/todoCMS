import Link from 'next/link'
import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import styles from './AlbumCard.module.css'

export default function AlbumCard({ album, image }) {
  return (
    <Link href={`/albums/${album.slug}/`} className={styles.card}>
      <div className={styles.thumb}>
        <Imagenes src={image} alt={album.name} />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{album.name}</span>
        <span className={styles.rating}>&#128077; {album.rating}%</span>
      </div>
      <div className={styles.meta}>
        <span>&#128444; {album.photos}</span>
        <span>&#128065; {(album.views / 1000).toFixed(album.views >= 10000 ? 0 : 1)}K</span>
        <span>&#128197; {album.age}</span>
      </div>
    </Link>
  )
}
