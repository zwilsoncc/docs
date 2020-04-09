import RuntimeDocs from '~/components/references-mdx/runtimes/index.mdx'
import ReferenceLayout from '~/components/layout/reference'
import { PRODUCT } from '~/lib/constants'

export default () => (
  <ReferenceLayout
    Data={<RuntimeDocs />}
    title={`Official ${PRODUCT} Runtimes`}
    description={`A complete reference of Runtimes on ${PRODUCT}; listing official runtimes and their usage.`}
    defaultActiveCategory="official-runtimes"
  />
)
