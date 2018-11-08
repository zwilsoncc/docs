import { withRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Markdown from 'react-markdown'

import { PDIV, P, Quote } from '~/components/text/paragraph'
import { UL, LI } from '~/components/text/list'
import { H2, H3, H4 } from '~/components/text/heading'
import { InlineCode, Code } from '~/components/text/code'
import {
  LabeledExternalLink,
  IconExternalLink,
  GenericLink
} from '~/components/text/link'
import ForkIcon from '~/components/icons/fork'
import SearchIcon from '~/components/icons/search'
import ExternalLinkIcon from '~/components/icons/external-link'
import Input from '~/components/input'

import * as bodyLocker from '~/new-components/utils/body-locker'
import getSection from '~/new-components/utils/get-section'
import Head from '~/new-components/layout/head'
import Header from '~/new-components/header'
import Main from '~/new-components/layout/main'
import Page from '~/new-components/layout/page'
import DocsIndex from '~/new-components/docs-index'
import Content from '~/new-components/layout/content'
import Sidebar from '~/new-components/layout/sidebar'
import Select from '~/components/select'
import ToggleGroup, { ToggleItem } from '~/new-components/toggle-group'
import withError from '~/lib/with-error'
import EXAMPLES from '~/lib/data/now-examples-docs'

const DIV = props => (
  <div className="wrapper">
    <PDIV {...props} />
    <style jsx>{`
      .wrapper {
        margin: 0;
      }
    `}</style>
  </div>
)

const H1 = ({ children }) => (
  <h1>
    {children}
    <style jsx>
      {`
        h1 {
          color: #000;
          font-size: 26px;
          line-height: 1.6;
          font-weight: 400;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
  </h1>
)

const CodeMarkdown = ({ language, value }) => (
  <Code syntax={language}>{value}</Code>
)

const Headings = ({ level, children }) => {
  switch (level) {
    case 1:
      return <H1>{children}</H1>
    case 2:
      return <H2>{children}</H2>
    case 3:
      return <H3>{children}</H3>
    case 4:
      return <H4>{children}</H4>
    default:
      return <p>{children}</p>
  }
}

export const mdxComponents = {
  root: DIV,
  paragraph: P,
  strong: P.B,
  list: UL,
  listItem: LI,
  heading: Headings,
  code: CodeMarkdown,
  inlineCode: InlineCode,
  link: GenericLink,
  blockquote: Quote
}

function wrapSidebar(sections) {
  return [
    {
      title: 'Examples',
      slug: 'examples',
      sections
    }
  ]
}

class ExamplesPage extends React.Component {
  static getInitialProps = ({ query }) => {
    let example
    let initExample = false
    const { exampleSlug } = query

    if (exampleSlug === undefined) {
      initExample = true
      example = EXAMPLES[Object.keys(EXAMPLES)[0]]
    } else {
      example = EXAMPLES[query.exampleSlug]
    }

    if (!example) {
      return { statusCode: 404 }
    }

    return { initExample, example }
  }

  constructor(props) {
    super(props)
    const sidebarData = wrapSidebar(
      Object.values(EXAMPLES).map(item => {
        return {
          title: item.name,
          slug: item.slug,
          entries: [],
          isPage: true
        }
      })
    )

    this.state = {
      initalSidebar: sidebarData,
      sidebar: sidebarData
    }
  }

  filterSidebar = input => {
    let filteredList = this.state.initalSidebar[0].sections

    filteredList = filteredList.filter(item => {
      return item.title.toLowerCase().search(input.toLowerCase()) !== -1
    })

    this.setState({ sidebar: wrapSidebar(filteredList) })
  }

  handleToggleNavigation = () => {
    this.setState(({ navigationActive }) => {
      if (navigationActive) {
        bodyLocker.unlock()
      } else {
        bodyLocker.lock()
      }

      return {
        navigationActive: !navigationActive
      }
    })
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      bodyLocker.unlock()
      this.setState({
        navigationActive: false
      })
    }
  }

  render() {
    const { currentTeamSlug, router, user } = this.props
    const pathSection = getSection(router.pathname)
    const { navigationActive, sidebar } = this.state
    const { name, demo, fork, content } = this.props.example
    const title = !this.props.initExample ? ` - ${name}` : ''

    const active = {
      category: 'examples',
      section: this.props.example ? this.props.example.name : null,
      entry: null
    }

    return (
      <Page>
        <Head
          description="A comprehensive guide to using the Now API and gaining control over the Now platform"
          title={`Now by Example${title}`}
          titlePrefix=""
          titleSuffix=" - ZEIT"
        />

        <Header
          currentTeamSlug={currentTeamSlug}
          onToggleNavigation={this.handleToggleNavigation}
          user={user}
        />
        <Main>
          <Sidebar active={navigationActive} innerRef={this.handleSidebarRef}>
            <div className="toggle-group-wrapper">
              <ToggleGroup>
                <ToggleItem active={pathSection === '/docs'}>
                  <Link prefetch href="/docs">
                    <a onClick={this.handleIndexClick}>Docs</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={pathSection === '/api'}>
                  <Link prefetch href="/api">
                    <a onClick={this.handleIndexClick}>Api Refence</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={pathSection === '/examples'}>
                  <Link prefetch href="/examples">
                    <a onClick={this.handleIndexClick}>Examples</a>
                  </Link>
                </ToggleItem>
              </ToggleGroup>
            </div>
            <h5 className="platform-select-title">Now Platform Version</h5>
            <Select defaultValue="v2" disabled={true} width="100%">
              <option value="v1">v1</option>
              <option value="v2">v2 (Latest)</option>
            </Select>
            <div className="search-bar">
              <Input
                className="search-input"
                rightIcon={<SearchIcon />}
                placeholder="Search for examples"
                onChange={this.filterSidebar}
              />
            </div>
            <DocsIndex
              activeItem={active}
              getHref={slugs => {
                return {
                  href: `/examples?exampleSlug=${slugs.section}`,
                  as: `/examples/${slugs.section}`
                }
              }}
              onSectionActive={() => {}}
              onClickLink={this.handleIndexClick}
              structure={sidebar}
            />
          </Sidebar>
          <Content>
            <div className="category-wrapper">
              <div className="buttons">
                <div className="fork-button">
                  <IconExternalLink icon={<ForkIcon />} href={fork}>
                    Fork
                  </IconExternalLink>
                </div>
                <LabeledExternalLink
                  label="Live Demo"
                  href={demo}
                  icon={<ExternalLinkIcon />}
                >
                  {demo}
                </LabeledExternalLink>
              </div>
              <Markdown source={content} renderers={mdxComponents} />
            </div>
          </Content>
        </Main>
        <style jsx>{`
          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .category-wrapper {
            padding: 40px 0;
          }

          .category-wrapper:not(:last-child) {
            border-bottom: 1px solid #eaeaea;
          }

          .platform-select-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 16px;
            margin-top: 0;
          }

          .toggle-group-wrapper {
            display: none;
          }

          .search-bar {
            margin-top: 15px;
          }

          .search-bar :global(.search-input) {
            width: 100%;
          }

          .buttons {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 10px;
          }

          .fork-button {
            margin-right: 10px;
          }

          @media screen and (max-width: 950px) {
            .toggle-group-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 40px;
            }

            .buttons {
              align-items: flex-start;
              padding-top: 25px;
            }

            .fork-button {
              margin-bottom: 10px;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default withRouter(withError(ExamplesPage))
