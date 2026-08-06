'use client'

import { useState } from 'react'
import Icon from '@/_EXTRAS/Icons/Icons'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import styles from './Dropdown.module.css'

const defaultKeys = ['topRated', 'alphabetically', 'mostViewed', 'mostVideos']

export default function Dropdown({
  label,
  className = '',
  compact = false,
  filter = false,
  selectedKey,
  optionKeys,
  labelPrefix = 'home.sortLabels',
  optionIcons = {},
}) {
  const { t } = useIdioma()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(selectedKey)

  const selectable = !!selectedKey && Array.isArray(optionKeys)
  const options = selectable ? optionKeys.filter((key) => key !== current) : []

  const buttonLabel = selectable && current ? t(`${labelPrefix}.${current}`) : label
  const currentIcon = selectable && optionIcons[current]

  const renderIcon = (icon) => {
    if (icon === 'camcorder') {
      return (
        <svg className={styles.optionIcon} width="14" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="5" cy="3" r="2" fill="currentColor" />
          <circle cx="9" cy="3" r="2" fill="currentColor" />
          <rect x="2" y="5" width="9" height="7" rx="1" fill="currentColor" />
          <path d="M11 7.5L15 5.5V11.5L11 9.5V7.5Z" fill="currentColor" />
        </svg>
      )
    }
    if (icon === 'image') {
      return (
        <svg className={styles.optionIcon} width="13" height="12" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="1.5" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="5.5" cy="5" r="1.5" fill="currentColor" />
          <path d="M1.5 12.5L6.5 7.5L9 10.5L11.5 8L14.5 11V12.5H1.5Z" fill="currentColor" />
        </svg>
      )
    }
    return null
  }

  return (
    <div
      className={`${styles.wrap} ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${styles.btn} ${compact ? styles.compact : ''} ${filter ? styles.filter : ''} ${open ? styles.btnOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {currentIcon && renderIcon(currentIcon)}
        <span className={styles.text}>{buttonLabel}</span>
        <Icon name="arrow-down" className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`} />
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((key) => (
            <button
              key={key}
              type="button"
              className={styles.option}
              onClick={() => {
                setCurrent(key)
                setOpen(false)
              }}
            >
              {t(`${labelPrefix}.${key}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
