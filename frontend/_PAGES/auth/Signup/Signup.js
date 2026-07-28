'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/_EXTRAS/Logo/Logo'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import styles from './Signup.module.css'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001/api'

export default function Signup() {
  const { lang, setLang, t, IDIOMAS } = useIdioma()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeat, setShowRepeat] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== repeatPassword) {
      setError(t('auth.signup.errors.passwordMismatch'))
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${API}/auth/registro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || t('auth.signup.errors.registrationFailed'))
        return
      }

      setRegistered(true)
      setError('')
    } catch (err) {
      setError(t('auth.signup.errors.connection'))
    } finally {
      setLoading(false)
    }
  }

  async function verifyCode(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API}/auth/verificar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo: code }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || t('auth.signup.errors.invalidCode'))
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      router.push('/')
    } catch (err) {
      setError(t('auth.signup.errors.connection'))
    } finally {
      setLoading(false)
    }
  }

  async function resendCode() {
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API}/auth/reenviar-codigo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || t('auth.signup.errors.resendFailed'))
        return
      }

      alert(t('auth.signup.codeSent'))
    } catch (err) {
      setError(t('auth.signup.errors.connection'))
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className={styles.page}>
        <div className={styles.modal}>
          <div className={styles.topRow}>
          {/* language btn — hidden for future
          <button type="button" className={styles.langBtn} onClick={() => {
            const idx = IDIOMAS.findIndex(i => i.code === lang)
            const next = IDIOMAS[(idx + 1) % IDIOMAS.length]
            setLang(next.code)
          }}>
            <ion-icon name="globe-outline" className={styles.langIcon}></ion-icon>
            <span>{lang.toUpperCase()}</span>
          </button>
          */}
          <Link href="/" className={styles.close} aria-label="Close">
          <ion-icon name="close-outline" className={styles.closeIcon}></ion-icon>
        </Link>
        </div>

        <div className={styles.logoSection}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>
        </div>

        <p className={styles.greeting}>
          {t('auth.signup.verificationSubtitle')} <strong>{email}</strong>
        </p>

          {error && <p className={styles.error}>{error}</p>}

          <form className={styles.form} onSubmit={verifyCode}>
            <div className={styles.field}>
              <label className={styles.label}>{t('auth.signup.verificationCode')}</label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className={styles.input}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading || code.length !== 6}>
              {loading ? t('auth.signup.verifying') : t('auth.signup.verifyAccount')}
            </button>
          </form>

          <button type="button" className={styles.googleBtn} onClick={resendCode} disabled={loading}>
            {t('auth.signup.resendCode')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.modal}>
        <div className={styles.topRow}>
          <Link href="/" className={styles.close} aria-label="Close">
            <ion-icon name="close-outline" className={styles.closeIcon}></ion-icon>
          </Link>
        </div>

        <div className={styles.logoSection}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>
        </div>

        <p className={styles.greeting}>
          {t('auth.signup.subtitle')}
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>{t('auth.signup.email')}</label>
            <div className={styles.inputWrap}>
              <ion-icon name="mail-outline" className={styles.inputIcon}></ion-icon>
              <input
                type="email"
                placeholder={t('auth.signup.emailPlaceholder')}
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('auth.signup.password')}</label>
            <div className={styles.inputWrap}>
              <ion-icon name="lock-closed-outline" className={styles.inputIcon}></ion-icon>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.signup.passwordPlaceholder')}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className={styles.togglePw} onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                <ion-icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} className={styles.inputIcon}></ion-icon>
              </button>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('auth.signup.repeatPassword')}</label>
            <div className={styles.inputWrap}>
              <ion-icon name="lock-closed-outline" className={styles.inputIcon}></ion-icon>
              <input
                type={showRepeat ? 'text' : 'password'}
                placeholder={t('auth.signup.repeatPasswordPlaceholder')}
                className={styles.input}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <button type="button" className={styles.togglePw} onClick={() => setShowRepeat(!showRepeat)} aria-label="Toggle password visibility">
                <ion-icon name={showRepeat ? 'eye-off-outline' : 'eye-outline'} className={styles.inputIcon}></ion-icon>
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={true}>
            {loading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
          </button>
        </form>

        <button type="button" className={styles.googleBtn}>
          <svg className={styles.googleIcon} viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {t('auth.signup.google')}
        </button>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {t('auth.signup.hasAccount')} <Link href="/login/" className={styles.footerLink}>{t('auth.signup.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
