'use client'

import { usePathname } from 'next/navigation'
import Header from '@/_PAGES/layout/main/Header/Header'
import Sidebar from '@/_PAGES/layout/main/Sidebar/Sidebar'
import Footer from '@/_PAGES/layout/main/Footer/Footer'
import AgeModal from '@/_EXTRAS/AgeModal/AgeModal'
import { useShell } from '@/_EXTRAS/Shell/ShellContext'
import styles from './shell.module.css'

export default function ClientShell({ children, sidebar }) {
  const { sidebarOpen, closeSidebar } = useShell()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className={styles.wrapper}>
      <AgeModal />
      <Header />
      <div className={styles.main}>
        <div className={styles.mainInner}>
          {sidebarOpen && (
            <button
              type="button"
              className={styles.backdrop}
              aria-label="Close sidebar"
              onClick={closeSidebar}
            />
          )}
          <div className={`${styles.sidebarWrap} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
            <Sidebar {...sidebar} />
          </div>
          <div className={`${styles.content} ${sidebarOpen ? styles.contentOpen : ''}`}>
            {children}
          </div>
        </div>
      </div>
      <Footer isHome={isHome} />
    </div>
  )
}
