import Home from '@/_PAGES/main/Home/Home'
import { videoSections, categorySection, bottomTags } from '@/data/content'
import images from '@/data/images'

export default async function Page({ params }) {
  const { slug } = await params
  const name = slug ? decodeURIComponent(slug.join('/').replace(/-/g, ' ')) : 'Tags'
  const title = name.charAt(0).toUpperCase() + name.slice(1)
  const allVideos = [...videoSections[0].videos, ...videoSections[1].videos, ...videoSections[2].videos]
  const videos = allVideos.slice(0, 35)
  const section = { ...videoSections[0], videos, pageType: 'tagged', dynamicSuffix: title.toLowerCase(), sortLabel: 'Top Rated', as: 'h1' }
  return <Home videoSections={[section]} categorySection={null} bottomTags={null} images={images} />
}
