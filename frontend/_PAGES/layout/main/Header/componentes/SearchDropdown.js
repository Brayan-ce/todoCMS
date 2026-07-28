'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Icon from '@/_EXTRAS/Icons/Icons'
import styles from './SearchDropdown.module.css'

const searchCategories = [
  'Asian', 'ASMR', 'Ass to mouth (ATM)', 'Asslicking', 'Big Ass',
]

const searchModels = [
  'Ahryan Astyn', 'Aiden Ashley', 'Aiden Aspen', 'AKASHA CULLEN', 'Alana Freitas',
]

function highlightMatch(text, query) {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <strong>{text.slice(idx, idx + query.length)}</strong>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function SearchDropdown() {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)

  const show = focused && value.length > 0

  const catMatches = searchCategories.filter((c) =>
    c.toLowerCase().includes(value.toLowerCase())
  )
  const modelMatches = searchModels.filter((m) =>
    m.toLowerCase().includes(value.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setFocused(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.inputWrap}>
        <input
          type="search"
          className={styles.input}
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          autoComplete="off"
        />
        <button type="submit" className={styles.searchBtn} aria-label="Search">
          <Icon name="search" className={styles.searchIcon} />
        </button>
      </div>

      {show && (catMatches.length > 0 || modelMatches.length > 0) && (
        <div className={styles.dropdown}>
          {catMatches.length > 0 && (
            <>
              <div className={styles.sectionHeader}>Categories:</div>
              <div className={styles.sectionList}>
                {catMatches.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase().replace(/[\s()]+/g, '-').replace(/-+/g, '-')}/`}
                    className={styles.resultItem}
                    onClick={() => setFocused(false)}
                  >
                    {highlightMatch(cat, value)}
                  </Link>
                ))}
              </div>
            </>
          )}

          {modelMatches.length > 0 && (
            <>
              <div className={styles.sectionHeader}>Models:</div>
              <div className={styles.sectionList}>
                {modelMatches.map((model) => (
                  <Link
                    key={model}
                    href={`/models/${model.toLowerCase().replace(/\s+/g, '-')}/`}
                    className={styles.resultItem}
                    onClick={() => setFocused(false)}
                  >
                    {highlightMatch(model, value)}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
