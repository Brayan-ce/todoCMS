import { Suspense } from 'react'
import Perfil from '@/_PAGES/main/Perfil/Perfil'

export default function PerfilPage() {
  return (
    <Suspense fallback={null}>
      <Perfil />
    </Suspense>
  )
}
