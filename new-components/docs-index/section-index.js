import cns from 'classnames'
import Link from 'next/link'
import { Component } from 'react'
import EntryIndex from './entry-index'

class SectionIndex extends Component {
  componentDidUpdate(prevProps) {
    if (isSectionActive(this.props) && !isSectionActive(prevProps)) {
      this.props.onSectionActive(this.rootNode)
    }
  }

  handleRef = node => {
    this.rootNode = node
  }

  renderEntry = entry => (
    <EntryIndex
      key={entry.slug}
      activeItem={this.props.activeItem}
      category={this.props.category}
      entry={entry}
      getHref={this.props.getHref}
      isSectionActive={isSectionActive(this.props)}
      onActive={this.props.onEntryActive}
      onClickLink={this.props.onClickLink}
      section={this.props.section}
    />
  )

  render() {
    const { category, getHref, section, onClickLink } = this.props
    const active = isSectionActive(this.props)
    const { href, as } = getHref({
      category: category.slug,
      section: section.slug
    })

    return (
      <li className="section-wrapper" key={section.slug}>
        {href ? (
          <Link href={href} as={as} prefetch>
            <a
              className={cns('title', { active })}
              onClick={onClickLink}
              ref={this.handleRef}
            >
              {section.title}
            </a>
          </Link>
        ) : (
          <span
            className={cns('title', { active })}
            onClick={onClickLink}
            ref={this.handleRef}
          >
            {section.title}
          </span>
        )}

        <ul className={cns({ active: active || !href })}>
          {section.entries.map(this.renderEntry)}
        </ul>
        <style jsx>{`
          ul {
            display: none;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          ul.active {
            display: block;
          }

          .title {
            color: #000;
            display: block;
            font-size: 14px;
            padding: 10px 0;
            text-decoration: none;
          }

          .title:visited {
            color: #000;
          }

          .title.active {
            font-weight: 600;
          }

          @media screen and (max-width: 950px) {
            li:not(:last-child) > a {
              border-bottom: 1px solid #eee;
              padding: 20px 0;
            }
          }
        `}</style>
      </li>
    )
  }
}

function isSectionActive({ category, section, activeItem }) {
  return (
    activeItem.category === category.slug && activeItem.section === section.slug
  )
}

export default SectionIndex
