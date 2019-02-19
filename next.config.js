const fs = require('fs')
const lastEdited = require('./lib/data/last-edited.json')

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `${xmlHeader}
${nodes}
</urlset>`

// Determine and return the nodes for every page
const xmlUrlNode = (domain, pageUrl) => {
  if (
    pageUrl === '/' ||
    pageUrl === '/index' ||
    pageUrl.startsWith('/docs/v1') ||
    pageUrl.startsWith('/docs/api/v1') ||
    pageUrl.includes('api-docs-mdx')
  )
    return

  const url = `${pageUrl}${pageUrl === '/' ? '' : '/'}`
  const loc = `${domain}${url}`
  const lastmod = lastEdited[`pages${pageUrl}.mdx`]

  return `  <url>
    <loc>${loc}</loc>${
    lastmod !== undefined
      ? `
    <lastmod>${lastmod}</lastmod>`
      : ``
  }
    <changefreq>hourly</changefreq>
  </url>`
}

const exportSitemap = async defaultPathMap => {
  const domain = 'https://zeit.co'
  const targetFolder = 'dist/'

  const fileName = 'sitemap.xml'
  const writeLocation = `${
    targetFolder.endsWith('/') ? targetFolder : `${targetFolder}/`
  }${fileName}`

  const entries = defaultPathMap
  const pages = Object.entries(entries).map(item => item[0])

  const sitemap = `${xmlUrlWrapper(
    pages.map(page => xmlUrlNode(domain, page)).filter(Boolean).join(`
`)
  )}`

  fs.writeFile(`${writeLocation}`, sitemap, err => {
    if (err) throw err
    console.log(
      `sitemap.xml with ${
        pages.length
      } entries was written to ${targetFolder}${fileName}`
    )
  })
}

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_EXPORT
} = require('next/constants')

module.exports = phase => {
  const isExport = phase === PHASE_EXPORT
  const isProdBuild = phase === PHASE_PRODUCTION_BUILD

  const config = {
    // Allow mdx and md files to be pages
    pageExtensions: ['jsx', 'js', 'mdx', 'md'],

    assetPrefix: isExport ? '/docs' : '',

    env: {
      ASSETS: isProdBuild ? '/docs/static' : '/static'
    },

    exportPathMap: async defaultPathMap => {
      await exportSitemap(defaultPathMap)

      return defaultPathMap
    }
  }

  // This makes sure we only require build-time plugins at build time
  if (phase !== PHASE_DEVELOPMENT_SERVER && phase !== PHASE_PRODUCTION_BUILD) {
    return config
  }

  const rehypePrism = require('@mapbox/rehype-prism')
  // Adds github.com/mdx-js/mdx to Next.js
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.(md|mdx)?$/,
    options: {
      hastPlugins: [rehypePrism]
    }
  })

  return withMDX(config)
}
