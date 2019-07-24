import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'

import Avatar from '~/components/avatar'
import * as PopOver from '~/components/popover'
import PopOverLink from '~/components/popover/popover-link'
import PlusIcon from '~/components/icons/plus'
import FaceIcon from '~/components/icons/emoji'

function ProfileItem({ user, onEditClick }) {
  let profileItem = null
  let icon = null

  if (user.username) {
    // username (with or without a custom avatar)
    profileItem = (
      <div className="profile">
        <span className="avatar">
          <Avatar
            uid={user.uid}
            size={48}
            hash={user.avatar}
            title={user.username}
          />
        </span>
        <div>
          <span className="username">{user.username}</span>
        </div>
        <style jsx>{`
          .profile {
            display: flex;
          }
          .avatar {
            display: inline-block;
            margin-right: 15px;
          }
          .profile div {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .username {
            font-size: 16px;
            color: var(--accents-7);
            text-decoration: none;
            font-weight: 500;
            line-height: 24px;
            overflow: hidden;
            max-width: 75px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .edit-profile {
            font-size: 14px;
            font-weight: 400;
            text-decoration: none;
            color: var(--geist-success);
            line-height: 20px;
          }
          .username,
          .edit-profile,
          .avatar {
            transition: opacity 0.2s ease;
          }
        `}</style>
      </div>
    )
  } else if (user.avatar) {
    // avatar (without a username)
    const urlEdit = `/profile`

    profileItem = (
      <div className="profile">
        <Link href={urlEdit}>
          <a onClick={onEditClick} className="edit-profile">
            <span className="avatar">
              <Avatar uid={user.uid} size={32} hash={user.avatar} />
            </span>
            <span>Edit Profile</span>
          </a>
        </Link>
        <style jsx>{`
          .edit-profile {
            display: flex;
            align-items: center;
          }
          .avatar {
            display: inline-block;
            margin-right: 12px;
          }
          .edit-profile {
            transition: opacity 0.2s ease;
            font-size: 14px;
            color: var(--accents-2);
            text-decoration: none;
            font-weight: 400;
            line-height: 20px;
          }
          .edit-profile:hover {
            opacity: 0.8;
          }
        `}</style>
      </div>
    )
  } else {
    const urlEdit = `/profile`

    profileItem = (
      <Link href={urlEdit}>
        <a onClick={onEditClick} className="edit-profile">
          Edit Profile
        </a>
      </Link>
    )

    icon = <FaceIcon />
  }

  return <PopOver.Item icon={icon}>{profileItem}</PopOver.Item>
}

export default class AvatarPopOverLink extends React.Component {
  static contextTypes = {
    darkBg: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.onPopOverOpen = this.onPopOverOpen.bind(this)
    this.state = {}
  }

  onPopOverOpen() {
    Router.prefetch('/account/identity')
    Router.prefetch('/dashboard')

    // in case user logs out, we prefetch
    // the page they get redirected to
    Router.prefetch('/login')
  }

  render() {
    const section = this.props.pathname
      .split('/')
      .slice(0, 2)
      .join('/')
    const { user, sticky } = this.props

    if (!user) return null

    const top = this.props.top || 43
    const avatarSize = this.props.avatarSize || 30

    return (
      <span className="avatar">
        <PopOverLink
          noIcon
          hideOnClick
          fixed={sticky}
          offsetTop={17}
          offsetLeft={-168}
          top={sticky ? '20px' : top}
          inline={false}
          onOpen={this.onPopOverOpen}
          ref={ref => (this.popover = ref)}
          to={
            <div className="avatar-menu">
              <PopOver.Menu tipOffset={173}>
                <ProfileItem user={this.props.user} />
                <PopOver.Item
                  key="0"
                  active={this.props.pathname === '/dashboard'}
                >
                  <Link href="/dashboard">
                    <a>Dashboard</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Item
                  className
                  key="1"
                  active={this.props.pathname === '/teams/settings'}
                  icon={<PlusIcon />}
                >
                  <Link href="/teams/settings?isCreating=1" as="/teams/create">
                    <a>New Team</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Item key="2">
                  <Link href="/account">
                    <a>Settings</a>
                  </Link>
                </PopOver.Item>
                <PopOver.Item key="4">
                  <a
                    className={`logout ${
                      this.state.loggingOut ? 'disabled' : ''
                    }`}
                    onClick={() => {
                      this.setState({ loggingOut: true })
                      this.props.onLogout && this.props.onLogout()
                    }}
                  >
                    {this.state.loggingOut ? 'Logging out...' : 'Logout'}
                  </a>
                </PopOver.Item>
              </PopOver.Menu>
            </div>
          }
        >
          <a
            href="/account"
            onClick={e => {
              if (!e.metaKey) e.preventDefault()
            }}
            className={
              'avatar-link ' + ('/account' === section ? 'active' : '')
            }
          >
            <Avatar
              uid={this.props.user.uid}
              title={this.props.user.username || this.props.user.email}
              size={avatarSize}
              hash={this.props.user.avatar}
            />
          </a>
        </PopOverLink>
        <style jsx>{`
          .avatar-menu :global(.item > a.active),
          .avatar-menu :global(.item > a:hover) {
            background: var(--accents-1);
          }
          .avatar-menu :global(.item) {
            width: 200px;
          }

          .avatar-menu :global(.item.dark .username) {
            color: #eaeaea;
          }

          .avatar-menu :global(.item:first-child) {
            padding-bottom: 16px;
          }

          .avatar-menu :global(.item:not(:first-child)) {
            border-top: 1px solid var(--accents-2);
            padding-top: 16px;
            padding-bottom: 16px;
          }

          .avatar-menu :global(.item:nth-child(3)) {
            border: none;
            padding-top: 0;
          }
          .avatar-menu :global(.item:nth-child(3) .icon) {
            height: 35px;
          }

          .avatar-menu :global(.item:last-child > a) {
            padding-bottom: 8px;
          }

          .avatar-menu :global(.menu) {
            padding-bottom: 0;
          }

          .logout,
          .dark-mode {
            cursor: pointer;
          }
          span.settings {
            font-size: 12px;
          }

          .dark-mode:hover :global(.badge) {
            color: #000;
            transition: 0.2s ease;
          }

          .dark-switch {
            margin-right: 5px;
          }

          .username-wrapper {
            white-space: nowrap;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .disabled {
            opacity: 0.5;
            pointer-events: none;
          }
        `}</style>
      </span>
    )
  }
}
