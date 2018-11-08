const { flatten } = require('ramda')
const select = require('unist-util-select')
const getImportParams = require('./get-import-params')
const tocImportName = require('./toc-import-name')

module.exports = function getTOCsToExport(tree) {
  return flatten(
    select(tree, 'import').map(node =>
      node.value
        .split('\n')
        .map(value => tocImportName(getImportParams(value).name))
    )
  ).join(', ')
}
