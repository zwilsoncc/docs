import React from 'react'
import Page from '~/components/layout/page'
import { ZenContext } from '~/lib/zen-context'
import { withToasts } from '~/components/toasts'
import * as bodyLocker from '~/lib/utils/body-locker'

class Layout extends React.Component {
  static contextType = ZenContext

  state = {
    navigationActive: false,
    zenModeActive: false,
    scrollPosition: (typeof window !== 'undefined' && window.pageYOffset) || 0,
    scrollDirection: null
  }

  altKeyDown = false

  exitZenMode = () => {
    this.setState({
      zenModeActive: false
    })
  }

  onKeyDown(event) {
    // Make Zen mode run only for Screen sizes greater than 960px
    if (window.innerWidth < 960) {
      return
    }
    switch (event.keyCode) {
      case 90:
        // Enter Zen Mode
        if (this.altKeyDown) {
          this.setState({
            zenModeActive: !this.state.zenModeActive
          })
        }
        break

      case 27:
        // Exit Zen Mode
        this.setState({
          zenModeActive: false
        })

        break

      case 18: // alt-key
        this.altKeyDown = true
        break
    }
  }

  onKeyUp(event) {
    if (event.which === 18) {
      this.altKeyDown = false
    }
  }

  onScroll() {
    requestAnimationFrame(() => {
      this.setState({
        scrollDirection:
          this.state.scrollPosition < window.pageYOffset ? 'down' : 'up',
        scrollPosition: window.pageYOffset
      })
    })
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown.bind(this), false)
    document.addEventListener('keyup', this.onKeyUp.bind(this), false)
    window.addEventListener('scroll', this.onScroll.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown.bind(this), false)
    document.removeEventListener('keyUp', this.onKeyUp.bind(this), false)
    window.removeEventListener('scroll', this.onScroll.bind(this))
  }

  handleToggleNavigation = () => {
    if (this.state.navigationActive === true) {
      bodyLocker.unlock()
    } else {
      bodyLocker.lock()
    }

    this.setState(({ navigationActive }) => {
      return {
        navigationActive: !navigationActive
      }
    })
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      this.handleToggleNavigation()
    }
  }

  render() {
    const { children } = this.props

    return (
      <Page>
        <ZenContext.Provider value={this.state.zenModeActive}>
          {children}
        </ZenContext.Provider>
      </Page>
    )
  }
}

export default withToasts(Layout)
