import dynamic from 'next/dynamic'
const DocPage = dynamic(
  import(/* webpackChunkName: "with-doc" */ '~/lib/with-doc')
)

const Doc = ({ children, meta }) => <DocPage meta={meta}>{children}</DocPage>

export default Doc
