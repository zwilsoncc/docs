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
