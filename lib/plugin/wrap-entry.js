const slugify = require('@sindresorhus/slugify')
const findAllAfter = require('unist-util-find-all-after')
const findAllBetween = require('unist-util-find-all-between')
const select = require('unist-util-select')
const generateId = require('./generate-id')

module.exports = function wrapEntry(tree, { isPage }) {
  const titleNode = select(tree, 'element[tagName="h3"]')[0]
  const subEntryNodes = select(tree, 'element[tagName="h4"]')
  const title = titleNode.children[0].value
  const slug = slugify(title, { decamelize: false })
  const id = generateId()

  const entry = {
    type: 'element',
    tagName: 'docsEntry',
    properties: { id, title, slug },
    children: [
      ...(subEntryNodes.length > 0
        ? findAllBetween(tree, titleNode, subEntryNodes[0])
        : [titleNode, ...findAllAfter(tree, titleNode)])
    ]
  }

  const subEntries = subEntryNodes.map((item, idx, all) => ({
    type: 'element',
    tagName: 'docsSubentry',
    properties: {
      id: generateId(),
      title: item.children[0].value,
      slug: slugify(item.children[0].value, { decamelize: false })
    },
    children: all[idx + 1]
      ? findAllBetween(tree, item, all[idx + 1])
      : [item, ...findAllAfter(tree, item)]
  }))

  const toc = {
    id,
    title,
    slug,
    isPage,
    subEntries: subEntries.map(subEntry => subEntry.properties)
  }

  return { content: [entry, ...subEntries], toc }
}
