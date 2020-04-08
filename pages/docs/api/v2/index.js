import ApiDocs from '~/components/references-mdx/api/v2/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<ApiDocs />}
    versioned
    description={`A comprehensive guide to using the ${PRODUCT} API and gaining control over the ${PRODUCT} platform.`}
    title={`${PRODUCT} API Documentation`}
  />
)
