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
import getSection from '~/new-components/utils/get-section'
import Head from '~/new-components/layout/head'
import Header from '~/new-components/header'
import Main from '~/new-components/layout/main'
import Page from '~/new-components/layout/page'
import scrollToElement from '~/new-components/utils/scroll-to-element'
import Select from '~/components/select'
import Sidebar from '~/new-components/layout/sidebar'
import ToggleGroup, { ToggleItem } from '~/new-components/toggle-group'
import withPermalink from '~/new-components/docs-page/docs/with-permalink'
import Entry from './entry'
import Section from './section'
import SubEntry from './sub-entry'
import getFragmentById from './get-fragment-by-id'
import getSlugsForId from './get-slugs-for-id'
import getHref from './get-href'
import toc from './toc'

const getDocPage = function getDocPage() {
  class DocPage extends Component {
    state = {
      activeId: null,
      navigationActive: false,
      version: this.props.router.asPath.split(/(v[0-9])/)[1]
    }

    componentDidUpdate(prevProps, prevState) {
      if (this.state.activeId !== prevState.activeId) {
        changeHash(getFragmentById(this.state.activeId))
      }
    }

    getActiveItem = () => {
      return getSlugsForId(this.state.activeId)
    }

    handleVersionChange = event => {
      const href = `/docs/${event.target.value}`
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

    handleSidebarRef = node => {
      this.sidebarNode = node
    }

    handleEntryActive = entryNode => {
      scrollToElement(this.sidebarNode, entryNode)
    }

    handleSectionActive = sectionNode => {
      if (!getSlugsForId(this.state.activeId).entry) {
        scrollToElement(this.sidebarNode, sectionNode)
      }
    }

    handleIntersect = activeId => {
      if (this.state.activeId !== activeId) {
        this.setState({ activeId })
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

    render() {
      const { children, currentTeamSlug, router, user } = this.props
      const pathSection = getSection(router.pathname)
      const { navigationActive, version } = this.state

      return (
        <MDXProvider
          components={{
            ...components,
            h1: withPermalink(components.h1),
            h2: withPermalink(components.h2),
            h3: withPermalink(components.h3),
            h4: withPermalink(components.h4),
            docsSubentry: SubEntry,
            docsSection: Section,
            docsEntry: Entry
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

            <DocsBuilder docs={children}>
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
                    <DocsIndex
                      activeItem={this.getActiveItem(structure)}
                      getHref={getHref}
                      onEntryActive={this.handleEntryActive}
                      onSectionActive={this.handleSectionActive}
                      onClickLink={this.handleIndexClick}
                      structure={toc}
                    />
                  </Sidebar>
                  <Content>
                    <Context.Provider
                      value={{
                        onIntersect: this.handleIntersect
                      }}
                    >
                      {children}
                    </Context.Provider>
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

  return withRouter(DocPage)
}

export default getDocPage
