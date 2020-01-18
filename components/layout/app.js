import React, { useState, useEffect } from 'react'
import { useAmp } from 'next/amp'
import Page from '~/components/layout/page'
import Header from '~/components/layout/header'
import { UserContext } from '~/lib/user-context'
import { ZenContext } from '~/lib/zen-context'
import UseTeamInfo from '~/lib/use-team-info'
import { withToasts } from '~/components/toasts'
import * as bodyLocker from '~/lib/utils/body-locker'

const LayoutHeader = React.memo(props => {
  const isAmp = useAmp()
  return <Header {...props} isAmp={isAmp} />
})

function Layout({ data, children }) {
  const [navigationActive, setNavigationActive] = useState(false)
  const [zenModeActive, setZenModeActive] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  )
  let altKeyDown = false

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown.bind(this), false)
    document.addEventListener('keyup', onKeyUp.bind(this), false)
    window.addEventListener('scroll', onScroll.bind(this))
    return () => {
      document.removeEventListener('keydown', onKeyDown.bind(this), false)
      document.removeEventListener('keyUp', onKeyUp.bind(this), false)
      window.removeEventListener('scroll', onScroll.bind(this))
    }
  }, [])

  const exitZenMode = () => {
    setZenModeActive(false)
  }

  const onKeyDown = event => {
    // Make Zen mode run only for Screen sizes greater than 960px
    if (window.innerWidth < 960) {
      return
    }
    switch (event.keyCode) {
      case 90:
        // Enter Zen Mode
        if (altKeyDown) {
          setZenModeActive(!zenModeActive)
        }
        break

      case 27:
        // Exit Zen Mode
        setZenModeActive(false)

        break

      case 18: // alt-key
        altKeyDown = true
        break
    }
  }

  const onKeyUp = event => {
    if (event.which === 18) {
      altKeyDown = false
    }
  }

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset)
    })
  }

  const handleToggleNavigation = () => {
    if (navigationActive === true) {
      bodyLocker.unlock()
    } else {
      bodyLocker.lock()
    }

    setNavigationActive(!navigationActive)
  }

  const handleIndexClick = () => {
    if (navigationActive) {
      handleToggleNavigation()
    }
  }

  const detached = scrollPosition > 0

  return (
    <Page>
      <UserContext.Consumer>
        {({ user, userLoaded }) => (
          <>
            <UseTeamInfo
              user={user}
              render={({ teams }) => (
                <LayoutHeader
                  detached={detached}
                  onToggleNavigation={handleToggleNavigation}
                  user={user}
                  teams={teams}
                  userLoaded={userLoaded}
                  navigationActive={navigationActive}
                  handleIndexClick={handleIndexClick}
                  zenModeActive={zenModeActive}
                  exitZenMode={exitZenMode}
                  data={data}
                />
              )}
            />
          </>
        )}
      </UserContext.Consumer>
      <ZenContext.Provider value={zenModeActive}>
        {children}
      </ZenContext.Provider>
    </Page>
  )
}

export default withToasts(Layout)
