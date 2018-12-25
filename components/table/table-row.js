import React, { cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const TableRow = ({
  ariaRole,
  children,
  className,
  disabled,
  onClick,
  selectable
}) => (
  <tr
    aria-roledescription={ariaRole}
    className={cn('row', { selectable, disabled }, className)}
    onClick={onClick}
  >
    {Children.map(children, child => {
      if (!child) return null
      return cloneElement(child, {
        tagName: 'td'
      })
    })}
  </tr>
)

TableRow.propTypes = {
  ariaRole: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

TableRow.defaultProps = {
  ariaRole: 'row'
}

export default TableRow
