import ApiDocs from '~/components/references-mdx/api/v1/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<ApiDocs />}
    versioned
    description={`A guide to the legacy ${PRODUCT} API.`}
    title={`${PRODUCT} 1.0 API Documentation`}
  />
)
