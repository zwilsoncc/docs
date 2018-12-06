import React, { createElement, Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import ArrowDown from '~/components/icons/arrow-down'
import isComponentOfType from '~/new-components/utils/is-component-of-type'

const ASC = 'asc'
const DESC = 'desc'

export default class TableCell extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['left', 'center', 'right']),
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    innerRef: PropTypes.func,
    onClick: PropTypes.func,
    sorted: PropTypes.oneOf([ASC, DESC]),
    tagName: PropTypes.oneOf(['td', 'th']),
    value: PropTypes.any
  }

  static defaultProps = {
    tagName: 'td'
  }

  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.value)
    }
  }

  render() {
    const {
      align,
      children,
      className,
      innerRef,
      disabled,
      sorted,
      tagName,
      ...other
    } = this.props

    return createElement(
      tagName,
      {
        ...other,
        className: cn(
          'table-cell',
          {
            'head-cell': tagName === 'th',
            'row-cell': tagName === 'td',
            right: align === 'right',
            center: align === 'center',
            sorted: sorted,
            disabled
          },
          className
        ),
        ref: innerRef,
        onClick: this.handleClick
      },
      !isComponentOfType('div', children)
        ? createElement('div', {}, children, sorted && <ArrowDown />)
        : children
    )
  }
}
