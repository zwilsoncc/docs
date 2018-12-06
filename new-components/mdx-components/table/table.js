import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import isComponentOfType from '~/new-components/utils/is-component-of-type'
import filterReactChildren from '~/new-components/utils/filter-react-children'
import TableBody from './table-body'
import TableHead from './table-head'
import TableRow from './table-row'

const Table = ({ children, className, isHeadType, isRowType, ...other }) => {
  const colsItems = filterReactChildren(children, item =>
    isComponentOfType('col', item)
  )
  const headItems = filterReactChildren(children, isHeadType)
  const bodyItems = filterReactChildren(children, isRowType)
  return (
    <table {...other} className={cn('table', className)}>
      {colsItems.length > 0 && <colgroup>{colsItems}</colgroup>}
      {headItems.length > 0 && <thead>{headItems}</thead>}
      <TableBody isRowType={isRowType}>{bodyItems}</TableBody>
      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }

        table :global(td:nth-child(1)) {
          border-left: 1px solid transparent;
        }

        table :global(td:last-child) {
          border-right: 1px solid transparent;
        }

        thead :global(th:nth-child(1)) {
          border-bottom: 1px solid #eaeaea;
          border-left: 1px solid #eaeaea;
          border-radius: 4px 0px 0px 4px;
          border-top: 1px solid #eaeaea;
        }

        thead :global(th:last-child) {
          border-bottom: 1px solid #eaeaea;
          border-radius: 0 4px 4px 0;
          border-right: 1px solid #eaeaea;
          border-top: 1px solid #eaeaea;
        }

        thead :global(th) {
          background: #fafafa;
          border-bottom: 1px solid #eaeaea;
          border-top: 1px solid #eaeaea;
        }

        table :global(th),
        table :global(td) {
          padding: 0 10px;
          text-align: left;
          vertical-align: top;
        }

        table :global(th > div) {
          align-items: center;
          display: flex;
          min-height: 40px;
          font-size: 12px;
        }

        table :global(td > div) {
          align-items: center;
          display: flex;
          min-height: 50px;
          flex-flow: row wrap;
        }

        table :global(td.multi-line > div) {
          min-height: none;
          padding: 14px 0;
        }

        table :global(th) {
          color: #666;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0;
        }

        table :global(th.right > div),
        table :global(td.right > div) {
          justify-content: flex-end;
        }

        table :global(th.center > div),
        table :global(td.center > div) {
          justify-content: center;
        }

        table :global(tr.disabled) {
          pointer-events: none;
          opacity: 0.6;
        }

        table :global(tr.selectable) {
          cursor: pointer;
        }

        table :global(tr.selectable:hover) {
          background-color: #fcfcfc;
        }
      `}</style>
    </table>
  )
}

const defaultIsRowType = item => isComponentOfType(TableRow, item)
const defaultIsHeadType = item => isComponentOfType(TableHead, item)

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isHeadType: PropTypes.func,
  isRowType: PropTypes.func
}

Table.defaultProps = {
  className: '',
  isHeadType: defaultIsHeadType,
  isRowType: defaultIsRowType
}

export default Table
