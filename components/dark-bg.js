import React from 'react'
import PropTypes from 'prop-types'

class DarkBg extends React.PureComponent {
  getChildContext() {
    return { darkBg: true }
  }

  render() {
    return this.props.children || null
  }
}

DarkBg.childContextTypes = {
  darkBg: PropTypes.bool
}

export default DarkBg
