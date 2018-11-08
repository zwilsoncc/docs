module.exports = function getFilepathSlugs(root, filepath) {
  const relative = filepath.slice(root.length + 1, filepath.indexOf('.'))
  const [category, section, entry] = relative.split('/')
  return { category, section, entry }
}
