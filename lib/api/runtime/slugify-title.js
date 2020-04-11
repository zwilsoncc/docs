import slugify from '@sindresorhus/slugify'

export default function slugifyTitle(title) {
  if (Array.isArray(title)) {
    const combinedTitle = title
      .map(item => {
        // If child is ProductNameWrapper, get the value from the name prop
        if (typeof item === 'object' && item !== null && item.props) {
          return item.props.name || ''
        } else {
          return item
        }
      })
      .join()
    return slugify(combinedTitle, { decamelize: false })
  } else {
    return slugify(title, { decamelize: false })
  }
}
