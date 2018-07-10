const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')

module.exports = phase => {
  const config = {
    // Allow mdx and md files to be pages
    pageExtensions: ['jsx', 'js', 'mdx', 'md'],

    // assetPrefix will be set dynamically in ./server.js
    assetPrefix: ''
  }

  // This makes sure we only require build-time plugins at build time
  if (phase !== PHASE_DEVELOPMENT_SERVER && phase !== PHASE_PRODUCTION_BUILD) {
    return config
  }

  // Capitalizes titles
  const remarkCapitalize = require('remark-capitalize')
  // Adds github.com/mdx-js/mdx to Next.js
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.(md|mdx)?$/,
    options: {
      mdPlugins: [remarkCapitalize],
      hastPlugins: []
    }
  })

  return withMDX(config)
}
