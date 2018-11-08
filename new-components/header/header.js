import { Component } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import logout from '~/lib/logout'
import { Menu, MenuItem, MenuDivider } from '../menu'
import { Navigation, NavigationItem } from '../navigation'
import Arrow from '../icons/arrow'
import Avatar from '../avatar'
import ChatCount from '../chat-count'
import getDashboardHref from '../utils/get-dashboard-href'
import getSection from '../utils/get-section'
import LayoutHeader from '../layout/header'
import Logo from '../icons/logo'
import Plus from '../icons/plus'

class Header extends Component {
  state = {
    menuActive: false
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

  renderMenuTrigger = ({ handleProviderRef, menu }) => {
    const { user } = this.props
    return (
      <span
        onClick={this.handleAvatarClick}
        ref={handleProviderRef}
        style={{ position: 'relative' }}
      >
        <Avatar user={user} size={30} />
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

  render() {
    const {
      currentTeamSlug,
      navigationActive,
      onToggleNavigation,
      router,
      user
    } = this.props
    const { menuActive } = this.state
    const dashboard = getDashboardHref(user, currentTeamSlug)
    const pathSection = getSection(router.pathname)

    return (
      <LayoutHeader className="header">
        <a className="logo" href={dashboard}>
          <Logo height="25px" width="28px" />
        </a>

        <Navigation className="main-navigation">
          <NavigationItem href="/docs" active={pathSection === '/docs'}>
            Docs
          </NavigationItem>
          <NavigationItem href="/api" active={pathSection === '/api'}>
            API Reference
          </NavigationItem>
          <NavigationItem href="/examples" active={pathSection === '/examples'}>
            Examples
          </NavigationItem>
        </Navigation>

        <Navigation className="user-navigation">
          <NavigationItem className="chat" href="/chat">
            Chat <ChatCount className="chat-count" />
          </NavigationItem>
          {!user ? (
            <NavigationItem href="/login">Login</NavigationItem>
          ) : (
            <Menu
              active={menuActive}
              onClickOutside={this.handleClickOutsideMenu}
              render={this.renderMenuTrigger}
              style={{ minWidth: 200 }}
            >
              <MenuItem>
                <Link prefetch href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </MenuItem>
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
                <Link href="/account/identity" as="/account">
                  <a>Account Settings</a>
                </Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <a onClick={this.handleLogout}>Logout</a>
              </MenuItem>
            </Menu>
          )}
        </Navigation>

        <div
          className={cn('arrow-toggle', { active: navigationActive })}
          onClick={onToggleNavigation}
        >
          <Arrow height="14px" width="27px" />
        </div>
        <style jsx>{`
          :global(.header .main-navigation) {
            margin-right: auto;
          }

          :global(.header .user-navigation) {
            padding-right: 0;
          }

          :global(.chat:hover .chat-count) {
            background-color: #000;
          }

          .arrow-toggle {
            cursor: pointer;
            display: none;
            margin-left: auto;
            padding: 10px;
            transition: transform 0.2s ease;
          }

          .arrow-toggle.active {
            transform: rotate(180deg);
          }

          @media screen and (max-width: 950px) {
            :global(.header .main-navigation),
            :global(nav.user-navigation) {
              display: none;
            }

            .arrow-toggle {
              display: flex;
            }
          }
        `}</style>
      </LayoutHeader>
    )
  }
}

export default withRouter(Header)
