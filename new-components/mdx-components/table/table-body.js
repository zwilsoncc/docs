import React from 'react'
import PropTypes from 'prop-types'

const isSelectable = item => {
  return item.props.onClick
}

const mapInjectingOddEven = (children, isRowType) => {
  let count = 0
  return React.Children.map(children, child => {
    if (isRowType(child) && isSelectable(child)) {
      count += 1
      return React.cloneElement(child, {
        selectable: true,
        even: count % 2 !== 0
      })
    }
    return child
  })
}

const TableBody = ({ isRowType, ...props }) => (
  <tbody {...props}>
    {mapInjectingOddEven(props.children, isRowType)}
    <style jsx>{`
      tbody :global(tr:not(:last-child) td) {
        border-bottom: 1px solid #eaeaea;
      }

      :global(thead) + tbody :global(tr:last-child td) {
        border-bottom: 1px solid #eaeaea;
      }

      tbody :global(td) {
        color: #444444;
        font-size: 14px;
      }
    `}</style>
  </tbody>
)

TableBody.propTypes = {
  children: PropTypes.node
}

export default TableBody
