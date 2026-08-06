'use client'

import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import Dropdown from '../Dropdown/Dropdown'
import VideoCard from '../VideoCard/VideoCard'
import Pagination from '../Pagination/Pagination'
import styles from './VideoSection.module.css'

const sortLabelKeyMap = {
  'Top Rated': 'home.sortLabels.topRated',
  'Most Favourited': 'home.sortLabels.mostFavourited',
  'Most Viewed': 'home.sortLabels.mostViewed',
}

export default function VideoSection({
  id,
  titleLead,
  titleRest,
  titlePrefix = '',
  as: TitleTag = 'h2',
  sortLabel,
  videos,
  images,
  showPagination = true,
  pageType,
  dynamicSuffix,
}) {
  const { t } = useIdioma()

  let displayLead = titleLead
  let displayRest = titleRest
  if (pageType === 'tagged') {
    displayLead = t('home.pages.tagged.lead')
    displayRest = t('home.pages.tagged.rest')
  } else if (pageType) {
    displayLead = t(`home.pages.${pageType}.lead`)
    displayRest = t(`home.pages.${pageType}.rest`)
  } else if (id) {
    const sectionLead = t(`home.sections.${id}.lead`)
    if (sectionLead !== `home.sections.${id}.lead`) {
      displayLead = sectionLead
      displayRest = t(`home.sections.${id}.rest`)
    }
  }

  let displaySortLabel = sortLabel
  if (sortLabel && sortLabelKeyMap[sortLabel]) {
    displaySortLabel = t(sortLabelKeyMap[sortLabel])
  }

  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.blockThumbs}>
          <div className={styles.headline}>
            <TitleTag className={`${styles.title}${pageType === 'categories' ? ' ' + styles.titlePlain : ''}`}>
              {pageType === 'tagged' ? (
                <><span>{displayLead}</span> {displayRest} {dynamicSuffix}</>
              ) : (
                <>{titlePrefix}<span>{displayLead}</span> {displayRest}</>
              )}
              <span className={styles.isHd}>HD</span>
            </TitleTag>
            {pageType === 'tags' ? (
              <Dropdown
                label={t('home.tagFilter.videos')}
                className={styles.sort}
                filter
                selectedKey="videos"
                optionKeys={['videos', 'albums']}
                labelPrefix="home.tagFilter"
                optionIcons={{ videos: 'camcorder' }}
              />
            ) : (
              displaySortLabel && <Dropdown label={displaySortLabel} className={styles.sort} filter />
            )}
          </div>

          <div className={styles.thumbs}>
            {videos.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                imageSrc={images[video.imageIndex % images.length]}
                quick={pageType === 'categories'}
                first={i === 0}
                tags={pageType === 'tags'}
              />
            ))}
          </div>

          {showPagination && <Pagination basePath={`/latest-updates`} />}
        </div>
      </div>
    </section>
  )
}
