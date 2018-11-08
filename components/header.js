// Packages
import React from 'react'
import Link from 'next/link'
// import Router from 'next/router'
import fetchAPI from '../lib/fetch-api'

// Components
import Logo from './icons/logo'
import Avatar from './avatar'
import AvatarPopOverLink from './avatar-popover-link'

// Utilities
import logout from '../lib/logout'

// persists the chat count across different
// instances of Header on the client side
let chatCount = null
let chatData = null

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
    const section = props.pathname
      .split('/')
      .slice(0, 2)
      .join('/')
    this.state = {
      section,
      logoutError: false,
      logoutErrorCode: null,
      chatCount:
        props.chatCount == null ? chatCount : (chatCount = props.chatCount)
    }
    this.chatCountTimer = null
    this.onVisibilityChange = this.onVisibilityChange.bind(this)
  }

  componentDidMount() {
    if (chatData && this.props.onChatCountUpdate) {
      this.props.onChatCountUpdate(chatData)
    }

    this.scheduleChatCountUpdate(true)
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.scheduleChatCountUpdate()
    } else {
      this.cancelChatCountUpdates()
    }
  }

  cancelChatCountUpdates() {
    clearTimeout(this.chatCountTimer)
    this.chatCountTimer = null
  }

  componentWillUnmount() {
    this.cancelChatCountUpdates()
  }

  scheduleChatCountUpdate(instant = false) {
    if (this.chatCountTimer !== null) return

    this.chatCountTimer = setTimeout(() => {
      fetchAPI('/api/v1/chat', null, {
        method: 'POST',
        body: JSON.stringify({
          query: `
          {
            community(slug: "zeit") {
              metaData {
                onlineMembers
                members
              }
            }
          }
        `
        })
      })
        .then(response => {
          // canceled?
          if (this.chatCountTimer === null) return

          const { metaData } = response.data.community

          chatCount = metaData.onlineMembers
          chatData = metaData

          // canceled?
          if (this.chatCountTimer === null) return

          this.setState({ chatCount: metaData.onlineMembers })
          this.chatCountTimer = null

          if (this.props.onChatCountUpdate) {
            this.props.onChatCountUpdate(metaData)
          }

          if (document.visibilityState === 'visible') {
            this.scheduleChatCountUpdate()
          }
        })
        .catch(() => {
          this.chatCountTimer = null

          if (document.visibilityState === 'visible') {
            this.scheduleChatCountUpdate()
          }
        })
    }, instant ? 0 : 10000)
  }

  onLogout() {
    if (this.state.loggingOut) return
    this.setState({
      loggingOut: true,
      logoutError: false,
      logoutErrorCode: null
    })
    logout()
      .then(() => {
        this.setState({ loggingOut: false })
        this.props.onLogout && this.props.onLogout()
      })
      .catch(err => {
        this.setState({
          loggingOut: false,
          logoutError: true,
          logoutErrorCode: err.code
        })
      })
  }

  onLogoRightClick = event => {
    if (this.props.onLogoRightClick) {
      event.preventDefault()
      this.props.onLogoRightClick()
    }
  }

  render() {
    const { currentTeamSlug, user, pathname } = this.props
    const { section } = this.state

    return (
      <div>
        {this.state.logoutError && (
          <div className="logout-error">
            An error occurred while logging out ({this.state.logoutErrorCode})
          </div>
        )}

        <header>
          <div className="header-content">
            <a
              href={
                currentTeamSlug
                  ? `/teams/${currentTeamSlug}`
                  : user ? '/dashboard' : '/'
              }
              className="logo"
              onMouseEnter={this.onLogoMouseEnter}
              onContextMenu={this.onLogoRightClick}
            >
              {this.props.logo ? <span>{this.props.logo}</span> : <Logo />}
            </a>
            <div
              className={
                'nav-container ' + (this.state.responsive ? 'responsive' : '')
              }
            >
              <div className="nav left">
                <Link prefetch href="/docs">
                  <a className={section === '/docs' ? 'active' : ''}>Docs</a>
                </Link>

                <Link prefetch href="/api">
                  <a className={section === '/api' ? 'active' : ''}>
                    API Reference
                  </a>
                </Link>

                <Link prefetch href="/examples">
                  <a className={section === '/examples' ? 'active' : ''}>
                    Examples
                  </a>
                </Link>
              </div>

              <div className="nav right">
                {this.props.user && [
                  <Link href="/dashboard" key="2">
                    <a className="mobile-link">Dashboard</a>
                  </Link>,
                  <Link href="/chat" key="1">
                    <a
                      className={`chat ${this.state.chatCount
                        ? 'chat-active'
                        : ''}`}
                    >
                      Chat
                      <span>{this.state.chatCount}</span>
                    </a>
                  </Link>,
                  <Link href="/account/identity" as="/account" key="3">
                    <a className="mobile-link account">
                      Account
                      <div className="avatar-container">
                        <Avatar
                          uid={this.props.user.uid}
                          title={
                            this.props.user.username || this.props.user.email
                          }
                          size={30}
                          hash={this.props.user.avatar}
                        />
                      </div>
                    </a>
                  </Link>,
                  <a
                    onClick={this.onLogout}
                    className="mobile-logout mobile-link"
                    key="4"
                  >
                    Logout
                  </a>,
                  <span key="avatar" className="avatar">
                    <AvatarPopOverLink
                      user={user}
                      pathname={pathname}
                      onLogout={this.onLogout}
                    />
                  </span>
                ]}
                {!this.props.user && [
                  <Link href="/chat" key="1">
                    <a
                      className={`chat ${this.state.chatCount
                        ? 'chat-active'
                        : ''}`}
                    >
                      Chat
                      <span>{this.state.chatCount}</span>
                    </a>
                  </Link>,
                  <Link href="/login" key="2">
                    <a className={'/login' === section ? 'active' : ''}>
                      Login
                    </a>
                  </Link>
                ]}
              </div>
            </div>
          </div>
        </header>
        {this.props.title ? (
          <h1 className="title">
            {this.props.subtitle ? (
              [
                <b key="0">{this.props.title}: </b>,
                <span className="subtitle" key="1">
                  {this.props.subtitle}
                </span>
              ]
            ) : (
              <b>{this.props.title}</b>
            )}
          </h1>
        ) : null}
        <style jsx>
          {`
            header {
              position: relative;
              background: white;
              height: 90px;
              border-bottom: 1px solid #eaeaea;
              padding: 0 24px;
            }

            .header-content {
              max-width: 1000px;
              margin: auto;
              display: flex;
              align-items: center;
              height: 100%;
            }

            .nav > a {
              color: #999;
              font-size: 11px;
              text-decoration: none;
              transition: color 0.2s ease;
            }

            .nav > a:hover {
              color: #000;
            }

            .logout-error {
              height: 25px;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              font-size: 12px;
              text-transform: uppercase;
              line-height: 25px;
              vertical-align: middle;
              z-index: 100000;
              background: #ff001f;
              text-align: center;
              color: #fff;
              animation: hide 100ms ease-out;
            }

            @keyframes hide {
              from {
                transform: translateY(-25px);
              }
              to {
                transform: translateY(0);
              }
            }

            a.logo {
              display: block;
              width: 28px;
              height: 25px;
              position: relative;
            }

            .nav-container {
              width: 100%;
              display: flex;
            }

            .nav {
              padding: 10px;
              padding-right: 0;
              display: flex;
              align-items: center;
            }

            .nav .chat {
              align-items: center;
              display: inline-flex;
            }

            .nav .chat span {
              background-color: #333;
              width: 26px;
              text-align: center;
              margin-left: 10px;
              padding: 2px 5px;
              line-height: 11px;
              display: inline-block;
              color: #eee;
              font-size: 8px;
              border-radius: 8px;
              font-weight: bold;
              vertical-align: middle;
              opacity: 0;
              transition: all 1s ease;
            }

            .nav .chat.chat-active span {
              opacity: 1;
            }

            .nav .chat:hover span {
              color: #fff;
              background-color: #000;
            }

            .nav a {
              padding: 10px;
              font-size: 12px;
              text-transform: uppercase;
              font-weight: normal;
              vertical-align: middle;
              line-height: 30px;
            }

            .nav a:last-child {
              padding-right: 0;
            }

            .nav a.active {
              color: #000;
            }

            .menu-arrow {
              display: none;
              width: 40px;
              height: 40px;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .right {
              right: 0;
              margin-left: auto;
            }

            .left {
              left: 50px;
            }

            .title {
              margin-bottom: 60px;
              font-size: 14px;
              font-weight: normal;
              text-align: center;
              color: #000;
            }

            .title b {
              font-weight: bold;
            }

            @keyframes fadeOut {
              from {
                opacity: 1;
              }

              to {
                opacity: 0.7;
              }
            }

            @keyframes rotateInitial {
              from {
                transform: rotate(0);
              }

              to {
                transform: rotate(15deg);
              }
            }

            @keyframes rotate {
              from {
                transform: rotate(15deg);
              }

              30% {
                transform: rotate(0);
              }

              70% {
                transform: rotate(0);
              }

              to {
                transform: rotate(-15deg);
              }
            }

            .avatar {
              margin-left: 10px;
            }

            .mobile-link {
              display: none;
            }

            @media screen and (max-width: 950px) {
              header {
                text-align: left;
              }

              .nav {
                padding-top: 40px;
                padding-bottom: 0;
                padding-left: 0;
                position: relative;
                transform: none;
                top: 20px;
              }

              .nav a {
                border-bottom: 1px solid #eaeaea;
                color: #000;
                display: block;
                font-size: 14px;
                line-height: 50px;
                height: 50px;
                padding: 0 20px;
              }

              .nav a:hover,
              .nav a.active {
                background: #f8f8f8;
              }

              .nav a.active {
                background: #f8f8f8;
                font-weight: bold;
              }

              .nav-container {
                display: none;
                background: #fff;
                width: 100%;
                min-height: 90vh;
                z-index: 1;
              }

              .nav .chat,
              .nav .account {
                display: flex;
              }

              .nav .chat > span {
                border-radius: 12px;
                font-size: 12px;
                margin-left: auto;
                padding: 4px 7px;
                width: auto;
              }

              .nav .avatar-container {
                align-items: center;
                display: flex;
                margin-left: auto;
              }

              .nav-container.responsive {
                display: flex;
                width: 100%;
                margin-bottom: 20px;
              }

              .nav-container .left {
                left: 0;
                padding: 0;
              }

              .menu-arrow {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 28px;
                right: 20px;
                transition: transform 0.2s ease;
              }

              .menu-arrow {
                fill: #000;
              }

              .menu-arrow.toggled {
                transform: rotate(180deg);
              }

              .mobile-link {
                display: inline-block;
              }

              .mobile-logout {
                cursor: pointer;
              }

              .avatar {
                display: none;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

export default Header
