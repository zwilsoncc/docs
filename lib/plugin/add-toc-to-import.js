const getImportParams = require('./get-import-params')
const tocImportName = require('./toc-import-name')

module.exports = function addTOCToImport(node) {
  if (node.type === 'import') {
    return {
      ...node,
      value: node.value
        .split('\n')
        .map(item => {
          const { name, from } = getImportParams(item)
          return `import ${name}, { toc as ${tocImportName(
            name
          )} } from ${from}`
        })
        .join('\n')
    }
  }

  return node
}
