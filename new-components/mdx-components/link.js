import cns from 'classnames'
import NativeLink from 'next/link'
import PropTypes from 'prop-types'

export const InternalLink = ({ href, as, children }, { darkBg } = {}) => (
  <NativeLink prefetch href={href} as={as}>
    <a className={cns({ dark: darkBg })}>
      {children}
      <style jsx>{`
        a {
          text-decoration: none;
          color: #067df7;
          font-size: inherit;
        }

        a:hover {
          text-decoration: underline;
        }

        a.dark {
          color: #fff;
        }
      `}</style>
    </a>
  </NativeLink>
)

InternalLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const AnchorLink = ({ href, onClick, children }, { darkBg } = {}) => (
  <a className={cns({ dark: darkBg })} href={href} onClick={onClick}>
    {children}
    <style jsx>{`
      a {
        text-decoration: none;
        color: #067df7;
        font-size: inherit;
      }

      a:hover {
        text-decoration: underline;
      }

      a.dark {
        color: #fff;
      }
    `}</style>
  </a>
)

AnchorLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const ExternalLink = ({ href, children }, { darkBg } = {}) => (
  <a
    className={cns({ dark: darkBg })}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
    <style jsx>{`
      a {
        text-decoration: none;
        color: #067df7;
        font-size: inherit;
      }

      a:hover {
        text-decoration: underline;
      }

      a.dark {
        color: #fff;
      }
    `}</style>
  </a>
)

ExternalLink.contextTypes = {
  darkBg: PropTypes.bool
}

export const GenericLink = props => {
  if (props.href.startsWith('/docs') || props.href.startsWith('/api')) {
    return <InternalLink {...props} />
  } else if (props.href.includes('@') || props.href.startsWith('#')) {
    return <AnchorLink {...props} />
  } else {
    return <ExternalLink {...props} />
  }
}

export default GenericLink
