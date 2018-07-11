import withDoc from '../../../lib/with-doc'
import { TerminalInput } from '../../../components/text/terminal'
import Image from '../../../components/image'

export const meta = {
  title: 'The Now CDN',
  description: 'Full-featured, flexible, automatic caching for Now deployments, aliases, and domains.',
  date: '10 July 2018',
  editUrl: 'pages/docs/features/cdn.md',
  image: IMAGE_ASSETS_URL + '/docs/cdn/tw-card.png'
}

Now CDN enabled domains are automatically fronted by over 150 globally distributed anycast IP CDN caches, allowing you immediately optimize all of your now deployments with a single command

## Getting Started
To use the CDN, you must be on a paid plan. Any new domain or `*.now.sh` alias created on a paid plan will automatically have the CDN enabled.

For any existing domains, made before the CDN was released, or domains that have had the CDN disabled, you can enable the CDN with the Now CLI using the following:

<TerminalInput>now domains add [your domain] --cdn</TerminalInput>

You are also able to enable or disable the CDN for any domain under your account dashboard. Simple go to the domains page on your dashboard and click the checkbox for `CDN`.

<Image
src={`${IMAGE_ASSETS_URL}/blog/cdn/activate-cdn.png`}
width={600}
height={226}
/>

If your domain isn't using zeit.world DNS yet, you first need to [migrate to zeit.world](https://zeit.co/world#get-started).

## Caching
The Cache-Control header can include a number of directives, separated by comma.

Caching directives break down the caching controls into tree categories

### Purging
When aliasing to any Now CDN enabled domain or `now.sh` alias, we automatically purge the cache so that no stale content is ever served.

### Expiration
* `max-age=<seconds>`
The "max-age" indicates when response is to be considered stale. It's seconds since it was downloaded from the origin server.
* `s-maxage=<seconds>` indicates when, in shared caches, the response is to be considered stale. This will be override the `max-age`. Allowing to differentiate the caching duration of clients and share caches.
* `no-cache` directive indicates that the response MUST NOT be used to satisfy a subsequent request without successful validation on the origin server.


### Revalidation
* `must-revalidate` directive indicates that once it has become stale, a cache (client or proxy) MUST revalidate the content before using the cached entry.
* `proxy-revalidate` directive has the same meaning as the must-revalidate response directive, except that it only applies to shared caches.
* `stale-while-revalidate=<seconds>` indicates that caches MAY serve the response in which it appears after it becomes stale, up to the indicated number of seconds since the object expired.
* `stale-if-error=<seconds>` indicates that when an error is encountered, a cached stale response _may_ be used to satisfy the request, regardless of other freshness information.


## Other
* `no-transform` indicates that an intermediary proxy and/or cache must not transform the payload.
* `immutable` indicates to clients that the response body will not change over time. This only impacts client caches and will not alter Now CDN behaviour.


## Recommendations
We recommend leveraging shared caches over client caches, for example `Cache-Control: max-age=0, s-maxage=86400` or `Cache-Control: max-age=60, s-maxage=86400`

## Bypassing cache
If no `cache-control` response header is present now routing layers adds `cache-control: s-maxage=0` automatically to ensure no shared caches will cache content that is not intended to be cached.

The cache is also always skipped when `_now_no_cache` cookie is present. And if `_now_no_cache=1` query parameter is present.


## Notes
Currently Now CDN can be only enabled for single level of subdomains. e.g., a.domain.com will go through CDN but a.b.domain.com will be routed directly to non CDN zeit alias.

You can disable the CDN for any domain by deselecting the CDN option for the domain in your account dashboard under the `domains` page. you can also disable it by updating the domain with the following command:

<TerminalInput>now domains add [your cdn enabled domain] --no-cdn</TerminalInput>


export default withDoc({...meta})(({children}) => <>{children}</>)
