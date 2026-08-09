'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Logo from '@/_EXTRAS/Logo/Logo'
import { footerColumns, footerCopy, footerSpot } from '@/data/content'
import styles from './Footer.module.css'

export default function Footer({ isHome }) {
  const { t } = useIdioma()
  return (
    <footer className={`${styles.footer} ${styles.footerIndex}`}>
      {isHome && (
        <div className={styles.sectionSpot}>
          <div className={styles.spotInner}>
            <h2 className={styles.spotTitle}>{t('footer.spot.title')}</h2>
            <div className={styles.spotText}>
              <p>{t('footer.spot.text')}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <div className={styles.footerWrap}>
          <div className={`${styles.col} ${styles.second}`}>
            <Link href="/" className={styles.logo} aria-label="WhoresHub">
              <Logo />
            </Link>
            <p className={styles.copy}>{t('footer.copy')}</p>
          </div>

          {footerColumns.map((col, colIndex) => {
            const colKey = `footer.col${colIndex}`
            const hasAccent = !!col.accent
            return (
              <div key={colIndex} className={`${styles.col} ${!col.mobile ? styles.mobileHidden : ''}`}>
                <h3 className={styles.title}>
                  {hasAccent ? (
                    <>
                      <span>{t(`${colKey}.accent`)}</span> {t(`${colKey}.rest`)}
                    </>
                  ) : (
                    <span>{t(`${colKey}.title`)}</span>
                  )}
                </h3>
                <ul className={styles.footerList}>
                  {col.links.map((link, linkIndex) => (
                    <li key={linkIndex} className={styles.item}>
                      <Link href={link.href}>
                        {t(`${colKey}.links.${linkIndex}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
