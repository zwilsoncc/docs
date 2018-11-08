import { toc } from '~/docs/index.mdx'

function addDetails(structure) {
  return structure.map(category => ({
    ...category,
    type: 'category',
    sections: category.sections.map(section => ({
      ...section,
      type: 'section',
      category: category.slug,
      entries: section.entries.map(entry => ({
        ...entry,
        type: 'entry',
        category: category.slug,
        section: section.slug,
        subEntries: entry.subEntries.map(subEntry => ({
          ...subEntry,
          type: 'subEntry',
          category: category.slug,
          section: section.slug,
          entry: entry.slug,
          slug: subEntry.slug
        }))
      }))
    }))
  }))
}

function unfold(structure) {
  return structure.reduce(
    (acc1, category) => ({
      ...acc1,
      [category.id]: category,
      ...category.sections.reduce(
        (acc2, section) => ({
          ...acc2,
          [section.id]: section,
          ...section.entries.reduce(
            (acc3, entry) => ({
              ...acc3,
              [entry.id]: entry,
              ...entry.subEntries.reduce(
                (acc4, subEntry) => ({
                  ...acc4,
                  [subEntry.id]: subEntry
                }),
                {}
              )
            }),
            {}
          )
        }),
        {}
      )
    }),
    {}
  )
}

export default toc
export const tocDict = unfold(addDetails(toc))
