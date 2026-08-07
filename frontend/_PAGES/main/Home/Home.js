import VideoSection from './componentes/VideoSection/VideoSection'
import CategorySection from './componentes/CategorySection/CategorySection'
import TagCloud from './componentes/TagCloud/TagCloud'

export default function Home({ videoSections, categorySection, bottomTags, images }) {
  return (
    <>
      {videoSections.map((section) => (
        <VideoSection
          key={section.id}
          id={section.id}
          titleLead={section.titleLead}
          titleRest={section.titleRest}
          titlePrefix={section.titlePrefix || ''}
          as={section.as}
          sortLabel={section.sortLabel}
          videos={section.videos}
          images={images}
          showPagination
          pageType={section.pageType}
          dynamicSuffix={section.dynamicSuffix}
          filterPage={section.filterPage}
        />
      ))}

      {categorySection && (
        <CategorySection
          titleLead={categorySection.titleLead}
          titleRest={categorySection.titleRest}
          sortLabel={categorySection.sortLabel}
          items={categorySection.items}
          images={images}
        />
      )}

      {bottomTags && <TagCloud tags={bottomTags} />}
    </>
  )
}
