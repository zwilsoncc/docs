const getFilepathSlugs = require('./get-filepath-slugs')
const processEntry = require('./process-entry')
const processEntryIndex = require('./process-entry-index')
const processMainIndex = require('./process-main-index')
const processSection = require('./process-section')
const processSectionIndex = require('./process-section-index')
const shouldProcess = require('./should-process')

module.exports = function plugin({ docsRoot }) {
  return ({ filepath }) => ast => {
    if (shouldProcess(docsRoot, filepath)) {
      const { category, section, entry } = getFilepathSlugs(docsRoot, filepath)
      if (category === 'index') {
        return processMainIndex(ast)
      } else if (section === 'index') {
        return processSectionIndex(ast)
      } else if (entry === 'index') {
        return processEntryIndex(ast)
      } else if (section && section !== 'index' && !entry) {
        return processSection(ast)
      } else if (section && entry && entry !== 'index') {
        return processEntry(ast)
      }
    }

    return ast
  }
}
