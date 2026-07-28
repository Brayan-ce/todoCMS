import AlbumsPage from '@/_PAGES/main/Albums/AlbumsPage'
import { albumsData } from '@/data/content'
import images from '@/data/images'

export default function Page() {
  return <AlbumsPage titleLead="Top" titleRest="Rated Albums" albums={albumsData} images={images} />
}
