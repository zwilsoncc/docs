import Link from 'next/link'
import cns from 'classnames'
import { Component } from 'react'

class EntryIndex extends Component {
  componentDidUpdate(prevProps) {
    if (isEntryActive(this.props) && !isEntryActive(prevProps)) {
      this.props.onActive(this.rootNode)
    }
  }

  handleRef = node => {
    this.rootNode = node
  }

  render() {
    const { category, entry, getHref, onClickLink, section } = this.props
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug,
      entry: entry.slug
    })
    return (
      <li key={entry.slug} ref={this.handleRef}>
        <Link href={href} as={as} prefetch>
          <a
            className={cns({ active: isEntryActive(this.props) })}
            onClick={onClickLink}
          >
            {entry.title}
          </a>
        </Link>
        <style jsx>{`
          a {
            color: #000;
            display: block;
            font-size: 14px;
            line-height: 18px;
            padding: 10px 0 10px 10px;
            position: relative;
            text-decoration: none;
          }

          a:before {
            content: '-';
            display: inline-block;
            left: 0;
            opacity: 0.5;
            position: absolute;
            top: 9px;
          }

          a:visited {
            color: #000;
          }

          a.active {
            font-weight: 600;
          }

          @media screen and (max-width: 950px) {
            a {
              border-bottom: 1px solid #eee;
              padding: 20px 0 20px 10px;
            }

            a:before {
              content: '-';
              display: inline-block;
              left: 0;
              opacity: 0.5;
              position: absolute;
              top: 19px;
            }
          }
        `}</style>
      </li>
    )
  }
}

function isEntryActive({ isSectionActive, activeItem, entry }) {
  return isSectionActive && activeItem.entry === entry.slug
}

export default EntryIndex
