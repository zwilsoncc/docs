import React from 'react'
import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import { MDXProvider } from '@mdx-js/tag'
// Components
import Head from '~/new-components/layout/head'
import Header from '~/new-components/header'
import Page from '~/new-components/layout/page'
import Main from '~/new-components/layout/main'
import Heading from '../components/heading'
import Sidebar from '~/new-components/layout/sidebar'
import Content from '~/new-components/layout/content'
import ToggleGroup, { ToggleItem } from '~/new-components/toggle-group'
import { P, Quote, HR } from '../components/text/paragraph'
import { UL, LI } from '../components/text/list'
import { H1, H3, H4, H5 } from '../components/text/heading'
import { InlineCode, Code } from '../components/text/code'
import { GenericLink } from '../components/text/link'
import dataV1 from './data/v1/docs'
import dataV2 from './data/v2/docs'
import lastEdited from './data/last-edited.json'
import Select from '../components/select'
import Note from '~/components/text/note'

const DocH2 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H3>{children}</H3>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH3 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H4>{children}</H4>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

const DocH4 = ({ children }) => (
  <div>
    <Heading lean offsetTop={175}>
      <H5>{children}</H5>
    </Heading>
    <style jsx>{`
      div {
        margin: 40px 0 0 0;
      }
    `}</style>
  </div>
)

export const components = {
  p: P,
  strong: P.B,
  ul: UL,
  li: LI,
  h2: DocH2,
  h3: DocH3,
  h4: DocH4,
  code: Code,
  inlineCode: InlineCode,
  a: GenericLink,
  blockquote: Quote,
  hr: HR
}

const withDoc = options => {
  return WrapComponent => {
    return withRouter(
      class Doc extends React.Component {
        state = {
          navigationActive: false,
          version: this.props.router.asPath.split(/(v[0-9])/)[1]
        }

        handleVersionChange = event => {
          const href = `/docs/${event.target.value}`
          this.props.router.push(href)
          this.handleIndexClick()
        }

        handleIndexClick = () => {
          if (this.state.navigationActive) {
            this.setState({
              navigationActive: false
            })
          }
        }

        render() {
          const { router } = this.props
          const { version } = this.state
          const versionData = version === 'v2' ? dataV2 : dataV1

          const date = lastEdited[options.editUrl]
            ? new Date(lastEdited[options.editUrl])
            : new Date()

          return (
            <MDXProvider components={components}>
              <Page>
                <Head
                  titlePrefix=""
                  titleSuffix=" - ZEIT Documentation"
                  title={`${options.title}`}
                  description={options.description}
                  image={options.image}
                  lastEdited={date}
                >
                  <meta name="robots" content="noindex" />
                </Head>
                <Header
                  inverse={true}
                  user={this.props.user}
                  pathname={this.props.router.pathname}
                  onLogout={() => {
                    Router.push('/login')
                  }}
                  onLogoRightClick={() => this.props.url.push('/logos')}
                />

                <Main>
                  <Sidebar>
                    <div className="toggle-group-wrapper">
                      <ToggleGroup>
                        <ToggleItem active={router.pathname.startsWith('/docs/v')}>
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
                  </Sidebar>
                  <div className="doc-layout">
                    <Content>
                      { version === 'v1' &&
                        <Note>
                          This documentation is for <P.B>version 1</P.B> of the
                          Now platform. For the latest features, please see{' '}
                          <GenericLink href="/docs/v2">
                            the version 2 documentation
                          </GenericLink>. If you have yet to upgrade, see the{' '}
                          <GenericLink href="/docs/v2/platform/upgrade-to-2-0">
                            upgrade guide
                          </GenericLink>.
                        </Note>
                      }
                      <H1 itemProp="headline">{options.title}</H1>
                      <WrapComponent {...this.props} />
                    </Content>
                  </div>
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
    )
  }
}

export default withDoc
