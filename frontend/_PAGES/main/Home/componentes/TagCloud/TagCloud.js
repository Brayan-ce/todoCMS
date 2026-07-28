import Tag from '../Tag/Tag'
import styles from './TagCloud.module.css'

export default function TagCloud({ tags = [] }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ul className={styles.tagsList}>
          {tags.map((tag) => (
            <li key={tag} className={styles.item}>
              <Tag href={`/tags/${tag.replace(/\s+/g, '-')}/`}>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
