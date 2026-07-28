import { videoSections } from '@/data/content'
import images from '@/data/images'

export function getVideoData(id) {
  for (const section of videoSections) {
    const video = section.videos.find((v) => v.id === Number(id))
    if (video) {
      return {
        video,
        image: images[video.imageIndex] || images[0],
        related: section.videos.filter((v) => v.id !== video.id).slice(0, 10),
        allImages: images,
      }
    }
  }
  return null
}
