const { exec: execSync } = require('child_process')
const { promisify } = require('util')
var algoliasearch = require('algoliasearch')
const fs = require('fs')
const cheerio = require('cheerio')
const globby = require('globby')
const execP = promisify(execSync)
const exec = cmd => execP(cmd)

// Main function
async function main() {
  // Initialise Algolia client
  const client = algoliasearch('NNTAHQI9C5', process.env.ALGOLIA_API_KEY)

  const tmpIndex = client.initIndex('prod_docs_tmp')

  // Array to store object with content from pages
  let index = []

  // Build project
  await exec(`next build && next export -o dist`)

  // Scan pages and add titles and content as objects in an `index` array
  let files

  try {
    files = await globby(['dist/guides/**/*.html', 'dist/docs/v2/**/*.html'])
  } catch (e) {
    throw `Failed to get pages: ${e}`
  }

  // Loop through files
  files.forEach(file => {
    // Fetch file contents and load it with cheerio
    const content = fs.readFileSync(file)
    const $ = cheerio.load(content)

    // Page title
    const pageTitle = $('.content-heading h1').text()

    // Current heading and element, initially null
    let currentHeading = null
    let currentEl = null
    // Current record number for the file loop, starting with ordering
    let currentRecordNumber = 1

    // Loop through all top-level elements in the content div
    $('.content > div > *').each((i, e) => {
      // Get current element and its tagName
      currentEl = $(e)
      const tag = currentEl.get(0).tagName

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
        // If the element is a heading, catch and store the heading
        // Set current heading:
        currentHeading = {
          text: currentEl.text(),
          anchor: $(currentEl)
            .children('a')
            .attr('href')
        }
      } else if (['p', 'ul'].includes(tag)) {
        // If the element is a paragraph, create the record using available information, including the current heading, and push it to the index array.

        // Infer URL from filepath
        const url = `/${file.replace('dist/', '').replace('/index.html', '')}${
          currentHeading && currentHeading.anchor ? currentHeading.anchor : ''
        }`

        // Create record with title, (if it exists) section heading, url (inferred), paragraph content, and order
        const record = {
          title: pageTitle,
          ...(currentHeading && { section: currentHeading.text }),
          url,
          content: currentEl.text(),
          order: currentRecordNumber
        }

        // Push record to index array
        index.push(record)

        // Increase record number for the next loop
        currentRecordNumber = currentRecordNumber + 1
      }
    })
  })

  // Test file
  // fs.writeFileSync(`test.json`, JSON.stringify(index))
  client.copyIndex('prod_docs', tmpIndex.indexName, [
    'settings',
    'synonyms',
    'rules'
  ])

  const indexTmp = [...index]

  while (indexTmp.length) await tmpIndex.addObjects(indexTmp.splice(0, 1000))

  client.moveIndex(tmpIndex.indexName, 'prod_docs')
}

// Execute main function
main()
