import AlbumsPage from '@/_PAGES/main/Albums/AlbumsPage'
import { albumsData } from '@/data/content'
import images from '@/data/images'

export default function Page() {
  const sorted = [...albumsData].sort((a, b) => b.views - a.views)
  return <AlbumsPage titleLead="Most" titleRest="Viewed Albums" albums={sorted} images={images} />
}
