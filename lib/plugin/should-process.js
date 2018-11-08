module.exports = function shouldProcess(root, filepath) {
  return filepath.startsWith(root)
}
