import VideoPage from '@/_PAGES/main/Videos/VideoPage'
import { getVideoData } from '@/_PAGES/main/Videos/servidor'

export default async function Page({ params }) {
  const { slug } = await params
  const id = slug[0]
  const data = getVideoData(id)
  if (!data) return <h1>Video not found</h1>
  return <VideoPage {...data} />
}
