import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import formatDate from 'date-fns/format'
import Router, { withRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/tag'
// Components
import Head from '../components/head'
import Header from '../components/header'
import Heading from '../components/heading'
import Page from '../components/page'
import { P, Quote, HR } from '../components/text/paragraph'
import { UL, LI } from '../components/text/list'
import { H1, H3, H4, H5 } from '../components/text/heading'
import { InlineCode, Code } from '../components/text/code'
import { GenericLink } from '../components/text/link'
import GitHubIcon from '../components/icons/github'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import FreezePageScroll from '../components/freeze-page-scroll'
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
        constructor(props) {
          super(props)

          this.version = props.router.asPath.split('/docs/')[1].split('/')[0]
        }

        handleVersionSwitcher = event => {
          const href = `/docs/${event.target.value}`
          this.props.router.push(href)
        }

        render() {
          const versionData = this.version === 'v2' ? dataV2 : dataV1

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
                />
                <div className="header">
                  <Header
                    inverse={true}
                    user={this.props.user}
                    pathname={this.props.router.pathname}
                    onLogout={() => {
                      Router.push('/login')
                    }}
                    onLogoRightClick={() => this.props.url.push('/logos')}
                  />
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
                        data={versionData}
                        url={this.props.router}
                        scrollSelectedIntoView={true}
                      />
                    </div>
                  </FreezePageScroll>
                  <div className="doc-layout">
                    <div className="topbar">
                      <DocsNavbarMobile
                        data={versionData}
                        url={this.props.router}
                        version={this.version}
                        sticky={true}
                        handleVersionSwitcher={this.handleVersionSwitcher}
                      />
                    </div>
                    <div className="content">
                      <Note warning>
                        This documentation is for <P.B>version 1</P.B> of the
                        Now platform. For the latest features, please see{' '}
                        <GenericLink href="/docs/v2">
                          the version 2 documentation
                        </GenericLink>. If you have yet to upgrade, see the{' '}
                        <GenericLink href="/docs/v2/platform/upgrade-to-2-0">
                          upgrade guide
                        </GenericLink>.
                      </Note>
                      <H1 itemProp="headline">{options.title}</H1>
                      <WrapComponent {...this.props} />
                      <footer>
                        <time dateTime={lastEdited[options.editUrl]}>
                          Last Edited: {formatDate(
                            date,
                            'dddd, MMMM Do YYYY'
                          )}{' '}
                          ({distanceInWordsToNow(date)} ago)
                        </time>
                        <a
                          href={`https://github.com/zeit/docs/edit/master/${options.editUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>Edit on GitHub</span>
                          <GitHubIcon height={16} width={16} />
                        </a>
                      </footer>
                    </div>
                  </div>
                </div>
                <style jsx>{`
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

                  .button:first-of-type {
                    width: 79px;
                    margin-left: 30px;
                    border-right: none;
                    border-radius: 5px 0 0 5px;
                  }

                  .button {
                    text-align: center;
                    font-size: 12px;
                    border: 1px solid #eaeaea;
                    display: inline-block;
                    padding: 5px 10px 5px 10px;
                    margin-bottom: 30px;
                    border-radius: 0 5px 5px 0;
                  }

                  .doc-layout {
                    display: flex;
                    margin-left: auto;
                    justify-content: left;
                    -webkit-font-smoothing: antialiased;
                    flex: 0 0 744px;
                    width: 744px;
                    max-width: calc(100vw - 304px);
                    padding: 42px 0 64px 40px;
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
                    padding-top: 40px;
                    padding-right: 32px;
                    overflow: auto;
                    -webkit-font-smoothing: antialiased;
                    border-right: 1px solid #eaeaea;
                  }

                  .topbar {
                    display: none;
                  }

                  .content {
                    flex: 1;
                    max-width: 600px;
                  }

                  .content :global(h1) {
                    margin-top: 0;
                  }

                  footer {
                    border-top: 1px solid #eaeaea;
                    padding-top: 30px;
                    display: flex;
                    justify-content: space-between;
                  }

                  footer time {
                    color: #999;
                    font-size: 14px;
                  }

                  footer a {
                    text-transform: uppercase;
                    color: black;
                    font-size: 12px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                  }

                  footer a span {
                    margin-right: 0.5em;
                  }

                  @media screen and (max-width: 950px) {
                    .doc-layout {
                      display: block;
                      margin: 0;
                      max-width: 100%;
                      width: 100%;
                      padding: 48px 0;
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
            </MDXProvider>
          )
        }
      }
    )
  }
}

export default withDoc
