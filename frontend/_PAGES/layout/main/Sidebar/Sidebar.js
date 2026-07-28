'use client'

import Link from 'next/link'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { useShell } from '@/_EXTRAS/Shell/ShellContext'
import Dropdown from '@/_PAGES/main/Home/componentes/Dropdown/Dropdown'
import Tag from '@/_PAGES/main/Home/componentes/Tag/Tag'
import Logo from '@/_EXTRAS/Logo/Logo'
import styles from './Sidebar.module.css'

export default function Sidebar({
  popularTags = [],
  popularCategories = [],
  trendingSearches = [],
}) {
  const { t, lang, setLang, IDIOMAS } = useIdioma()
  const { dark, toggleDark, sidebarOpen, closeSidebar } = useShell()

  return (
    <aside
      className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
      aria-hidden={!sidebarOpen}
      aria-label="Filters"
    >
      <div className={styles.sidebarInner}>
        <Link href="/" className={styles.logoMobile} aria-label="WhoresHub home" suppressHydrationWarning onClick={closeSidebar}>
          <Logo />
        </Link>

        <div className={styles.mobileActions}>
          <button type="button" className={styles.mobileActionBtn} onClick={() => ir('/upload/')}>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>{t('upload.video')}</span>
          </button>
          <button type="button" className={styles.mobileActionBtn} onClick={toggleDark}>
            <ion-icon name={dark ? 'sunny-outline' : 'moon-outline'}></ion-icon>
            <span>{dark ? t('header.light') : t('header.dark')}</span>
          </button>
          <div className={styles.mobileLangRow}>
            {IDIOMAS.map((idi) => (
              <button
                key={idi.code}
                type="button"
                className={`${styles.mobileLangBtn} ${lang === idi.code ? styles.mobileLangBtnActive : ''}`}
                onClick={() => { setLang(idi.code); closeSidebar() }}
              >
                {idi.label}
              </button>
            ))}
          </div>
        </div>



        <div className={styles.box}>
          <h3 className={styles.title}>{t('sidebar.sortBy')}</h3>
          <Dropdown label="Videos" />
        </div>

        <div className={styles.box}>
          <h3 className={styles.title}>{t('sidebar.videoQuality')}</h3>
          <ul className={`${styles.tagsList} ${styles.listHd}`}>
            <li className={styles.item}>
              <Tag asButton active>
                {t('sidebar.all')}
              </Tag>
            </li>
            <li className={styles.item}>
              <Tag asButton>{t('sidebar.hd')}</Tag>
            </li>
          </ul>
        </div>

        <div className={styles.box}>
          <h3 className={styles.title}>{t('sidebar.popularTags')}</h3>
          <ul className={styles.tagsList}>
            {popularTags.map((tag) => (
              <li key={tag} className={styles.item}>
                <Tag href={`/tags/${tag.replace(/\s+/g, '-')}/`}>{tag}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.box}>
          <h3 className={styles.title}>{t('sidebar.popularCategories')}</h3>
          <ul className={styles.tagsList}>
            {popularCategories.map((name) => (
              <li key={name} className={styles.item}>
                <Tag href={`/categories/${name.toLowerCase()}/`}>{name}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.box}>
          <div className={styles.searchResults}>
            <h2 className={styles.title}>{t('sidebar.trendingSearches')}</h2>
            <ul className={`${styles.tagsList} ${styles.second}`}>
              {trendingSearches.map((item) => (
                <li key={item.name} className={styles.item}>
                  <Tag
                    href={`/search/${encodeURIComponent(item.name.slice(0, 40))}/`}
                    title={item.name}
                    value={item.value}
                    className={styles.trending}
                  >
                    {item.name}
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}
