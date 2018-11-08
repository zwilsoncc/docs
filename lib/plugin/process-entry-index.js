const map = require('unist-util-map')
const select = require('unist-util-select')
const slugify = require('@sindresorhus/slugify')
const addTOCToImport = require('./add-toc-to-import')
const generateId = require('./generate-id')
const getTOCsToExport = require('./get-tocs-to-export')

module.exports = function processEntryIndex(tree) {
  const tocsToExport = getTOCsToExport(tree)
  const selection = select(tree, 'element[tagName="h2"]')[0]
  if (!selection) {
    throw new Error('A entry index file must include a h2 title')
  }

  const id = generateId()
  const title = selection.children[0].value
  const slug = slugify(title, { decamelize: false })
  return map(
    {
      ...tree,
      children: [
        ...tree.children,
        {
          type: 'export',
          default: false,
          value: `export const toc = {id: "${id}", title: "${title}", slug: "${slug}", entries: [${tocsToExport}] }`
        }
      ]
    },
    addTOCToImport
  )
}
