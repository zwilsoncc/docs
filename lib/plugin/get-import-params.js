module.exports = function getImportParams(value) {
  const groups = /^import ([^ ]*) from ([^ ]*)/g.exec(value)
  return { name: groups[1], from: groups[2] }
}
