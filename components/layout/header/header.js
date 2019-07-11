import { Component, Fragment } from 'react'
import { parse } from 'querystring'
import cn from 'classnames'
import Link from 'next/link'
import { useAmp } from 'next/amp'
import Router, { withRouter, useRouter } from 'next/router'
import getAlgoliaClient from '~/lib/get-algolia'
import logout from '~/lib/logout'
import getDashboardHref from '~/lib/utils/get-dashboard-href'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import { Menu, MenuItem, MenuDivider } from '~/components/menu'
import { Navigation, NavigationItem } from '~/components/navigation'
import AutoComplete from '~/components/search'
import Avatar from '~/components/avatar'
import LayoutHeader from './header-wrapper'
import Logo from '~/components/icons/logo'
import Plus from '~/components/icons/plus'
import { HeaderFeedback } from '~/components/feedback-input'
import { API_DOCS_FEEDBACK } from '~/lib/constants'
import MenuPopOver from '~/components/layout/header/menu-popover'

function AmpUserFeedback() {
  const isAmp = useAmp()
  if (!isAmp) return null
  const router = useRouter()
  return (
    <>
      <a href={router.pathname} className="feedback-link">
        <HeaderFeedback textAreaStyle={{ height: 24, top: 0 }} />
      </a>
      <NavigationItem customLink>
        <a href="https://zeit.co/support">Support</a>
      </NavigationItem>
      <NavigationItem customLink>
        <a href="https://zeit.co/login">Login</a>
      </NavigationItem>
    </>
  )
}

const searchClient = getAlgoliaClient()

class Header extends Component {
  state = {
    menuActive: false,
    query: '',
    searchState: {
      query: this.getSearchQ()
    }
  }

  componentDidMount() {
    const {
      searchState: { query }
    } = this.state
    if (query && document.referrer.includes('amp')) {
      // focus algolia to show results
      const sel = selector => document.querySelector(selector)
      sel('.search-wrapper input').focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.hideHeader &&
      this.props.hideHeader !== prevProps.hideHeader
    ) {
      const sel = selector => document.querySelector(selector)
      sel('.search-wrapper input').blur()
    }
  }

  onLogoRightClick = event => {
    event.preventDefault()
    Router.push('/design')
  }

