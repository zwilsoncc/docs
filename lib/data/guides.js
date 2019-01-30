import { meta as redirectFromWWWMeta } from '~/pages/guides/redirect-from-www.mdx'
import { meta as nextServerToRoutesMeta } from '~/pages/guides/custom-next-js-server-to-routes.mdx'
import { meta as apolloServerToNowMeta } from '~/pages/guides/deploying-apolloserver-to-now.mdx'
import { meta as ignoringSourcePathsMeta } from '~/pages/guides/prevent-uploading-sourcepaths-with-nowignore.mdx'
import { meta as godaddyDomainsMeta } from '~/pages/guides/alias-godaddy-domains-now.mdx'
import { meta as vuepressToNowMeta } from '~/pages/guides/deploying-vuepress-to-now.mdx'
import { meta as vuejsToNowMeta } from '~/pages/guides/deploying-vuejs-to-now.mdx'

export default [
  {
    ...vuejsToNowMeta
  },
  {
    ...vuepressToNowMeta
  },
  {
    ...ignoringSourcePathsMeta
  },
  {
    ...apolloServerToNowMeta
  },
  {
    ...godaddyDomainsMeta
  },
  {
    ...nextServerToRoutesMeta
  },
  {
    ...redirectFromWWWMeta
  }
]
