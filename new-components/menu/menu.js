import React, { Component } from 'react'
import cns from 'classnames'
import PropTypes from 'prop-types'
import MenuPositioner, { POSITIONS, ORIENTATIONS } from '../menu-positioner'
import ClickOutside from '../click-outside'

class Menu extends Component {
  static propTypes = {
    active: PropTypes.bool,
    align: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    orientation: PropTypes.string,
    position: PropTypes.string,
    triangleSize: PropTypes.number,
    withPortal: PropTypes.bool
  }

  static defaultProps = {
    active: false,
    align: POSITIONS.AUTO,
    className: '',
    triangleSize: 10,
    orientation: ORIENTATIONS.VERTICAL,
    position: POSITIONS.AUTO,
    withPortal: false
  }

  static getDerivedStateFromProps(props) {
    return { active: props.active }
  }

  state = {
    active: this.props.active
  }

  handleClickOutside = () => {
    if (this.props.onClickOutside) {
      this.props.onClickOutside()
    } else {
      this.handleHide()
    }
  }

  handleShow = () => {
    this.setState({ active: true })
  }

  handleHide = () => {
    this.setState({ active: false })
  }

  handleProviderRef = handle => node => {
    this.triggerNode = node
    handle(node)
  }

  handleMenuRef = handle => node => {
    this.menuElement = node
    handle(node)
  }

  renderMenu = ({ active, position, align }) => {
    const { className, children, triangleSize, fit, style } = this.props
    const halfHypo = Math.sqrt(triangleSize ** 2 + triangleSize ** 2) / 2
    const bounds = this.triggerNode && this.triggerNode.getBoundingClientRect()
    const triggerWidth = bounds ? bounds.width : 0

    return (
      <ClickOutside
        active={active}
        onClick={this.handleClickOutside}
        render={({ innerRef }) => (
          <ul
            className={cns({ active, fit }, position, align, className)}
            ref={this.handleMenuRef(innerRef)}
            style={style}
          >
            {children}
            <style jsx>{`
              ul {
                animation-duration: 200ms;
                animation-fill-mode: forwards;
                animation-fill-mode: forwards;
                animation-iteration-count: 1;
                animation-timing-function: ease-out;
                background: #ffffff;
                border-radius: 5px;
                border: 1px solid #eee;
                box-shadow: 0 18px 30px 0 rgba(0, 0, 0, 0.12);
                list-style: none;
                margin: 0;
                padding: 8px 0;
                position: relative;
              }

              ul.fit {
                width: ${triggerWidth}px;
              }

              ul.bottom {
                animation-name: show-bottom;
                margin-top: ${halfHypo}px;
              }

              ul.top {
                animation-name: show-top;
                margin-bottom: ${halfHypo}px;
              }

              @keyframes show-bottom {
                from {
                  opacity: 0;
                  transform: translateY(-15px);
                }

                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes show-top {
                from {
                  opacity: 0;
                  transform: translateY(15px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>
          </ul>
        )}
      />
    )
  }

  renderPositioner = ({ handleProviderRef, positionedRenderer }) =>
    this.props.render({
      active: this.state.active,
      handleProviderRef: this.handleProviderRef(handleProviderRef),
      hide: this.handleHide,
      show: this.handleShow,
      menu: positionedRenderer(this.renderMenu)
    })

  render() {
    return (
      <MenuPositioner
        active={this.state.active}
        align={this.props.align}
        orientation={this.props.orientation}
        position={this.props.position}
        render={this.renderPositioner}
        withPortal={this.props.withPortal}
      />
    )
  }
}

export default Menu
