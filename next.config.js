const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_EXPORT
} = require('next/constants')

module.exports = phase => {
  const config = {
    // Allow mdx and md files to be pages
    pageExtensions: ['jsx', 'js', 'mdx', 'md'],

    assetPrefix:
      phase === PHASE_EXPORT && process.env.NOW_GITHUB_COMMIT_REF === 'master'
        ? 'https://docs.zeit.sh'
        : ''
  }

  // This makes sure we only require build-time plugins at build time
  if (phase !== PHASE_DEVELOPMENT_SERVER && phase !== PHASE_PRODUCTION_BUILD) {
    return config
  }

  // Adds github.com/mdx-js/mdx to Next.js
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.(md|mdx)?$/,
    options: {
      hastPlugins: []
    }
  })

  return withMDX(config)
}
