import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from './collapse-context'

class CollapseGroup extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    selected: undefined
  }

  onChange = title => {
    this.setState({
      selected: title
    })
  }

  render() {
    return (
      <div className="collapse-group">
        <Provider
          value={{
            selected: this.state.selected,
            onChange: this.onChange
          }}
        >
          {this.props.children}
        </Provider>
        <style jsx>{`
          .collapse-group {
            border-top: 1px solid var(--accents-2);
          }
        `}</style>
      </div>
    )
  }
}

export default CollapseGroup
