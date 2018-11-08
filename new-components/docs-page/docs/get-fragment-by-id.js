import { tocDict } from './toc'
import getTOCForSlugs from './get-toc-for-slugs'

export default function getFragmentById(id) {
  const item = tocDict[id]

  if (!item) {
    return null
  }

  const { category, section, entry } = item

  switch (item.type) {
    case 'entry':
      return item.isPage ? null : item.slug
    case 'subEntry': {
      const entryTOC = getTOCForSlugs({ category, section, entry })
      const sectionTOC = getTOCForSlugs({ category, section })
      return sectionTOC.isPage || !entryTOC.isPage
        ? `${entryTOC.slug}/${item.slug}`
        : item.slug
    }
    default:
      return null
  }
}
