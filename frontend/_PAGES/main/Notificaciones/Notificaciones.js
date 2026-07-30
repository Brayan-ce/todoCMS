'use client'

import { useState } from 'react'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import styles from './Notificaciones.module.css'

export default function Notificaciones() {
  const { t } = useIdioma()

  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(false)
  const [notifMsg, setNotifMsg] = useState(true)

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('profile.notifications')}</h1>

      <div className={styles.card}>
        <div className={styles.cardTitle}>{t('profile.notifications')}</div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{t('profile.emailNotif')}</span>
            <span className={styles.toggleDesc}>{t('profile.emailNotifDesc')}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${notifEmail ? styles.toggleOn : ''}`} onClick={() => setNotifEmail(!notifEmail)}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{t('profile.pushNotif')}</span>
            <span className={styles.toggleDesc}>{t('profile.pushNotifDesc')}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${notifPush ? styles.toggleOn : ''}`} onClick={() => setNotifPush(!notifPush)}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
        <div className={styles.toggleRow}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleLabel}>{t('profile.messageNotif')}</span>
            <span className={styles.toggleDesc}>{t('profile.messageNotifDesc')}</span>
          </div>
          <button type="button" className={`${styles.toggle} ${notifMsg ? styles.toggleOn : ''}`} onClick={() => setNotifMsg(!notifMsg)}>
            <span className={styles.toggleKnob} />
          </button>
        </div>
      </div>
    </div>
  )
}
