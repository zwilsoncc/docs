import cn from 'classnames'
import PropTypes from 'prop-types'
import getAvatarUrl from '../utils/get-avatar-url'

const Avatar = ({ user, size, teamId = null }, { darkBg = false }) => (
  <span className={cn({ dark: darkBg })} style={{ width: size, height: size }}>
    <img
      alt={user.username || user.email}
      title={user.username || user.email}
      src={getAvatarUrl(user, teamId, size)}
    />
    <style jsx>{`
      span {
        border-radius: 100%;
        border: 1px solid #eee;
        display: inline-block;
        line-height: 0;
        overflow: hidden;
        vertical-align: top;
      }

      img {
        height: 100%;
        width: 100%;
      }

      .dark {
        border: 1px solid #333;
      }
    `}</style>
  </span>
)

Avatar.contextTypes = {
  darkBg: PropTypes.bool
}

export default Avatar
