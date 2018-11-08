const map = require('unist-util-map')
const select = require('unist-util-select')
const slugify = require('@sindresorhus/slugify')
const addTOCToImport = require('./add-toc-to-import')
const generateId = require('./generate-id')
const getTOCsToExport = require('./get-tocs-to-export')

module.exports = function processSectionIndex(tree) {
  const tocsToExport = getTOCsToExport(tree)
  const selection = select(tree, 'element[tagName="h1"]')[0]
  if (!selection) {
    throw new Error('A category index file must include a h1 title')
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
          value: `export const toc = {id: "${id}", title: "${title}", slug: "${slug}", sections: [${tocsToExport}] }`
        }
      ]
    },
    addTOCToImport
  )
}
