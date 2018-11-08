import getTOCForSlugs from './get-toc-for-slugs'

const PREFIX = `/docs/v2`

function _getHref({ category, section, entry, subEntry }) {
  const tocItem = getTOCForSlugs({ category, section, entry, subEntry })
  switch (tocItem.type) {
    case 'subEntry': {
      const tocEntry = getTOCForSlugs({ category, section, entry })
      return tocEntry.isPage
        ? `${PREFIX}/${category}/${section}/${entry}#${subEntry}`
        : `${PREFIX}/${category}/${section}#${entry}/${subEntry}`
    }
    case 'entry': {
      return tocItem.isPage
        ? `${PREFIX}/${category}/${section}/${entry}`
        : `${PREFIX}/${category}/${section}#${entry}`
    }
    case 'section': {
      return tocItem.isPage ? `${PREFIX}/${category}/${section}` : null
    }
    default: {
      return `${PREFIX}/${category}/${section}`
    }
  }
}

export default function getHref({ category, section, entry, subEntry }) {
  const href = _getHref({ category, section, entry, subEntry })
  return { href, as: href }
}
