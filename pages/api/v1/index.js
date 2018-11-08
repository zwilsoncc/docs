import { Component } from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { withRouter } from 'next/router'
import Link from 'next/link'

import * as bodyLocker from '~/new-components/utils/body-locker'
import changeHash from '~/new-components/utils/change-hash'
import components from '~/new-components/mdx-components'
import Content from '~/new-components/layout/content'
import Context from '~/new-components/docs-page/context'
import DocsBuilder from '~/new-components/docs-builder'
import DocsIndex from '~/new-components/docs-index'
import getFragment from '~/new-components/docs-page/api/get-fragment'
import getHref from '~/new-components/docs-page/api/get-href'
import getSection from '~/new-components/utils/get-section'
import Head from '~/new-components/layout/head'
import Header from '~/new-components/header'
import Main from '~/new-components/layout/main'
import Observer from '~/new-components/observer'
import Page from '~/new-components/layout/page'
import scrollToElement from '~/new-components/utils/scroll-to-element'
import Select from '~/components/select'
import Sidebar from '~/new-components/layout/sidebar'
import ToggleGroup, { ToggleItem } from '~/new-components/toggle-group'
import withPermalink from '~/new-components/docs-page/api/with-permalink'
import Note from '~/components/text/note'
import { P } from '~/components/text/paragraph'
import { GenericLink } from '~/components/text/link'

import ApiDocs from './api-docs-mdx/index.mdx'

class APIPage extends Component {
  state = {
    activeCategory: null,
    activeEntry: null,
    activeSection: null,
    navigationActive: false,
    version: this.props.router.asPath.split(/(v[0-9])/)[1]
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeCategory !== prevState.activeCategory ||
      this.state.activeSection !== prevState.activeSection ||
      this.state.activeEntry !== prevState.activeEntry
    ) {
      changeHash(
        getFragment({
          category: this.state.activeCategory,
          section: this.state.activeSection,
          entry: this.state.activeEntry
        })
      )
    }
  }

  handleSidebarRef = node => {
    this.sidebarNode = node
  }

  handleEntryActive = entryNode => {
    scrollToElement(this.sidebarNode, entryNode)
  }

  handleSectionActive = sectionNode => {
    if (!this.state.activeEntry) {
      scrollToElement(this.sidebarNode, sectionNode)
    }
  }

  handleVersionChange = event => {
    const href = `/api/${event.target.value}`
    this.props.router.push(href)
    this.handleIndexClick()
  }

  handleIndexClick = () => {
    if (this.state.navigationActive) {
      bodyLocker.unlock()
      this.setState({
        navigationActive: false
      })
    }
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

  handleCategoryIntersect = category => {
    const { activeCategory, activeSection, activeEntry } = this.state
    if (activeCategory !== category || activeSection || activeEntry) {
      this.setState({
        activeCategory: category,
        activeSection: null,
        activeEntry: null
      })
    }
  }

  handleSectionIntersect = category => section => {
    const { activeSection, activeEntry } = this.state
    if (activeSection !== section || activeEntry) {
      this.setState({
        activeCategory: category,
        activeSection: section,
        activeEntry: null
      })
    }
  }

  handleEntryIntersect = (category, section) => entry => {
    if (this.state.activeEntry !== entry) {
      this.setState({
        activeCategory: category,
        activeSection: section,
        activeEntry: entry
      })
    }
  }

  render() {
    const { currentTeamSlug, router, user } = this.props
    const pathSection = getSection(router.pathname)
    const { navigationActive, version } = this.state
    const active = {
      category: this.state.activeCategory,
      section: this.state.activeSection,
      entry: this.state.activeEntry
    }

    return (
      <MDXProvider
        components={{
          ...components,
          h1: withPermalink(components.h1),
          h2: withPermalink(components.h2),
          h3: withPermalink(components.h3)
        }}
      >
        <Page>
          <Head
            description="A comprehensive guide to using the Now API and gaining control over the Now platform"
            title={`Now API Documentation`}
            titlePrefix=""
            titleSuffix=" - ZEIT"
          />

          <Header
            currentTeamSlug={currentTeamSlug}
            onToggleNavigation={this.handleToggleNavigation}
            user={user}
          />

          <DocsBuilder docs={<ApiDocs />}>
            {({ structure }) => (
              <Main>
                <Sidebar
                  active={navigationActive}
                  innerRef={this.handleSidebarRef}
                >
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
                  <div className="select-wrapper">
                    <h5 className="platform-select-title">
                      Now Platform Version
                    </h5>
                    <Select
                      width="100%"
                      defaultValue={version}
                      onChange={this.handleVersionChange}
                    >
                      <option value="v1">v1</option>
                      <option value="v2">v2 (Latest)</option>
                    </Select>
                  </div>
                  <DocsIndex
                    activeItem={active}
                    getHref={getHref}
                    onEntryActive={this.handleEntryActive}
                    onSectionActive={this.handleSectionActive}
                    onClickLink={this.handleIndexClick}
                    structure={structure}
                  />
                </Sidebar>
                <Content>
                  <div className="note">
                    <Note warning>
                      This API documentation is for <P.B>version 1</P.B> of the
                      Now platform. For the latest features, please see{' '}
                      <GenericLink href="/api/v2">
                        the version 2 API reference
                      </GenericLink>. If you have yet to upgrade, see the{' '}
                      <GenericLink href="/docs/v2/platform/upgrade-to-2-0">
                        upgrade guide
                      </GenericLink>.
                    </Note>
                  </div>
                  {structure.map(category => {
                    const categorySlugs = { category: category.slug }
                    return (
                      <div className="category-wrapper" key={category.slug}>
                        <Context.Provider value={{ slugs: categorySlugs }}>
                          <Observer
                            fragment={getFragment(categorySlugs)}
                            onIntersect={this.handleCategoryIntersect}
                            value={category.slug}
                          >
                            {category.content}
                          </Observer>
                        </Context.Provider>

                        {category.sections.map(section => {
                          const sectionSlugs = {
                            category: category.slug,
                            section: section.slug
                          }

                          return (
                            <div key={section.slug}>
                              <Context.Provider value={{ slugs: sectionSlugs }}>
                                <Observer
                                  fragment={getFragment(sectionSlugs)}
                                  onIntersect={this.handleSectionIntersect(
                                    category.slug
                                  )}
                                  value={section.slug}
                                >
                                  {section.content}
                                </Observer>
                              </Context.Provider>
                              <div>
                                {section.entries.map(entry => {
                                  const entrySlugs = {
                                    category: category.slug,
                                    section: section.slug,
                                    entry: entry.slug
                                  }

                                  return (
                                    <Context.Provider
                                      key={entry.slug}
                                      value={{ slugs: entrySlugs }}
                                    >
                                      <Observer
                                        fragment={getFragment(entrySlugs)}
                                        onIntersect={this.handleEntryIntersect(
                                          category.slug,
                                          section.slug
                                        )}
                                        value={entry.slug}
                                      >
                                        {entry.content}
                                      </Observer>
                                    </Context.Provider>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </Content>
              </Main>
            )}
          </DocsBuilder>

          <style jsx>{`
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }

            .note {
              padding-top: 16px;
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

            .select-wrapper :global(.select) {
              width: 100%;
            }

            .toggle-group-wrapper {
              display: none;
            }

            @media screen and (max-width: 950px) {
              .toggle-group-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 40px;
              }
            }
          `}</style>
        </Page>
      </MDXProvider>
    )
  }
}

export default withRouter(APIPage)
