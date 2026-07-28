const idiomas = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

export const IDIOMAS = idiomas
export const IDIOMA_DEFECTO = 'en'

export function obtenerIdiomaValido(code) {
  return idiomas.find(i => i.code === code) ? code : IDIOMA_DEFECTO
}
