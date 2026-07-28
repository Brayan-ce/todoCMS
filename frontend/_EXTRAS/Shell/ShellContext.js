'use client'

import { createContext, useContext, useCallback, useEffect, useState } from 'react'

const ShellContext = createContext(null)

export function ShellProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'dark') {
      setDark(true)
      document.body.classList.add('dark')
      document.body.classList.remove('white')
    } else {
      document.body.classList.add('white')
      document.body.classList.remove('dark')
    }
  }, [])

  const toggleDark = useCallback(() => {
    setDark((prev) => {
      const next = !prev
      if (next) {
        document.body.classList.add('dark')
        document.body.classList.remove('white')
        window.localStorage.setItem('theme', 'dark')
      } else {
        document.body.classList.add('white')
        document.body.classList.remove('dark')
        window.localStorage.setItem('theme', 'light')
      }
      return next
    })
  }, [])

  const openSidebar = useCallback(() => setSidebarOpen(true), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), [])

  useEffect(() => {
    if (!sidebarOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sidebarOpen, closeSidebar])

  return (
    <ShellContext.Provider value={{ dark, sidebarOpen, toggleDark, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </ShellContext.Provider>
  )
}

export function useShell() {
  const ctx = useContext(ShellContext)
  if (!ctx) throw new Error('useShell must be used within ShellProvider')
  return ctx
}
