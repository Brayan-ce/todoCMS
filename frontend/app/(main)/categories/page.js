import Home from '@/_PAGES/main/Home/Home'
import { videoSections, categorySection, bottomTags } from '@/data/content'
import images from '@/data/images'

export default function Page() {
  const allVideos = [...videoSections[0].videos, ...videoSections[1].videos, ...videoSections[2].videos]
  const videos = allVideos.slice(0, 35)
  const section = { ...videoSections[0], videos, pageType: 'categories', as: 'h1', sortLabel: 'Top Rated' }
  return <Home videoSections={[section]} categorySection={null} bottomTags={null} images={images} />
}
