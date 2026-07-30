import AlbumCard from './componentes/AlbumCard'
import Pagination from '../Home/componentes/Pagination/Pagination'
import styles from './AlbumsPage.module.css'

export default function AlbumsPage({ titleLead, titleRest, albums, images }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span>{titleLead}</span> {titleRest}
        </h1>
        <div className={styles.filters}>
          <button type="button" className={styles.filterBtn}>{titleLead} <ion-icon name="chevron-down-outline"></ion-icon></button>
          <button type="button" className={styles.filterBtn}>All Time <ion-icon name="chevron-down-outline"></ion-icon></button>
        </div>
      </div>

      <div className={styles.grid}>
        {albums.map((album, i) => (
          <AlbumCard key={i} album={album} image={images[album.imageIndex]} />
        ))}
      </div>

      <Pagination />
    </div>
  )
}
