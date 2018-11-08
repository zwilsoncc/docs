const fs = require('fs')
const { resolve } = require('path')

async function main() {
  const nowExamplesDir = process.argv[2]
  const readmePath = resolve(nowExamplesDir, 'README.md')
  const readme = fs.readFileSync(readmePath, 'utf8')

  const r = /^\| \[.+(?=\r?\n|\r)/gim
  const matches = readme.match(r)

  const examples = matches
    .map(item => {
      const info = item
        .split(/(^|\s)\|(\s?)/)
        .map(line => line.trim())
        .filter(line => line !== '')

      const meta = info[0].match(/\[(.+?)\]\((.*)\)/)
      const example = info[1].match(/\[(.+?)\]\((.*)\)/)

      const name = meta[1]
      const slug = meta[2].substr(meta[2].lastIndexOf('/') + 1)
      const fork = meta[2]
      const demo = example[1]
      const description = info[2]

      let content

      try {
        const exampleReadmePath = resolve(nowExamplesDir, `${slug}/README.md`)
        content = fs.readFileSync(exampleReadmePath, 'utf8')
      } catch (e) {
        //
      }

      if (content === undefined) {
        return
      }

      return {
        name,
        slug,
        fork,
        demo,
        description,
        content
      }
    })
    .filter(item => item !== undefined)
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1

      return 0
    })
    .reduce((obj, item) => {
      obj[item['slug']] = item

      return obj
    }, {})

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(examples, null, 2))
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
