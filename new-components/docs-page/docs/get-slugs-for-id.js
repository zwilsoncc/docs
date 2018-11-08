import { tocDict } from './toc'

export default function getSlugsForId(id) {
  const item = tocDict[id]
  if (!item) {
    return {}
  }

  switch (item.type) {
    case 'category':
      return {
        category: item.slug,
        section: null,
        entry: null
      }
    case 'section':
      return {
        category: item.category,
        section: item.slug,
        entry: null
      }
    case 'entry':
      return {
        category: item.category,
        section: item.section,
        entry: item.slug
      }
    case 'subEntry':
      return {
        category: item.category,
        section: item.section,
        entry: item.entry,
        subEntry: item.slug
      }
    default:
      return {}
  }
}
