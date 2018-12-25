import { Code, InlineCode } from '~/components/code'
import { GenericLink } from '~/components/text/link'
import H1 from '~/components/text/h1'
import H2 from '~/components/text/h2'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import H5 from '~/components/text/h5'
import H6 from '~/components/text/h6'
import HR from '~/components/text/hr'
import { UL, LI } from '~/components/list'
import { P } from '~/components/text/paragraph'
import Quote from '~/components/text/quote'
import Strong from '~/components/text/strong'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableRowCell,
  TableHeadCell
} from '~/components/table'

const components = {
  a: GenericLink,
  blockquote: Quote,
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HR,
  inlineCode: InlineCode,
  li: LI,
  p: P,
  strong: Strong,
  ul: UL,
  tr: TableRow,
  th: TableHeadCell,
  td: TableRowCell,
  thead: TableHead,
  tbody: TableBody,
  table: Table
}

export default components
