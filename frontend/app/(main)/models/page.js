import ModelsPage from '@/_PAGES/main/Models/ModelsPage'
import { modelsData } from '@/data/content'
import images from '@/data/images'

export default function Page() {
  return <ModelsPage models={modelsData} images={images} />
}
