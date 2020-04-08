import IntegrationsDocs from '~/components/references-mdx/integrations/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<IntegrationsDocs />}
    title={`${PRODUCT} Integrations Documentation`}
    description={`A comprehensive guide to creating and using the ${PRODUCT} Integrations API and gaining control over the ${PRODUCT} platform.`}
    defaultActiveCategory="introduction"
    defaultActiveSection="zeit-integrations"
  />
)
