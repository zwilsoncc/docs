const next = require('next')
const qs = require('querystring')
const url = require('url')
const ms = require('ms')
const cookie = require('cookie')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function removeEndSlash(fn) {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const isNext = parsedUrl.path.includes('/_next/')
    if (isNext) return fn(req, res, parsedUrl)

    if (parsedUrl.path !== '/' && parsedUrl.path.slice(-1) === '/') {
      const q = qs.stringify(parsedUrl.query)
      res.writeHead(301, {
        Location: parsedUrl.path.slice(0, -1) + (q ? '?' + q : '')
      })
      res.end()
      return
    }

    return fn(req, res, parsedUrl)
  }
}

function setAssetPrefixByHost(fn) {
  return (req, res) => {
    if (/localhost/.test(req.headers.host)) {
      // Set the assetPrefix for localhost
      // It needs to be the http version
      app.setAssetPrefix(`http://${req.headers.host}`)
    } else {
      // Set the assetPrefix for now
      // It needs to be the https version, since now is always HTTPS
      app.setAssetPrefix(`https://${req.headers.host}`)
    }

    return fn(req, res)
  }
}

async function main(req, res, parsedUrl) {
  // Redirect to /docs as that's the main page for this zone
  if (req.url === '/') {
    // 302 as it will be cached by the browser otherwise
    res.writeHead(302, {
      Location: '/docs'
    })
    res.end()
    return
  }

  // Redirect directory listing explainer
  if (req.url.endsWith('/docs/what-is-directory-listing')) {
    res.writeHead(302, {
      Location: '/docs/v2/routing/directory-listing'
    })
    res.end()
    return
  }

  // Redirect to upgrade guide for v1
  if (req.url.endsWith('/docs/v1-upgrade')) {
    res.writeHead(302, {
      Location: '/docs/v2/platform/upgrade-to-2-0'
    })
    res.end()
    return
  }

  // Redirect to upgrade guide for v1 configuration to upgrade
  if (req.url.endsWith('/docs/version-config')) {
    res.writeHead(302, {
      Location: '/docs/v2/deployments/configuration#version'
    })
    res.end()
    return
  }

  // Redirect `router-status`
  if (req.url.includes('/docs/router-status')) {
    const code = req.url.split('/docs/router-status/')[1]
    res.writeHead(302, {
      Location:
        '/docs/v2/routing/status-codes' +
        (code ? `#list-of-status-codes/${code}` : '')
    })
    res.end()
    return
  }

  if (req.url.includes('/docs/') && !req.url.match(/(\/docs\/v[0-9])/)) {
    // 302 as it will be cached by the browser otherwise
    res.writeHead(302, {
      Location: '/docs/v1/' + req.url.split('/docs/')[1]
    })
    res.end()
    return
  }

  if (req.url.includes('/api#') && !req.url.match(/(\/api\/v[0-9])/)) {
    // 302 as it will be cached by the browser otherwise
    res.writeHead(302, {
      Location: '/api/v1#' + req.url.split('/api#')[1]
    })
    res.end()
    return
  }

  if (req.url.includes('/examples/')) {
    const match = req.url.match('^/examples/([^/]+?)/?$')

    if (match && match[1]) {
      const query = Object.assign({}, req.query, {
        exampleSlug: match[1]
      })

      return app.render(req, res, '/examples', query)
    }
  }

  const isNext = parsedUrl.path.includes('/_next/')
  const cookies = cookie.parse(req.headers.cookie || '')

  // In development we don't cache
  // When the user is logged in we don't cache
  // When the request is internal to Next.js we call handle immediately as Next.js will handle setting maxage
  if (dev || cookies.token || isNext) {
    // If the user is logged in, do not cache
    if (cookies.token && !cookies['_now_no_cache']) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('_now_no_cache', 1, {
          path: '/',
          maxAge: ms('20 years')
        })
      )

      res.setHeader('Cache-Control', `public,s-maxage=0`)
    } else if (!cookies.token && cookies['_now_no_cache']) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('_now_no_cache', 0, { path: '/', maxAge: 0 })
      )
    }

    return handle(req, res, parsedUrl)
  }

  // If the user is not logged in, allow caching
  if (cookies['_now_no_cache']) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('_now_no_cache', 0, { path: '/', maxAge: 0 })
    )
  }

  // s-maxage will cause Now CDN to cache the page for 1 hour (3600 seconds)
  res.setHeader('Cache-Control', `public,s-maxage=3600`)
  return handle(req, res, parsedUrl)
}

async function setup(handler) {
  // Prepare Next.js for bootup
  await app.prepare()
  // Remove ending slash
  return setAssetPrefixByHost(removeEndSlash(handler))
}

// Export a promise that micro will await before starting the server
module.exports = setup(main)
