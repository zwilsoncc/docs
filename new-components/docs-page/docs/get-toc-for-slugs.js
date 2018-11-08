import { tocDict } from './toc'
const TOC_ITEMS = Object.values(tocDict)

export default function getTOCForSlugs({ category, section, entry, subEntry }) {
  if (subEntry) {
    return TOC_ITEMS.find(
      item =>
        item.type === 'subEntry' &&
        item.category === category &&
        item.section === section &&
        item.entry === entry &&
        item.slug === subEntry
    )
  } else if (entry) {
    return TOC_ITEMS.find(
      item =>
        item.type === 'entry' &&
        item.category === category &&
        item.section === section &&
        item.slug === entry
    )
  } else if (section) {
    return TOC_ITEMS.find(
      item =>
        item.type === 'section' &&
        item.category === category &&
        item.slug === section
    )
  } else {
    return TOC_ITEMS.find(
      item => item.type === 'category' && item.slug === category
    )
  }
}
