'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { IDIOMAS, IDIOMA_DEFECTO, obtenerIdiomaValido } from './idiomas'
import en from './traducciones/en'
import es from './traducciones/es'

const traducciones = { en, es }

const IdiomasContext = createContext()

export function IdiomasProvider({ children }) {
  const [lang, setLangState] = useState(IDIOMA_DEFECTO)
  const iniciado = useRef(false)

  useEffect(() => {
    if (!iniciado.current) {
      const stored = localStorage.getItem('idioma')
      if (stored) setLangState(obtenerIdiomaValido(stored))
      iniciado.current = true
    }
  }, [])

  const setLang = useCallback((l) => {
    const valido = obtenerIdiomaValido(l)
    setLangState(valido)
    localStorage.setItem('idioma', valido)
  }, [])

  const t = useCallback((key) => {
    const strings = traducciones[lang]
    if (!strings) return key
    const keys = key.split('.')
    let val = strings
    for (const k of keys) {
      if (val == null) return key
      val = val[k]
    }
    return val ?? key
  }, [lang])

  return (
    <IdiomasContext.Provider value={{ lang, setLang, t, IDIOMAS }}>
      {children}
    </IdiomasContext.Provider>
  )
}

export function useIdioma() {
  const ctx = useContext(IdiomasContext)
  if (!ctx) throw new Error('useIdioma must be used within IdiomasProvider')
  return ctx
}
