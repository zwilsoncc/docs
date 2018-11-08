const findAllBefore = require('unist-util-find-all-before')
const select = require('unist-util-select')
const wrapEntry = require('./wrap-entry')

module.exports = function processEntry(tree, filepath) {
  const titleNode = select(tree, 'element[tagName="h3"]')[0]
  if (!titleNode) {
    throw new Error(`The MDX entry file ${filepath} must include an h3 title`)
  }

  const { content: entryContent, toc } = wrapEntry(tree, { isPage: true })
  const imports = findAllBefore(tree, titleNode)

  const tocExport = {
    type: 'export',
    default: false,
    value: `export const toc = ${JSON.stringify(toc)}`
  }

  return {
    ...tree,
    children: [...imports, ...entryContent, tocExport]
  }
}
