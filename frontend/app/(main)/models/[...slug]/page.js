import ModelProfile from '@/_PAGES/main/Models/ModelProfile'
import { modelsData, videoSections } from '@/data/content'
import images from '@/data/images'

export default async function Page({ params }) {
  const { slug } = await params
  const name = slug.join('/').replace(/-/g, ' ')
  const model = modelsData.find((m) => m.name.toLowerCase() === name.toLowerCase())
  if (!model) return <h1>Model not found</h1>
  const allVideos = [...videoSections[0].videos, ...videoSections[1].videos, ...videoSections[2].videos]
  return <ModelProfile model={model} image={images[model.imageIndex]} videos={allVideos} images={images} />
}
