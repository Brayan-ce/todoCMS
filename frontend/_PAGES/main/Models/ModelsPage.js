import ModelCard from './componentes/ModelCard'
import Pagination from '../Home/componentes/Pagination/Pagination'
import styles from './ModelsPage.module.css'

export default function ModelsPage({ models, images }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span>Top</span> Rated Models
        </h1>
        <button type="button" className={styles.filterBtn}>Top Rated &#8743;</button>
      </div>

      <div className={styles.grid}>
        {models.map((model, i) => (
          <ModelCard key={i} model={model} image={images[model.imageIndex]} />
        ))}
      </div>

      <Pagination />
    </div>
  )
}
