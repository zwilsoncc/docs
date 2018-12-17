const execa = require('execa')
const { resolve } = require('path')
const fs = require('fs')
const glob = require('glob')
const { promisify } = require('util')
const logger = console

const writeFile = promisify(fs.writeFile)
const globPromise = promisify(glob)
const getGitDate = async file =>
  new Date(
    await execa.stdout('git', ['log', '-1', '--format="%ad"', '--', file])
  ).toISOString()
const lastEditedPath = 'lib/data/last-edited.json'

async function getFileStats() {
  const files = await globPromise(resolve('./pages/docs/**/*.{js,md,mdx}'))

  const stats = await Promise.all(
    files
      .map(file => file.split('/pages/'))
      .map(file => file[1])
      .map(file => `pages/${file}`)
      .map(file => Promise.all([getGitDate(file), Promise.resolve(file)]))
  )

  return stats.reduce(
    (results, [stat, filePath]) => ({ ...results, [filePath]: stat }),
    {}
  )
}

async function main(fileStats) {
  const filePath = resolve(`./${lastEditedPath}`)
  await writeFile(filePath, JSON.stringify(fileStats, null, 2), 'utf8')
  logger.log('Last edited file updated')
}

async function commit() {
  const modified = await execa.stdout('git', ['ls-files', '-m'])

  if (modified.includes(lastEditedPath)) {
    await execa('git', ['add', lastEditedPath])
    await execa('git', ['commit', '--amend', '--no-edit'])
  }
}

getFileStats()
  .then(main)
  .then(commit)
  .catch(error => logger.error(error))
