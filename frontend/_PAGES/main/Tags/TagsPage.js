'use client'

import Link from 'next/link'
import { azTagsIndex } from '@/data/content'
import Pagination from '../Home/componentes/Pagination/Pagination'
import styles from './TagsPage.module.css'

const MAIN_LETTERS = ['#', 'B', 'G', 'M', 'S', '#']
const COLS = 6

function mainColumns() {
  const columns = []
  for (let i = 0; i < COLS; i++) {
    const letter = MAIN_LETTERS[i]
    const group = azTagsIndex.find((g) => g.letter === letter)
    columns.push(group ? { letter, tags: group.tags } : { letter, tags: [] })
  }
  return columns
}

export default function TagsPage() {
  const columns = mainColumns()
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span>Tags</span>
        </h1>
        <button type="button" className={styles.filterBtn}>
          <svg className={styles.filterIcon} width="14" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="5" cy="3" r="2" fill="currentColor" />
            <circle cx="9" cy="3" r="2" fill="currentColor" />
            <rect x="2" y="5" width="9" height="7" rx="1" fill="currentColor" />
            <path d="M11 7.5L15 5.5V11.5L11 9.5V7.5Z" fill="currentColor" />
          </svg>
          Videos
          <svg className={styles.filterArrow} width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1 3L5 7L9 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.grid}>
        {columns.map((col, ci) => (
          <div key={ci} className={styles.column}>
            <Link
              className={styles.letter}
              href={col.tags[0] ? `/tags/${col.tags[0].name.toLowerCase().replace(/\s+/g, '-')}/` : '/tags/'}
            >
              {col.letter}
            </Link>
            <ul className={styles.list}>
              {col.tags.map((tag) => (
                <li key={tag.name} className={styles.item}>
                  <Link className={styles.tag} href={`/tags/${tag.name.toLowerCase().replace(/\s+/g, '-')}/`}>
                    {tag.name}
                  </Link>
                  <span className={styles.count}>{tag.count}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Pagination basePath="/tags" />
    </div>
  )
}
