const select = require('unist-util-select')
const { flatten } = require('ramda')
const findAllAfter = require('unist-util-find-all-after')
const findAllBefore = require('unist-util-find-all-before')
const findAllBetween = require('unist-util-find-all-between')
const slugify = require('@sindresorhus/slugify')
const generateId = require('./generate-id')
const wrapEntry = require('./wrap-entry')

module.exports = function processSection(tree, filepath) {
  const titleNode = select(tree, 'element[tagName="h2"]')[0]
  const entryNodes = select(tree, 'element[tagName="h3"]')
  if (!titleNode) {
    throw new Error(`The MDX entry file ${filepath} must include an h2 title`)
  }

  const title = titleNode.children[0].value
  const slug = slugify(title, { decamelize: false })
  const id = generateId()
  const imports = findAllBefore(tree, titleNode)
  const section = {
    type: 'element',
    tagName: 'docsSection',
    properties: { id, title, slug },
    children: [
      ...(entryNodes.length > 0
        ? findAllBetween(tree, titleNode, entryNodes[0])
        : [titleNode, ...findAllAfter(tree, titleNode)])
    ]
  }

  const entriesInfo = entryNodes.map((item, idx, all) => {
    return wrapEntry(
      {
        type: 'root',
        children: all[idx + 1]
          ? findAllBetween(tree, item, all[idx + 1])
          : [item, ...findAllAfter(tree, item)]
      },
      { isPage: false }
    )
  })

  const toc = {
    id,
    title,
    slug,
    isPage: true,
    entries: entriesInfo.map(({ toc: entryTOC }) => entryTOC)
  }

  const tocExport = {
    type: 'export',
    default: false,
    value: `export const toc=${JSON.stringify(toc)}`
  }

  return {
    ...tree,
    children: [
      ...imports,
      section,
      ...flatten(entriesInfo.map(({ content: entryContent }) => entryContent)),
      tocExport
    ]
  }
}
