const map = require('unist-util-map')
const addTOCToImport = require('./add-toc-to-import')
const getTOCsToExport = require('./get-tocs-to-export')

module.exports = function processMainIndex(tree) {
  return map(appendTOCFromImport(tree), addTOCToImport)
}

function appendTOCFromImport(tree) {
  return {
    ...tree,
    children: [
      ...tree.children,
      {
        type: 'export',
        default: false,
        value: `export const toc = [${getTOCsToExport(tree)}]`
      }
    ]
  }
}
