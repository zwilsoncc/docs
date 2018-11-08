import { Children, Component, cloneElement } from 'react'
import ArrowIcon from '../icons/arrow'
import { Menu } from '../menu'

class Select extends Component {
  state = {
    active: false
  }

  handleClick = () => {
    this.setState({ active: true })
  }

  handleClickOutsideMenu = () => {
    this.setState({
      active: false
    })
  }

  handleItemClick = value => {
    this.setState({ active: false })
    this.props.onChange(value)
  }

  getSelectedChildren = () => {
    return Children.toArray(this.props.children).filter(
      child => child.props.value === this.props.selected
    )[0].props.children
  }

  renderMenu = ({ handleProviderRef, menu }) => {
    return (
      <span
        className="wrapper"
        onClick={this.handleClick}
        ref={handleProviderRef}
        style={{ position: 'relative' }}
      >
        {this.getSelectedChildren()}
        <span className="arrow">
          <ArrowIcon width="12px" />
        </span>
        {menu}
        <style jsx>{`
          .wrapper {
            align-items: center;
            border-radius: 5px;
            border: 1px solid #eaeaea;
            cursor: pointer;
            display: inline-flex;
            font-size: 12px;
            height: 40px;
            outline: none;
            padding: 0 56px 0 16px;
            position: relative;
            transition: border 0.2s, background 0.2s, color 0.2s ease-out,
              box-shadow 0.2s ease;
            white-space: nowrap;
            width: 100%;
          }

          .wrapper:hover {
            border-color: #ddd;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          .arrow {
            align-items: center;
            background: white;
            border-bottom-right-radius: 5px;
            border-left: 1px solid #eaeaea;
            border-top-right-radius: 5px;
            display: flex;
            height: 100%;
            justify-content: center;
            pointer-events: none;
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
          }
        `}</style>
      </span>
    )
  }

  render() {
    const mappedChildren = Children.map(this.props.children, child => {
      return cloneElement(child, {
        onClick: this.handleItemClick,
        selected: this.props.selected === child.props.value
      })
    })

    return (
      <Menu
        fit
        align="center"
        active={this.state.active}
        onClickOutside={this.handleClickOutsideMenu}
        render={this.renderMenu}
      >
        {mappedChildren}
      </Menu>
    )
  }
}

export default Select
