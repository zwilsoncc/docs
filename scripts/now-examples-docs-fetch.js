const fs = require('fs')
const fse = require('fs-extra')
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
    .reduce((obj, item) => {
      obj[item['slug']] = item

      return obj
    }, {})

  try {
    await fse.emptyDir(resolve(__dirname, `../pages/examples`))
  } catch (err) {
    //
  }

  Object.values(examples).map(async example => {
    try {
      await fse.outputFile(
        resolve(__dirname, `../pages/examples/${example.slug}/index.js`),
        `
import Example from '~/components/examples/page'

export const example = ${JSON.stringify(example, null, 2)}

export default () => <Example example={example} />
`
      )
    } catch (err) {
      //
    }
  })

  // Create index
  // TODO: Make a cool index for examples
  const firstExample = examples[Object.keys(examples)[0]]

  try {
    await fse.outputFile(
      resolve(__dirname, `../pages/examples/index.js`),
      `
import Example from '~/components/examples/page'

export const example = ${JSON.stringify(firstExample, null, 2)}

export default () => <Example example={example} />
`
    )
  } catch (err) {
    //
  }

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(examples, null, 2))
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
