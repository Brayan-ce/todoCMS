import { videoSections, categorySection, bottomTags, popularCategories, popularTags, trendingSearches } from '@/data/content'
import images from '@/data/images'

export function getHomeData() {
  return { videoSections, categorySection, bottomTags, images }
}

export function getSidebarData() {
  return { popularCategories, popularTags, trendingSearches }
}
