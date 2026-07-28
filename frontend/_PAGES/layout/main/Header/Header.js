'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Icon from '@/_EXTRAS/Icons/Icons'
import Logo from '@/_EXTRAS/Logo/Logo'
import Navbar from '@/_PAGES/layout/main/Navbar/Navbar'
import SearchDropdown from './componentes/SearchDropdown'
import { useShell } from '@/_EXTRAS/Shell/ShellContext'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import styles from './Header.module.css'

export default function Header() {
  const { dark, sidebarOpen, toggleDark, toggleSidebar } = useShell()
  const { lang, setLang, t, IDIOMAS } = useIdioma()
  const router = useRouter()
  const pathname = usePathname()
  const [usuario, setUsuario] = useState(null)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [toolsAbierto, setToolsAbierto] = useState(true)
  const [orientAbierto, setOrientAbierto] = useState(false)
  const [langAbierto, setLangAbierto] = useState(false)
  const [orientacion, setOrientacion] = useState('hetero')

  const orientaciones = [
    { value: 'hetero', label: t('orientacion.hetero') },
    { value: 'gay', label: t('orientacion.gay') },
    { value: 'lesbian', label: t('orientacion.lesbian') },
    { value: 'bisexual', label: t('orientacion.bisexual') },
    { value: 'trans', label: t('orientacion.trans') },
    { value: 'todos', label: t('orientacion.todos') },
  ]

  useEffect(() => {
    const stored = localStorage.getItem('usuario')
    if (stored) {
      try {
        const user = JSON.parse(stored)
        setUsuario(user)
        if (user.orientacion) setOrientacion(user.orientacion)
      } catch {}
    }
  }, [pathname])

  async function cambiarOrientacion(valor) {
    setOrientacion(valor)
    setOrientAbierto(false)

    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api'}/auth/orientacion`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orientacion: valor }),
      })

      if (res.ok) {
        const stored = localStorage.getItem('usuario')
        if (stored) {
          const user = JSON.parse(stored)
          user.orientacion = valor
          localStorage.setItem('usuario', JSON.stringify(user))
        }
      }
    } catch {}
  }

  useEffect(() => {
    function cerrarMenus(e) {
      if (!e.target.closest(`.${styles.orientWrap}`)) setOrientAbierto(false)
      if (!e.target.closest(`.${styles.userWrap}`)) setMenuAbierto(false)
      if (!e.target.closest(`.${styles.langWrap}`)) setLangAbierto(false)
    }
    document.addEventListener('mousedown', cerrarMenus)
    return () => {
      document.removeEventListener('mousedown', cerrarMenus)
    }
  }, [])

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    setMenuAbierto(false)
    router.push('/')
  }

  const userName = usuario ? (usuario.nombre || usuario.email.split('@')[0]).toUpperCase() : ''

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <button
            type="button"
            className={`${styles.burger} ${sidebarOpen ? styles.burgerOpen : ''}`}
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={toggleSidebar}
          >
            <span />
            <span />
            <span />
          </button>
          <Link href="/" className={styles.logo} aria-label="WhoresHub home" suppressHydrationWarning>
            <Logo />
          </Link>
        </div>

        <div className={styles.center}>
          <SearchDropdown />
        </div>

        <div className={styles.right}>
          <Link href="/upload/" className={styles.uploadBtn} aria-label="Upload">
            <ion-icon name="cloud-upload-outline" className={styles.uploadIcon}></ion-icon>
          </Link>
          <button
            type="button"
            className={styles.darkBtn}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleDark}
          >
            <ion-icon name={dark ? 'sunny-outline' : 'moon-outline'} className={styles.themeIcon}></ion-icon>
          </button>

          {/* language btn - hidden for now
          <div className={styles.langWrap}>
            <button
              type="button"
              className={styles.langBtn}
              onClick={() => setLangAbierto(!langAbierto)}
            >
              <ion-icon name="globe-outline" className={styles.langIcon}></ion-icon>
            </button>
            {langAbierto && (
              <div className={styles.langMenu}>
                {IDIOMAS.map(idi => (
                  <button
                    key={idi.code}
                    type="button"
                    className={`${styles.langOption} ${lang === idi.code ? styles.langOptionActive : ''}`}
                    onClick={() => { setLang(idi.code); setLangAbierto(false) }}
                  >
                    {idi.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          */}

          {usuario ? (
            <>
              <div className={styles.orientWrap}>
                <button
                  type="button"
                  className={styles.orientBtn}
                  onClick={() => setOrientAbierto(!orientAbierto)}
                >
                  <span>{orientacion.toUpperCase()}</span>
                  <ion-icon name="chevron-down-outline" className={styles.orientChevron}></ion-icon>
                </button>
                {orientAbierto && (
                  <div className={styles.orientMenu}>
                    {orientaciones.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`${styles.orientOption} ${
                          orientacion === o.value ? styles.orientOptionActive : ''
                        }`}
                        onClick={() => cambiarOrientacion(o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.userWrap}>
              <button
                type="button"
                className={styles.userBtn}
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                <div className={styles.userAvatar}>
                  <ion-icon name="person-outline"></ion-icon>
                </div>
                <span className={styles.userName}>{userName}</span>
                <ion-icon name="chevron-down-outline" className={styles.userChevron}></ion-icon>
              </button>

              {menuAbierto && (
                <div className={styles.userMenu}>
                  <div className={styles.userToolsHeader} onClick={() => setToolsAbierto(!toolsAbierto)}>
                    <span>{t('header.tools')}</span>
                    <span className={`${styles.userToolsChevron} ${!toolsAbierto ? styles.userToolsChevronClosed : ''}`}>∨</span>
                  </div>

                  {toolsAbierto && (
                    <div className={styles.userActions}>
                      <button type="button" className={styles.userAction} onClick={() => { setMenuAbierto(false); router.push('/perfil/') }}>
                        <ion-icon name="person-outline"></ion-icon>
                        <span>{t('header.myData')}</span>
                      </button>
                      <button type="button" className={styles.userAction} onClick={() => { setMenuAbierto(false); router.push('/suscripciones/') }}>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <span>{t('header.settingsConfig')}</span>
                      </button>
                      <button type="button" className={styles.userAction} onClick={() => { setMenuAbierto(false); router.push('/favoritos/') }}>
                        <ion-icon name="videocam-outline"></ion-icon>
                        <span>{t('header.notifications')}</span>
                      </button>
                      <button type="button" className={styles.userAction} onClick={() => { setMenuAbierto(false); router.push('/guardados/') }}>
                        <ion-icon name="pricetag-outline"></ion-icon>
                        <span>{t('header.videosSaved')}</span>
                      </button>
                      <button type="button" className={styles.userAction} onClick={cerrarSesion}>
                        <ion-icon name="log-out-outline"></ion-icon>
                        <span>{t('header.logout')}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            </>
          ) : (
            <>
              <Link href="/login/" className={styles.login}>{t('header.login')}</Link>
              <Link href="/signup/" className={styles.signup}>{t('header.signup')}</Link>
            </>
          )}
        </div>
      </header>

      <div className={styles.headerBottom}>
        <div className={styles.navContainer}>
          <Navbar />
        </div>
      </div>
    </>
  )
}
