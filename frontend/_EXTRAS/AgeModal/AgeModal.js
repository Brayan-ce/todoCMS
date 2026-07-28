'use client'

import { useState, useEffect } from 'react'
import Logo from '@/_EXTRAS/Logo/Logo'
import styles from './AgeModal.module.css'

export default function AgeModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const agreed = localStorage.getItem('ageVerified')
    if (!agreed) setVisible(true)
  }, [])

  function handleAccept() {
    localStorage.setItem('ageVerified', 'true')
    setVisible(false)
  }

  function handleLeave() {
    window.location.href = 'https://google.com'
  }

  if (!visible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.logoSection}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>
        </div>

        <h1 className={styles.title}>This is an adult website</h1>

        <p className={styles.body}>
          This website contains age-restricted materials including nudity and explicit depictions of sexual activity. By entering, you affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the website from and you consent to viewing sexually explicit content.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.accept} onClick={handleAccept}>
            IM 18 OR OLDER
          </button>
          <button type="button" className={styles.leave} onClick={handleLeave}>
            LEAVE
          </button>
        </div>

        <div className={styles.rta}>
          <img src="/RTA.png" alt="RTA Restricted To Adults" className={styles.rtaImg} />
        </div>
      </div>
    </div>
  )
}
