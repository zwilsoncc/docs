import cn from 'classnames'
import { Component } from 'react'
import { HEADER_HEIGHT } from '../constants'

class Sidebar extends Component {
  render() {
    const { active, children, innerRef } = this.props
    return (
      <aside className={cn('sidebar', { active })} ref={innerRef}>
        {children}
        <style jsx>{`
          .sidebar {
            background: #fff;
            border-right: 1px solid #eaeaea;
            bottom: 0;
            overflow: scroll;
            padding-bottom: 40px;
            padding-right: 24px;
            padding-top: 40px;
            position: fixed;
            top: ${HEADER_HEIGHT}px;
            width: 256px;
            z-index: 1;
          }

          @media screen and (max-width: 950px) {
            .sidebar {
              border-right: 0;
              display: none;
              left: 0;
              padding: 40px 24px;
              right: 0;
              width: 100%;
            }

            .sidebar.active {
              display: block;
            }
          }
        `}</style>
      </aside>
    )
  }
}

export default Sidebar