  getSearchQ() {
    const { router } = this.props
    let query = router.query.query
    if (typeof window === 'undefined') return query
    if (!query) query = parse(location.search.substr(1)).query
    return query
  }

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState({
      query: suggestion.title
    })
  }

  onSuggestionCleared = () => {
    this.setState({
      query: ''
    })
  }

  handleAvatarClick = () => {
    this.setState(state => ({
      menuActive: !state.menuActive
    }))
  }

  handleLogout = async () => {
    await logout()
    Router.push('/login')
  }

  handleClickOutsideMenu = () => {
    this.setState(() => ({
      menuActive: false
    }))
  }

  handleFeedbackSubmit = async (feedback, done) => {
    const res = await fetch(API_DOCS_FEEDBACK, {
      method: 'POST',
      body: JSON.stringify(feedback)
    })
    if (res.status !== 200) {
      done('Sorry, something went wrong, please try again.')
    } else done()
  }

  renderMenuTrigger = ({ handleProviderRef, menu }) => {
    const { user } = this.props
    return (
      <span
        onClick={this.handleAvatarClick}
        ref={handleProviderRef}
        style={{ position: 'relative' }}
      >
        <Avatar user={user} uid={user.uid} hash={user.avatar} size={30} />
        {menu}
        <style jsx>{`
          span {
            cursor: pointer;
            margin-left: 10px;
          }
        `}</style>
      </span>
    )
  }

  renderTeam = ({
    displayName = null,
    avatar,
    teamId,
    teamSlug,
    username,
    uid
  }) => {
    const currentTeam = this.props.teae

    const slug = teamSlug || username
    const active = !currentTeam && !teamSlug ? true : currentTeam === teamSlug
    const linkProps = teamSlug
      ? {
          as: `/teams/${teamSlug}/settings/identity`,
          href: {
            pathname: `/teams/settings/identity`,
            query: { teamSlug }
          }
        }
      : { as: '/account', href: '/account/identity' }

    return (
      <MenuItem key={slug} active={active}>
        <Link {...linkProps}>
          <a className={active ? 'active team' : 'team'}>
            <span className="user">
              <span className="avatar">
                <Avatar
                  teamId={teamId}
                  username={username}
                  uid={uid}
                  size={24}
                  hash={avatar}
                />
              </span>
              <span className="username">{displayName || slug}</span>
            </span>
          </a>
        </Link>
        <style jsx>{`
          a {
            transition: 0.2s ease;
          }

          a:hover {
            background: #fafafa;
          }

          .team {
            padding: 8px 20px;
            margin: -8px -20px;
          }

          .user {
            display: inline-flex;
            height: 20px;
            vertical-align: middle;
            align-items: center;
          }

          .username {
            display: inline-block;
            max-width: 118px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .avatar {
            float: left;
            height: 24px;
            margin-right: 10px;
            line-height: 24px;
            width: 24px;
          }
        `}</style>
      </MenuItem>
    )
  }

  renderSearch() {
    const {
      isAmp,
      router: { pathname }
    } = this.props
    return (
      <>
        {!isAmp ? (
          <div className="search-bar">
            <InstantSearch
              indexName="prod_docs"
              searchClient={searchClient}
              searchState={this.state.searchState}
              onSearchStateChange={searchState => {
                this.setState({
                  searchState: {
                    ...this.state.searchState,
                    ...searchState
                  }
                })
              }}
            >
              <Configure hitsPerPage={8} />
              <AutoComplete
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionCleared={this.onSuggestionCleared}
              />
            </InstantSearch>
          </div>
        ) : (
          <form
            method="GET"
            action={pathname.replace(/\.amp$/, '')}
            target="_top"
            className="search-bar"
          >
            <input
              required
              name="query"
              type="text"
              className="amp-search"
              placeholder="Search..."
            />
          </form>
        )}
        <style jsx>{`
          .search-bar :global(.react-autosuggest__input),
          .search-bar input {
            height: 32px;
            max-width: 60vw;
            width: 278px;
            background: var(--accents-1);
            padding: 0 12px;
            border-radius: 4px;
          }

          .search-bar
            :global(.search__container.focused .react-autosuggest__input),
          .search-bar :global(.react-autosuggest__input:focus),
          .search-bar input:focus {
            border-color: var(--accents-3);
            box-shadow: none;
            background: var(--geist-background);
          }

          .amp-search {
            border: 1px solid var(--accents-2);
            outline: 0;
            text-align: left;
            font-size: 14px;
            max-width: 60vw;
            width: 278px;
            background: var(--accents-1);
            padding: 0 12px;
            border-radius: 4px;
          }

          .search-bar
            :global(.search__container.has-value.focused
              .react-autosuggest__input),
          .search-bar
            :global(.search__container.has-value
              .react-autosuggest__input:focus),
          .search-bar
            :global(.search__container.has-value.focused .no-results) {
            border-radius: 4px;
          }

          .search-bar :global(.react-autosuggest__suggestions-container--open),
          .search-bar :global(.no-results) {
            top: 40px;
            width: 400px;
            max-width: calc(100vw - 32px);
            left: 50%;
            transform: translateX(-50%);
          }
        `}</style>
      </>
    )
  }

  render() {
    const {
      currentTeamSlug,
      navigationActive,
      onToggleNavigation,
      handleIndexClick,
      router,
      user,
      teams = [],
      userLoaded,
      zenModeActive,
      isAmp,
      hideHeader,
      hideHeaderSearch,
      dynamicSearch,
      isTop,
      inHero
    } = this.props
    const { menuActive } = this.state
    const dashboard = getDashboardHref(user, currentTeamSlug)
    const buildAmpNavClass = classes => {
      return isAmp
        ? `'${classes}' + ( header.active ? ' active' : '')`
        : undefined
    }

    return (
      <LayoutHeader
        hideHeader={hideHeader}
        hideHeaderSearch={hideHeaderSearch}
        dynamicSearch={dynamicSearch}
        isTop={isTop}
        inHero={inHero}
        className="header"
      >
        <div className="left-nav">
          {isAmp && (
            <amp-state id="header">
              <script
                type="application/json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({ active: navigationActive })
                }}
              />
            </amp-state>
          )}

          <a
            className="logo"
            href={dashboard}
            aria-label="ZEIT Home"
            onContextMenu={this.onLogoRightClick}
          >
            <Logo height="25px" width="28px" />
          </a>

          <Navigation
            data-amp-bind-class={buildAmpNavClass('main-navigation')}
            className={cn('main-navigation', { active: navigationActive })}
          >
            {!zenModeActive && (
              <div className="navigation-items">
                <NavigationItem
                  href="/docs"
                  active={
                    router.pathname.startsWith('/docs') &&
                    !router.pathname.startsWith('/docs/api') &&
                    !router.pathname.startsWith('/docs/addons')
                  }
                  onClick={handleIndexClick}
                >
                  Docs
                </NavigationItem>
                <NavigationItem
                  href="/guides"
                  active={router.pathname.startsWith('/guides')}
                  onClick={handleIndexClick}
                >
                  Guides
                </NavigationItem>
                <span className="mobile-only">
                  <NavigationItem
                    href="/docs/api"
                    active={router.pathname.startsWith('/api')}
                    onClick={handleIndexClick}
                  >
                    Platform API
                  </NavigationItem>
                </span>
                <span className="mobile-only">
                  <NavigationItem
                    href="/docs/integrations"
                    active={router.pathname.startsWith('/api')}
                    onClick={handleIndexClick}
                  >
                    Integrations API
                  </NavigationItem>
                </span>
                <span className="mobile-only">
                  <NavigationItem
                    href="/docs/v2/deployments/builders/developer-guide"
                    active={router.pathname.startsWith('/api')}
                    onClick={handleIndexClick}
                  >
                    Builders API
                  </NavigationItem>
                </span>

                <div
                  active={router.pathname.startsWith('/docs/api')}
                  className="developer-dropdown desktop-only"
                >
                  <MenuPopOver
                    title="API"
                    primaryList={[
                      { title: 'Platform API', url: '/docs/api' },
                      { title: 'Integrations API', url: '/docs/integrations' },
                      {
                        title: 'Builders API',
                        url: '/docs/v2/deployments/builders/developer-guide'
                      }
                    ]}
                  />
                </div>
              </div>
            )}
          </Navigation>
        </div>

        <div className="search">
          <span
            className={`search-wrapper ${hideHeaderSearch ? 'hidden' : ''}`}
          >
            {' '}
            {this.renderSearch()}
          </span>
        </div>

        <div className="right-nav">
          <Navigation className="user-navigation">
            <AmpUserFeedback />
            {!zenModeActive && userLoaded && !isAmp && (
              <Fragment>
                {!user ? (
                  <Fragment>
                    <HeaderFeedback
                      onFeedback={this.handleFeedbackSubmit}
                      hideHeader={hideHeader}
                    />
                    <NavigationItem
                      className="chat"
                      href="https://zeit.co/support"
                    >
                      Support
                    </NavigationItem>
                    <NavigationItem href="/login">Login</NavigationItem>
                  </Fragment>
                ) : (
                  <Fragment>
                    <HeaderFeedback onFeedback={this.handleFeedbackSubmit} />
                    <NavigationItem
                      className="chat"
                      href="https://zeit.co/support"
                    >
                      Support
                    </NavigationItem>
                    <Menu
                      tip
                      active={menuActive}
                      onClickOutside={this.handleClickOutsideMenu}
                      render={this.renderMenuTrigger}
                      style={{ minWidth: 200 }}
                    >
                      <MenuItem>
                        {user.username ? (
                          <Link href={`/${user.username}`}>
                            <a className="avatar-link">
                              <Avatar
                                uid={user.uid}
                                size={50}
                                hash={user.avatar}
                              />
                            </a>
                          </Link>
                        ) : (
                          <Avatar user={user} size={50} />
                        )}
                        <div className="avatar-user-info">
                          {user.username && (
                            <Link href={`/${user.username}`}>
                              <a className="username">
                                <span>{user.username}</span>
                              </a>
                            </Link>
                          )}
                        </div>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem>
                        <Link prefetch href="/dashboard">
                          <a>Dashboard</a>
                        </Link>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem>
                        {teams.length === 0 ? (
                          <Link href="/account">
                            <a>Settings</a>
                          </Link>
                        ) : (
                          <span className="settings">SETTINGS</span>
                        )}
                      </MenuItem>
                      {teams.map(team => this.renderTeam(team))}
                      <MenuDivider />
                      <MenuItem>
                        <Link
                          href="/teams/settings/url?isCreating=1"
                          as="/teams/create"
                        >
                          <a>
                            Create a Team <Plus />
                          </a>
                        </Link>
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem>
                        <a onClick={this.handleLogout}>Logout</a>
                      </MenuItem>
                    </Menu>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Navigation>
          <button
            onClick={onToggleNavigation}
            className={cn('arrow-toggle', { active: navigationActive })}
            data-amp-bind-class={buildAmpNavClass('arrow-toggle')}
            name="menu-toggle"
            on={
              isAmp
                ? 'tap:AMP.setState({ header: { active: !header.active } })'
                : undefined
            }
            role="switch"
            tabIndex="1"
          >
            <div className="line top" />
            <div className="line bottom" />
          </button>
        </div>

        <style jsx>{`
          :global(.header .feedback-link) {
            display: inherit;
          }

          :global(.header .left-nav),
          :global(.header .right-nav) {
            flex: 1 1 100%;
            display: flex;
          }

          :global(.header .right-nav) {
            justify-content: flex-end;
          }

          :global(.header .main-navigation) {
            width: 100%;
            display: flex;
          }

          :global(.header .main-navigation .navigation-items) {
            flex: 1 0 auto;
            display: flex;
          }

          :global(.header .main-navigation .developer-dropdown) {
            display: flex;
          }

          :global(.header .main-navigation .developer-dropdown a) {
            padding: 0;
          }

          :global(.header .main-navigation .mobile-only) {
            display: none;
          }

          :global(.header .user-navigation) {
            padding-right: 0;
          }

          :global(.chat:hover .chat-count) {
            background-color: #000;
          }

          @keyframes load {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          :global(.header .user-navigation) {
            animation-name: load;
            animation-duration: 1s;
          }

          :global(.arrow-toggle) {
            cursor: pointer;
            display: none;
            margin-left: auto;
            padding: 10px;
            border: none;
            background: transparent;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          :global(.line) {
            height: 1px;
            width: 22px;
            background-color: #000;
            transition: transform 0.15s ease;
          }

          :global(.line:last-child) {
            transform: translateY(4px) rotate(0deg);
          }

          :global(.line:first-child) {
            transform: translateY(-4px) rotate(0deg);
          }

          :global(.active .line:first-child) {
            transform: translateY(1px) rotate(45deg);
          }

          :global(.active .line:last-child) {
            transform: translateY(0px) rotate(-45deg);
          }

          .logo {
            display: flex;
          }

          .avatar-link {
            flex: 0;
            margin: -8px -15px;
            padding: 8px 15px;
          }
          a.avatar-link:hover,
          a.avatar-user-info:hover {
            background: none;
          }
          .avatar-user-info {
            margin-left: 15px;
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            height: 50px;
          }
          .avatar-user-info .username {
            color: #000;
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 3px;
            text-decoration: none;
          }
          .avatar-link:hover,
          .username:hover {
            background-color: white;
            opacity: 0.7;
          }
          .avatar-link,
          .username {
            transition: opacity 0.2s ease;
          }
          span.settings {
            font-size: 12px;
          }

          .mobile_search {
            display: none;
          }

          .search-wrapper {
            opacity: 1;
            visibility: visible;
            transition: visibility 0s linear 0s, opacity 300ms;
            width: 100%;
            display: inline-flex;
            justify-content: center;
          }

          .search-wrapper.hidden {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s linear 300ms, opacity 300ms;
          }

          :global(.geist-feedback-input:not(.focused) > textarea) {
            height: 24px ${isAmp ? '' : '!important'};
            top: 0 ${isAmp ? '' : '!important'};
          }

          @media screen and (max-width: 950px) {
            :global(.header .main-navigation),
            :global(nav.user-navigation) {
              display: none;
            }

            :global(.arrow-toggle) {
              display: flex;
            }

            :global(.header .main-navigation.active) {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              position: fixed;
              left: 0;
              right: 0;
              top: 85px;
              padding: 0;
              background: white;
              box-shadow: #fff 0 -15px, rgba(0, 0, 0, 0.1) 0 0 15px;
              border-bottom: 1px solid #eaeaea;
            }
            :global(.header .main-navigation.active > span) {
              width: 100%;
              padding: 0 15px;
              border-top: 1px solid #eaeaea;
            }

            :global(.header .main-navigation .desktop-only) {
              display: none;
            }

            :global(.header .main-navigation .mobile-only) {
              display: block;
            }

            :global(.header .main-navigation .navigation-items) {
              flex-wrap: nowrap;
              padding: 8px 16px;
              border-top: 1px solid #eaeaea;
              overflow-x: auto;
              display: flex;
              width: 100%;
              white-space: nowrap;
            }

            :global(.header .main-navigation .navigation-item a) {
              padding: 8px;
            }

            :global(.header .navigation-sidebar) {
              margin-top: 14px;
              margin-left: 32px;
            }

            .mobile_search {
              display: block;
              opacity: 1;
              visibility: visible;
              transition: visibility 0s linear 0s, opacity 300ms;
            }
            .mobile_search.hidden {
              visibility: hidden;
              opacity: 0;
              transition: visibility 0s linear 300ms, opacity 300ms;
            }
          }
          @media screen and (max-width: 360px) {
            .mobile_search {
              max-width: 242px;
              width: 70%;
            }
          }
        `}</style>
        <style jsx>{`
          :global(.header-hidden) {
            top: -80px;
          }
        `}</style>
      </LayoutHeader>
    )
  }
}

export default withRouter(Header)
