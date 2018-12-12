import { withRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Markdown from 'react-markdown'

import Code from '~/new-components/mdx-components/code'
import GenericLink from '~/new-components/mdx-components/link'
import H1 from '~/new-components/mdx-components/h1'
import H2 from '~/new-components/mdx-components/h2'
import H3 from '~/new-components/mdx-components/h3'
import H4 from '~/new-components/mdx-components/h4'
import H5 from '~/new-components/mdx-components/h5'
import H6 from '~/new-components/mdx-components/h6'
import InlineCode from '~/new-components/mdx-components/inline-code'
import LI from '~/new-components/mdx-components/li'
import P from '~/new-components/mdx-components/p'
import Quote from '~/new-components/mdx-components/quote'
import Strong from '~/new-components/mdx-components/strong'
import UL from '~/new-components/mdx-components/ul'
import Wrapper from '~/new-components/mdx-components/wrapper'

import { LabeledExternalLink, IconExternalLink } from '~/components/text/link'
import ForkIcon from '~/components/icons/fork'
import SearchIcon from '~/components/icons/search'
import ExternalLinkIcon from '~/components/icons/external-link'
import Input from '~/components/input'

import * as bodyLocker from '~/new-components/utils/body-locker'
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
import { UserContext } from '~/components/user-context'

const CodeMarkdown = ({ language, value }) => (
  <Code syntax={language}>{value}</Code>
)

const Headings = ({ level, children }) => {
  switch (level) {
    case 1:
      // This helps us put the title on above the custom buttons
      return null
    case 2:
      return <H2>{children}</H2>
    case 3:
      return <H3>{children}</H3>
    case 4:
      return <H4>{children}</H4>
    case 5:
      return <H5>{children}</H5>
    case 6:
      return <H6>{children}</H6>
    default:
      return <p>{children}</p>
  }
}

export const mdxComponents = {
  root: Wrapper,
  paragraph: P,
  strong: Strong,
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
    const { router } = this.props
    const { navigationActive, sidebar } = this.state
    const { name, demo, fork, content } = this.props.example
    const title = !this.props.initExample ? ` - ${name}` : ''

    const active = {
      category: 'examples',
      section: this.props.example ? this.props.example.slug : null,
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

        <UserContext.Consumer>
          {({ user, userLoaded }) => (
            <Header
              onToggleNavigation={this.handleToggleNavigation}
              user={user}
              userLoaded={userLoaded}
            />
          )}
        </UserContext.Consumer>

        <Main>
          <Sidebar active={navigationActive} innerRef={this.handleSidebarRef}>
            <div className="toggle-group-wrapper">
              <ToggleGroup>
                <ToggleItem
                  active={
                    router.pathname.startsWith('/docs') &&
                    !router.pathname.startsWith('/docs/api')
                  }
                >
                  <Link prefetch href="/docs">
                    <a onClick={this.handleIndexClick}>Docs</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={router.pathname.startsWith('/docs/api')}>
                  <Link prefetch href="/docs/api">
                    <a onClick={this.handleIndexClick}>API Reference</a>
                  </Link>
                </ToggleItem>
                <ToggleItem active={router.pathname.startsWith('/examples')}>
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
                  href: `/examples/${slugs.section}`,
                  as: `/examples/${slugs.section}`
                }
              }}
              onSectionActive={() => {}}
              onClickLink={this.handleIndexClick}
              structure={sidebar}
              setInitiallyActive={() => {}}
              updateActive={() => {}}
            />
          </Sidebar>
          <Content>
            <div className="category-wrapper">
              <H1>{name}</H1>
              <div className="buttons">
                <div className="fork-button">
                  <IconExternalLink
                    icon={<ForkIcon />}
                    href={`https://github.com/zeit/now-examples/tree/master${fork}`}
                  >
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
            margin-bottom: 25px;
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
