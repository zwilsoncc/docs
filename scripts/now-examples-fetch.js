const fs = require('fs-extra')
const { resolve } = require('path')

const examples = [
  'crystal-hello',
  'go-hello',
  'node-micro',
  'php-7-hello-world'
]

async function main() {
  const nowExamplesDir = process.argv[2]
  const data = {}
  await Promise.all(
    examples.map(async example => {
      const dir = resolve(nowExamplesDir, example)
      const filenames = await fs.readdir(dir)
      data[example] = {}
      await Promise.all(
        filenames.map(async filename => {
          const file = resolve(dir, filename)
          const contents = await fs.readFile(file, 'utf8')
          data[example][filename] = contents
        })
      )
    })
  )
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(data, null, 2))
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
