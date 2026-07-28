import AlbumViewer from '@/_PAGES/main/Albums/AlbumViewer'
import { albumsData } from '@/data/content'
import images from '@/data/images'

export default async function Page({ params }) {
  const { slug } = await params
  const slugStr = slug.join('/')
  const album = albumsData.find((a) => a.slug === slugStr)
  if (!album) return <h1>Album not found</h1>
  const related = albumsData.filter((a) => a.slug !== slugStr)
  return <AlbumViewer album={album} images={images} related={related} />
}
