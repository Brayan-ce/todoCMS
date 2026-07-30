'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { useShell } from '@/_EXTRAS/Shell/ShellContext'
import { videoSections } from '@/data/content'
import images from '@/data/images'
import VideoCard from '../Home/componentes/VideoCard/VideoCard'
import styles from './Perfil.module.css'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api'

const ORIENTACIONES = [
  { value: 'hetero', labelKey: 'orientacion.hetero' },
  { value: 'gay', labelKey: 'orientacion.gay' },
  { value: 'lesbian', labelKey: 'orientacion.lesbian' },
  { value: 'bisexual', labelKey: 'orientacion.bisexual' },
  { value: 'trans', labelKey: 'orientacion.trans' },
  { value: 'todos', labelKey: 'orientacion.todos' },
]

const TABS = [
  { id: 'info', icon: 'person-outline', labelKey: 'profile.personalInfo' },
  { id: 'settings', icon: 'settings-outline', labelKey: 'profile.settingsConfig' },
  { id: 'notifications', icon: 'notifications-outline', labelKey: 'profile.notifications' },
  { id: 'saved', icon: 'bookmark-outline', labelKey: 'profile.savedVideos' },
]

export default function Perfil() {
  const { t, lang, setLang, IDIOMAS } = useIdioma()
  const { dark, toggleDark } = useShell()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [orientacion, setOrientacion] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const [pwCurrent, setPwCurrent] = useState('')
  const [pwNew, setPwNew] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [changingPw, setChangingPw] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(false)
  const [notifMsg, setNotifMsg] = useState(true)

  const [privateMode, setPrivateMode] = useState(false)
  const [historyOn, setHistoryOn] = useState(true)

  const switchTab = useCallback((id) => {
    setActiveTab(id)
    router.push(`/perfil/?tab=${id}`, { scroll: false })
  }, [router])

  const savedVideos = videoSections.flatMap(s => s.videos).slice(0, 12)

  const activeRef = useRef(activeTab)
  activeRef.current = activeTab

  useEffect(() => {
    const tab = searchParams?.get('tab')
    if (tab && tab !== activeRef.current) setActiveTab(tab)
  }, [searchParams])

  useEffect(() => {
    const stored = localStorage.getItem('usuario')
    if (stored) {
      try {
        const u = JSON.parse(stored)
        setUser(u)
        setNombre(u.nombre || '')
        setEmail(u.email || '')
        setOrientacion(u.orientacion || 'hetero')
      } catch {}
    }
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError('')
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch(`${API}/auth/perfil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nombre, orientacion }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error saving profile'); return }
      const updated = { ...user, nombre, orientacion }
      localStorage.setItem('usuario', JSON.stringify(updated))
      setUser(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch { setError('Connection error') }
    finally { setSaving(false) }
  }

  async function handleChangePassword(e) {
    e.preventDefault()
    if (pwNew !== pwConfirm) { setPwError('Passwords do not match'); return }
    setChangingPw(true)
    setPwError('')
    setPwSuccess('')
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch(`${API}/auth/cambiar-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: pwCurrent, newPassword: pwNew }),
      })
      const data = await res.json()
      if (!res.ok) { setPwError(data.error || 'Error changing password'); return }
      setPwSuccess(t('profile.passwordChanged'))
      setPwCurrent(''); setPwNew(''); setPwConfirm('')
      setTimeout(() => setPwSuccess(''), 3000)
    } catch { setPwError('Connection error') }
    finally { setChangingPw(false) }
  }

  async function handleDelete() {
    setDeleting(true)
    const token = localStorage.getItem('token')
    if (!token) return
    try {
      const res = await fetch(`${API}/auth/eliminar-cuenta`, {
        method: 'DELETE', headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        router.push('/')
      }
    } catch {}
    setDeleting(false)
    setShowDelete(false)
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    router.push('/')
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.notLogged}>
          <ion-icon name="person-outline" class={styles.notLoggedIcon}></ion-icon>
          <h2 className={styles.notLoggedTitle}>{t('profile.notLoggedIn')}</h2>
          <p className={styles.notLoggedText}>{t('profile.loginToAccess')}</p>
          <Link href="/login/" className={styles.loginBtn}>{t('header.login')}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <ion-icon name="person-outline" class={styles.avatarIcon}></ion-icon>
              </div>
            </div>
            <div className={styles.userMeta}>
              <span className={styles.userName}>{user.nombre || user.email?.split('@')[0]}</span>
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>

          <nav className={styles.nav}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`${styles.navBtn} ${activeTab === tab.id ? styles.navBtnActive : ''}`}
                onClick={() => switchTab(tab.id)}
              >
                <ion-icon name={tab.icon} class={styles.navIcon}></ion-icon>
                <span>{t(tab.labelKey)}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarBottom}>
            <button type="button" className={styles.optionBtn} onClick={cerrarSesion}>
              <ion-icon name="log-out-outline" class={styles.optionIcon}></ion-icon>
              <span>{t('profile.logout')}</span>
            </button>
            <button type="button" className={`${styles.optionBtn} ${styles.optionDanger}`} onClick={() => setShowDelete(true)}>
              <ion-icon name="trash-outline" class={styles.optionIcon}></ion-icon>
              <span>{t('profile.deleteAccount')}</span>
            </button>
          </div>
        </aside>

        <main className={styles.content}>
          {activeTab === 'info' && (
            <div className={styles.section}>
              <form onSubmit={handleSave}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>{t('profile.personalInfo')}</div>
                  <div className={styles.field}>
                    <label className={styles.label}>{t('profile.name')}</label>
                    <input type="text" className={styles.input} value={nombre} onChange={e => setNombre(e.target.value)} placeholder={t('profile.namePlaceholder')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>{t('profile.email')}</label>
                    <input type="email" className={styles.input} value={email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>{t('profile.orientation')}</label>
                    <select className={styles.select} value={orientacion} onChange={e => setOrientacion(e.target.value)}>
                      {ORIENTACIONES.map(o => <option key={o.value} value={o.value}>{t(o.labelKey)}</option>)}
                    </select>
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                  <div className={styles.submitRow}>
                    <button type="submit" className={styles.submitBtn} disabled={saving}>
                      {saving ? t('profile.saving') : t('profile.saveChanges')}
                    </button>
                    {saved && <span className={styles.successBadge}>{t('profile.saved')}</span>}
                  </div>
                </div>
              </form>

              <form onSubmit={handleChangePassword}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>{t('profile.changePassword')}</div>
                  <div className={styles.field}>
                    <label className={styles.label}>{t('profile.currentPassword')}</label>
                    <input type="password" className={styles.input} value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} />
                  </div>
                  <div className={styles.inlineRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('profile.newPassword')}</label>
                      <input type="password" className={styles.input} value={pwNew} onChange={e => setPwNew(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('profile.confirmPassword')}</label>
                      <input type="password" className={styles.input} value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} />
                    </div>
                  </div>
                  {pwError && <div className={styles.error}>{pwError}</div>}
                  {pwSuccess && <div className={styles.success}>{pwSuccess}</div>}
                  <div className={styles.submitRow}>
                    <button type="submit" className={styles.submitBtn} disabled={changingPw || !pwCurrent || !pwNew || !pwConfirm}>
                      {changingPw ? t('profile.saving') : t('profile.changePassword')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className={styles.section}>
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
                <div className={styles.optionBtn} onClick={toggleDark} style={{ cursor: 'pointer' }}>
                  <ion-icon name={dark ? 'sunny-outline' : 'moon-outline'} class={styles.optionIcon}></ion-icon>
                  <span>{dark ? t('header.light') : t('header.dark')}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.section}>
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
          )}

          {activeTab === 'saved' && (
            <div className={styles.section}>
              <div className={styles.card}>
                <div className={styles.cardTitle}>{t('profile.savedVideos')}</div>
                {savedVideos.length === 0 ? (
                  <div className={styles.emptySaved}>
                    <ion-icon name="bookmark-outline" class={styles.emptyIcon}></ion-icon>
                    <p className={styles.emptyText}>{t('profile.noSavedVideos')}</p>
                    <p className={styles.emptyDesc}>{t('profile.noSavedVideosDesc')}</p>
                    <Link href="/" className={styles.exploreBtn}>{t('profile.exploreVideos')}</Link>
                  </div>
                ) : (
                  <div className={styles.videoGrid}>
                    {savedVideos.map(v => (
                      <VideoCard key={v.id} video={v} imageSrc={images[v.imageIndex % images.length]} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {showDelete && (
        <div className={styles.confirmOverlay} onClick={() => setShowDelete(false)}>
          <div className={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <div className={styles.confirmIcon}>
              <ion-icon name="warning-outline" class={styles.confirmIconSvg}></ion-icon>
            </div>
            <h3 className={styles.confirmTitle}>{t('profile.deleteAccount')}</h3>
            <p className={styles.confirmText}>{t('profile.confirmDelete')}</p>
            <div className={styles.confirmActions}>
              <button type="button" className={styles.cancelBtn} onClick={() => setShowDelete(false)}>{t('profile.cancel')}</button>
              <button type="button" className={styles.deleteBtn} onClick={handleDelete} disabled={deleting}>
                {deleting ? '...' : t('profile.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
