'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from '@/_EXTRAS/Icons/Icons'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import { navItems } from '@/data/content'
import VideoDropdown from './componentes/VideoDropdown'
import CategoriesDropdown from './componentes/CategoriesDropdown'
import TagsDropdown from './componentes/TagsDropdown'
import AlbumsDropdown from './componentes/AlbumsDropdown'
import ModelsDropdown from './componentes/ModelsDropdown'
import styles from './Navbar.module.css'

const dropdownComponents = {
  Videos: VideoDropdown,
  Categories: CategoriesDropdown,
  Tags: TagsDropdown,
  Albums: AlbumsDropdown,
  Models: ModelsDropdown,
}

const navKeyMap = {
  'Home': 'nav.home',
  'Videos': 'nav.videos',
  'Categories': 'nav.categories',
  'Tags': 'nav.tags',
  'Albums': 'nav.albums',
  'Models': 'nav.models',
  'Theporndude': 'nav.theporndude',
  'LIVE SEX': 'nav.livesex',
  'Telegram': 'nav.telegram',
  'Premium': 'nav.premium',
}

export default function Navbar() {
  const { t } = useIdioma()
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    setOpenDropdown(null)
  }, [pathname])

  function isActive(item) {
    if (item.label === 'Home') return pathname === '/'
    if (item.label === 'Videos') return pathname.startsWith('/latest-updates') || pathname.startsWith('/most-viewed') || pathname.startsWith('/top-rated') || pathname.startsWith('/videos')
    if (item.label === 'Categories') return pathname === '/categories' || pathname.startsWith('/categories/')
    if (item.label === 'Tags') return pathname === '/tags' || pathname.startsWith('/tags/')
    if (item.label === 'Albums') return pathname.startsWith('/albums')
    if (item.label === 'Models') return pathname.startsWith('/models')
    return false
  }

  function handleComingSoon(e) {
    e.preventDefault()
    alert('Coming soon!')
  }

  return (
    <nav className={styles.nav} aria-label="Main">
      {navItems.map((item) => {
        const isOpen = openDropdown === item.label
        const DropdownComponent = dropdownComponents[item.label]

        const active = isActive(item)

        if (item.comingSoon && item.dropdownType) {
          return (
            <button
              key={item.label}
              type="button"
              className={`${styles.navLink} ${active ? styles.active : ''} ${isOpen ? styles.open : ''}`}
              onClick={handleComingSoon}
            >
              <span>{t(navKeyMap[item.label])}</span>
              <Icon name="arrow-down" className={styles.arrow} />
            </button>
          )
        }

        if (item.comingSoon) {
          return (
            <a
              key={item.label}
              href={item.href || '#'}
              className={`${styles.navLink} ${active ? styles.active : ''}`}
              onClick={handleComingSoon}
            >
              {t(navKeyMap[item.label])}
            </a>
          )
        }

        if (item.dropdownType && DropdownComponent) {
          return (
            <div
              key={item.label}
              className={`${styles.dropdownWrap} ${item.dropdownType === 'full' ? styles.dropdownFull : ''}`}
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`${styles.navLink} ${active ? styles.active : ''} ${isOpen ? styles.open : ''}`}
                onClick={() => setOpenDropdown(isOpen ? null : item.label)}
              >
                <span>{t(navKeyMap[item.label])}</span>
                <Icon name="arrow-down" className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`} />
              </button>
              {isOpen && (
                <div className={`${styles.dropdown} ${item.dropdownType === 'full' ? styles.dropdownFullMenu : ''}`}>
                  <DropdownComponent />
                </div>
              )}
            </div>
          )
        }

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${active ? styles.active : ''}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(navKeyMap[item.label])}
            </a>
          )
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`${styles.navLink} ${active ? styles.active : ''}`}
          >
            {t(navKeyMap[item.label])}
          </Link>
        )
      })}
    </nav>
  )
}
