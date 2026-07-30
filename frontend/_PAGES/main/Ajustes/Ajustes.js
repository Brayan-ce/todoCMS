'use client'

import { useState } from 'react'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { useShell } from '@/_EXTRAS/Shell/ShellContext'
import styles from './Ajustes.module.css'

export default function Ajustes() {
  const { t, lang, setLang, IDIOMAS } = useIdioma()
  const { dark, toggleDark } = useShell()

  const [privateMode, setPrivateMode] = useState(false)
  const [historyOn, setHistoryOn] = useState(true)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('profile.settingsConfig')}</h1>

      <div className={styles.card}>
        <div className={styles.cardTitle}>{t('profile.settingsConfig')}</div>
        <div className={styles.field}>
          <label className={styles.label}>{t('profile.language')}</label>
          <select className={styles.select} value={lang} onChange={e => setLang(e.target.value)}>
            {IDIOMAS.map(idi => <option key={idi.code} value={idi.code}>{idi.label}</option>)}
          </select>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{t('profile.privateBrowsing')}</span>
            <span className={styles.toggleDesc}>{t('profile.privateBrowsingDesc')}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${privateMode ? styles.toggleOn : ''}`} onClick={() => setPrivateMode(!privateMode)}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{t('profile.contentHistory')}</span>
            <span className={styles.toggleDesc}>{t('profile.contentHistoryDesc')}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${historyOn ? styles.toggleOn : ''}`} onClick={() => setHistoryOn(!historyOn)}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>{t('header.dark')}</div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{dark ? t('header.light') : t('header.dark')}</span>
            <span className={styles.toggleDesc}>{dark ? t('profile.lightDesc') || 'Switch to light mode' : t('profile.darkDesc') || 'Switch to dark mode'}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${dark ? styles.toggleOn : ''}`} onClick={toggleDark}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>
    </div>
  )
}
