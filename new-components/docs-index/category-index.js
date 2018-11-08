import { Component } from 'react'
import SectionIndex from './section-index'

class CategoryIndex extends Component {
  renderSection = section => {
    return (
      <SectionIndex
        key={section.slug}
        getHref={this.props.getHref}
        onEntryActive={this.props.onEntryActive}
        onSectionActive={this.props.onSectionActive}
        onClickLink={this.props.onClickLink}
        category={this.props.category}
        activeItem={this.props.activeItem}
        section={section}
      />
    )
  }

  render() {
    return (
      <li>
        <span>{this.props.category.title}</span>
        <ul>{this.props.category.sections.map(this.renderSection)}</ul>
        <style jsx>{`
          li {
            margin-bottom: 40px;
          }

          span {
            color: #888;
            display: inline-block;
            font-size: 13px;
            font-weight: 400;
            letter-spacing: 1.3px;
            margin-bottom: 5px;
            text-decoration: none;
            text-transform: uppercase;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </li>
    )
  }
}

export default CategoryIndex
