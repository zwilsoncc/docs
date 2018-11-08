import React from 'react'
import DocsNavbarDesktop from './desktop'
import DocsNavbarToggle from './toggle'
import Arrow from '../../arrow'
import { H5 } from '../../text/heading'
import Select from '../../select'

export default class DocsNavbarMobile extends React.PureComponent {
  state = { show: false }

  toggle = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    const { sticky, version, handleVersionSwitcher } = this.props
    const { show } = this.state

    return (
      <div className={sticky ? 'sticky' : null}>
        <div className={show ? 'arrow show' : 'arrow'} onClick={this.toggle}>
          <Arrow />
        </div>
        {show ? (
          <div className="navbar-container">
            <DocsNavbarToggle />

            <div
              className="version-select"
              onClick={event => event.preventDefault}
            >
              <H5>Now Platform Version</H5>
              <Select
                width="100%"
                onChange={handleVersionSwitcher}
                defaultValue={version}
              >
                <option value="v2">Latest (v2)</option>
                <option value="v1">Legacy (v1)</option>
              </Select>
            </div>

            <div onClick={this.toggle}>
              <DocsNavbarDesktop {...this.props} />
            </div>
          </div>
        ) : null}
        <style jsx>{`
          .arrow {
            position: absolute;
            top: 40px;
            right: 20px;
            width: 27px;
            transition: transform 0.2s ease;
            z-index: 102;
          }

          .arrow.show {
            transform: rotate(180deg);
          }

          .sticky .arrow {
            position: fixed;
          }

          .version-select {
            width: 100%;
            margin-bottom: 24px;
          }

          .version-select :global(h5) {
            margin-top: 0;
            margin-bottom: 16px;
          }

          .navbar-container {
            background: #fff;
            width: 100%;
            overflow: scroll;
            z-index: 102;
            padding-top: 24px;
          }

          .sticky .navbar-container {
            height: calc(100% - 90px);
            padding-left: 20px;
            padding-right: 20px;
            position: fixed;
            top: 90px;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
