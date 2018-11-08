import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import { format, parse } from 'url'
import SectionContext from '~/components/api/section-context'
import DocsNavbarDesktop from '~/components/docs/navbar/desktop'
import DocsNavbarMobile from '~/components/docs/navbar/mobile'
import Head from '~/components/head'
import Header from '~/components/header'
import Logo from '~/components/icons/logo'
import Page from '~/components/page'
import sectionsV1 from '~/components/api/versions/v1/sections'
import sectionsV2 from '~/components/api/versions/v2/sections'
import FreezePageScroll from '~/components/freeze-page-scroll'
import dataV1 from '~/lib/data/v1/api'
import dataV2 from '~/lib/data/v2/api'
import withAPI from '~/lib/with-api'
import Select from '../../components/select'
import { H5 } from '../../components/text/heading'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}

class ContentWrapper extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return this.props.children
  }
}

class APIPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hash: null }
    this.contentNode = null
    this.observer = null
    this.version = props.router.asPath.split(/(v[0-9])/)[1]
    this.versionData = this.version === 'v2' ? dataV2 : dataV1
    this.sections = this.version === 'v2' ? sectionsV2 : sectionsV1

    this.onHashChange = this.onHashChange.bind(this)
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange)

    this.sections = [...this.contentNode.querySelectorAll('[id]')]

    const intersectingTargets = new Set()

    this.observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) {
          intersectingTargets.add(target)
        } else {
          intersectingTargets.delete(target)
        }
      }

      if (!intersectingTargets.size) return

      const sorted = [...intersectingTargets].sort(
        (a, b) => this.sections.indexOf(a) - this.sections.indexOf(b)
      )

      const hash = '#' + (sorted[0].id || '')
      if (location.hash !== hash) {
        changeHash(hash)
        this.onHashChange()
      }
    })

    for (const node of this.sections) {
      this.observer.observe(node)
    }

    const { hash } = window.location
    this.setState({ hash })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange)

    this.observer.disconnect()
    this.observer = null
  }

  onHashChange() {
    this.setState({ hash: window.location.hash })
  }

  handleVersionSwitcher = event => {
    const href = `/api/${event.target.value}`
    this.props.router.push(href)
  }

  render() {
    const { props } = this
    const { hash } = this.state

    return (
      <Page>
        <Head
          titlePrefix=""
          title={`Now API Documentation`}
          titleSuffix=" - ZEIT"
          description="A comprehensive guide to using the Now API and gaining control over the Now platform"
        />
        <div className="header-wrapper">
          <div className="header">
            <Header
              logo={<Logo />}
              user={props.user}
              pathname={props.router.pathname}
              onLogout={() => {
                Router.push('/login')
              }}
              onLogoRightClick={() => props.router.push('/logos')}
            />
          </div>
        </div>
        <div className="page-content">
          <FreezePageScroll>
            <div className="sidebar">
              <div className="version-select">
                <H5>Now Platform Version</H5>
                <Select
                  width="100%"
                  onChange={this.handleVersionSwitcher}
                  defaultValue={this.version}
                >
                  <option value="v2">Latest (v2)</option>
                  <option value="v1">Legacy (v1)</option>
                </Select>
              </div>

              <DocsNavbarDesktop
                data={this.versionData}
                url={props.router}
                hash={hash}
                scrollSelectedIntoView={true}
              />
            </div>
          </FreezePageScroll>
          <div className="doc-layout">
            <div className="topbar">
              <DocsNavbarMobile
                data={this.versionData}
                url={props.router}
                hash={hash}
                sticky={true}
                version={this.version}
                handleVersionSwitcher={this.handleVersionSwitcher}
              />
            </div>
            <div className="content" ref={ref => (this.contentNode = ref)}>
              <ContentWrapper>
                {this.versionData.map(({ id, posts }) => {
                  return (
                    <div key={id} className="category">
                      {posts.map(post => {
                        const Section = (this.sections[id] || {})[post.id]
                        return (
                          Section && (
                            <SectionContext.Provider key={post.id} value={post}>
                              <Section
                                user={props.user}
                                testingToken={props.testingToken}
                                key={post.id}
                              />
                            </SectionContext.Provider>
                          )
                        )
                      })}
                    </div>
                  )
                })}
              </ContentWrapper>
            </div>
          </div>
        </div>
        <style jsx>{`
          :global(body) {
            padding-bottom: 0;
          }

          .page-content {
            width: 1048px;
            max-width: 100%;
            display: flex;
            position: relative;
            padding: 0 24px;
          }

          .version-select {
            display: flex;
            flex-direction: column;
            margin-bottom: 48px;
          }

          .version-select :global(h5) {
            margin-top: 0;
            margin-bottom: 16px;
          }

          a {
            text-decoration: none;
            color: #999;
            transition: color 0.2s ease;
          }

          a:hover {
            color: #000;
          }

          .doc-layout {
            display: flex;
            margin-left: auto;
            justify-content: left;
            -webkit-font-smoothing: antialiased;
            flex: 0 0 744px;
            width: 744px;
            max-width: calc(100% - 256px);
          }

          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 101;
          }

          .sidebar {
            position: fixed;
            width: 256px;
            flex: 0 1 256px;
            margin-top: 0;
            bottom: 0;
            top: 90px;
            padding-top: 64px;
            padding-right: 40px;
            overflow: auto;
            -webkit-font-smoothing: antialiased;
            border-right: 1px solid #eaeaea;
          }

          .topbar {
            display: none;
            padding: 0 20px;
          }

          .content {
            width: 100%;
          }

          @media screen and (min-width: 700px) {
            /* prettier-ignore */
            .category:first-child :global(.section:first-child .block:first-child .copy),
            .category:first-child :global(.section:first-child .block:first-child .example) {
              padding-top: 40px;
            }

            /* prettier-ignore */
            .category:last-child :global(.section:last-child .block:last-child .copy),
            .category:last-child :global(.section:last-child .block:last-child .example) {
              padding-bottom: 95px;
            }
          }

          @media screen and (max-width: 950px) {
            .header-wrapper {
              height: 90px;
            }

            .doc-layout {
              display: block;
              margin: 0;
              max-width: 100%;
              width: 100%;
            }

            .content {
              width: 100%;
              margin-left: 0;
            }

            .sidebar {
              display: none;
            }

            .topbar {
              display: block;
            }
          }
        `}</style>
      </Page>
    )
  }
}

export default withRouter(withAPI(APIPage))

class BGContainer extends React.PureComponent {
  getChildContext() {
    return { darkBg: this.props.darkBg }
  }

  render() {
    return this.props.children
  }
}

BGContainer.childContextTypes = {
  darkBg: PropTypes.bool
}

function changeHash(hash) {
  const { pathname, query } = Router

  const parsedUrl = parse(location.href)
  parsedUrl.hash = hash

  Router.router.changeState(
    'replaceState',
    format({ pathname, query }),
    format(parsedUrl)
  )
}
