import Imagenes from '@/_EXTRAS/Imagenes/Imagenes'
import ModelVideoCard from './componentes/ModelVideoCard'
import Tag from '../Home/componentes/Tag/Tag'
import styles from './ModelProfile.module.css'

const tags = [
  'xxx', 'big cock', 'hardcore', 'vr', 'handjob', 'latina', 'latin', 'big dick',
  'pov', 'big ass', 'solo', 'pawg', 'creampie', 'webcam', 'missionary', 'doggystyle',
  'lingerie', 'facial', 'oral', 'asian', 'shemale', 'threesome', 'porn', 'pussy',
  'big tits', 'bigass', 'sex', 'amateur', 'ass', 'teen', 'milf', 'blowjob',
  'cumshot', 'babe', 'anal', 'fuck', 'petite', 'blonde', 'fingering', 'deepthroat',
  'masturbation', 'bbc',
]

export default function ModelProfile({ model, image, videos, images }) {
  if (!model) return <h1>Model not found</h1>

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.avatar}>
          <Imagenes src={image} alt={model.name} />
        </div>
        <div className={styles.details}>
          <div className={styles.nameRow}>
            <div className={styles.nameBlock}>
              <h1 className={styles.name}>{model.name.toUpperCase()}</h1>
              <div className={styles.quickMetrics}>
                <span>&#127916; {model.videos}</span>
                <span>&#128444; {model.photos}</span>
              </div>
            </div>
            <span className={styles.nameSep} />
            <div className={styles.subscribeWrap}>
              <span className={styles.subscribeBtn}>SUBSCRIBE</span>
              <span className={styles.subscribeCount}>{model.videos}</span>
            </div>
          </div>

          <div className={styles.attributes}>
            <div className={styles.attrCol}>
              <span className={styles.attrLabel}>Name:</span>
              <span className={styles.attrValue}>{model.name}</span>
              <span className={styles.attrLabel}>Age:</span>
              <span className={styles.attrValue}>{model.age}</span>
            </div>
            <div className={styles.attrCol}>
              <span className={styles.attrLabel}>Country:</span>
              <span className={styles.attrValue}>{model.country}</span>
              <span className={styles.attrLabel}>City:</span>
              <span className={styles.attrValue}>{model.city}</span>
            </div>
            <div className={styles.attrCol}>
              <span className={styles.attrLabel}>Height:</span>
              <span className={styles.attrValue}>{model.height}</span>
              <span className={styles.attrLabel}>Weight:</span>
              <span className={styles.attrValue}>{model.weight}</span>
            </div>
            <div className={styles.attrCol}>
              <span className={styles.attrLabel}>Social Networks:</span>
              <div className={styles.socialIcons}>
                <span className={styles.socialIcon}>f</span>
                <span className={styles.socialIcon}>m</span>
                <span className={styles.socialIcon}>w</span>
                <span className={styles.socialIcon}>X</span>
              </div>
            </div>
          </div>

          <div className={styles.bio}>
            <h3 className={styles.bioTitle}>Description:</h3>
            <p className={styles.bioText}>{model.bio}</p>
          </div>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {model.name.toUpperCase()}&apos;s <span>Top</span> Rated Videos
        </h2>
        <button type="button" className={styles.filterBtn}>Top Rated <ion-icon name="chevron-down-outline"></ion-icon></button>
      </div>

      <div className={styles.videoGrid}>
        {videos.slice(0, 8).map((v) => (
          <ModelVideoCard key={v.id} video={v} imageSrc={images[v.imageIndex % images.length]} />
        ))}
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {model.name.toUpperCase()}&apos;s <span>Top</span> Rated Albums
        </h2>
        <button type="button" className={styles.filterBtn}>Top Rated <ion-icon name="chevron-down-outline"></ion-icon></button>
      </div>

      <p className={styles.emptyState}>There is no data in this list.</p>

      <div className={styles.tagsWrap}>
          {tags.map((tag) => (
            <Tag key={tag} href={`/tags/${tag.replace(/\s+/g, '-')}/`} className={styles.tagItem}>{tag}</Tag>
          ))}
        </div>
    </div>
  )
}
