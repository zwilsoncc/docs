import { useState, useEffect } from 'react'
import { useAmp } from 'next/amp'
import Head from '~/components/layout/head'
import { InstantSearch, Configure } from 'react-instantsearch-dom'
import getAlgoliaClient from '~/lib/get-algolia'

import Box from '~/components/icons/box'
import Message from '~/components/icons/message'
import GitHub from '~/components/icons/github-no-fill'
import Community from '~/components/icons/community'
import CheckmarkInCircle from '~/components/icons/checkmark-in-circle'
import AutoComplete from '~/components/search'
import { GenericLink } from '~/components/text/link'
import { P } from '~/components/text/paragraph'
import Footer from '~/components/footer'
import Layout from '~/components/layout/layout'
import Button from '~/components/buttons'
import H1 from '~/components/text/h1'
import H3 from '~/components/text/h3'
import H4 from '~/components/text/h4'
import H5 from '~/components/text/h5'
import data from '~/lib/data/v2/docs'
import Wrapper from '~/components/layout/wrapper'
import Topic from '~/components/topics'
import { List } from '~/components/list'
import * as metrics from '~/lib/metrics'

const searchClient = getAlgoliaClient()

function Landing() {
  const [searchState, setSearchState] = useState({})

  const handleClickedCTA = e => {
    metrics.event({
      action: 'cta_click',
      category: 'engagement',
      label: e.target.innerHTML.replace(/<[^>]*>?/gm, '')
    })
  }

  return (
    <div className="landing">
      <Layout dynamicSearch={true}>
        <Head
          titlePrefix=""
          tileSuffix=""
          title="ZEIT Now Docs"
          description="Learn how to deploy fast static websites and serverless functions."
        />
        <main>
          <section className="hero-section">
            <H1>Start Deploying with ZEIT Now</H1>
            <div className="search">
              <InstantSearch
                indexName="prod_docs"
                searchClient={searchClient}
                searchState={searchState}
                onSearchStateChange={newSearchState =>
                  setSearchState(newSearchState)
                }
              >
                <Configure hitsPerPage={8} />
                <AutoComplete />
              </InstantSearch>
            </div>

            <div className="get-started-cta">
              <GenericLink href="/docs/v2/introduction">
                <Button
                  bgColor="#0070F3"
                  width={284}
                  onClick={handleClickedCTA}
                >
                  Introduction to ZEIT Now
                </Button>
              </GenericLink>
            </div>
          </section>

          <Wrapper>
            <section className="topics-section">
              <H3>Guides</H3>
              <div className="topics-container">
                <List columnsDesktop={3} columnsTablet={2} columnsMobile={1}>
                  <Topic
                    topic="Next.js"
                    href="/guides/deploying-nextjs-with-now/"
                    icons={`${process.env.ASSETS}/topics/icons/next.svg`}
                  />
                  <Topic
                    topic="Gatsby"
                    href="/guides/deploying-gatsby-with-now/"
                    icons={`${process.env.ASSETS}/topics/icons/gatsby.svg`}
                  />
                  <Topic
                    topic="Vue.js"
                    href="/guides/deploying-vuejs-to-now/"
                    icons={`${process.env.ASSETS}/topics/icons/vue.svg`}
                  />
                  <Topic
                    topic="Angular"
                    href="/guides/deploying-angular-with-now/"
                    icons={`${process.env.ASSETS}/topics/icons/angular.svg`}
                  />
                  <Topic
                    topic="Create React App"
                    href="/guides/deploying-react-with-now-cra/"
                    icons={{
                      src: `${process.env.ASSETS}/topics/icons/react.svg`,
                      color: '#20232a'
                    }}
                  />
                  <Topic
                    topic="Next.js + Node.js + MySQL"
                    href="/guides/deploying-next-and-mysql-with-now/"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/next.svg`,
                      `${process.env.ASSETS}/topics/icons/node.svg`,
                      {
                        src: `${process.env.ASSETS}/topics/icons/mysql.svg`,
                        color: '#00546b'
                      }
                    ]}
                  />
                  <Topic
                    topic="Next.js + Prismic"
                    href="/guides/deploying-next-and-prismic-with-now"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/next.svg`,
                      {
                        src: `${process.env.ASSETS}/topics/icons/prismic.svg`,
                        color: '#1b2c7c'
                      }
                    ]}
                  />
                  <Topic
                    topic="Charge"
                    href="/guides/deploying-charge-with-now/"
                    icons={`${process.env.ASSETS}/topics/icons/charge.svg`}
                  />
                  <Topic
                    topic="Next.js + Storyblok"
                    href="/guides/deploying-next-and-storyblok-with-now/"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/next.svg`,
                      {
                        src: `${process.env.ASSETS}/topics/icons/storyblok.svg`,
                        color: '#09B3AF'
                      }
                    ]}
                  />
                  <Topic
                    topic="Next.js + ButterCMS"
                    href="/guides/deploying-next-and-buttercms-with-now"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/next.svg`,
                      {
                        src: `${process.env.ASSETS}/topics/icons/butter.svg`,
                        color: '#2A1C4D'
                      }
                    ]}
                  />
                  <Topic
                    topic="Next.js + Contentful"
                    href="/guides/deploying-next-and-contentful-with-now/"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/next.svg`,
                      {
                        src: `${
                          process.env.ASSETS
                        }/topics/icons/contentful.svg`,
                        color: '#192531'
                      }
                    ]}
                  />
                  <Topic
                    topic="Sanity.io"
                    href="/guides/deploying-sanity-studio-with-now/"
                    icons={{
                      src: `${process.env.ASSETS}/topics/icons/sanity.svg`,
                      color: '#f43'
                    }}
                  />
                  <Topic
                    topic="Node.js + MongoDB"
                    href="/guides/deploying-a-mongodb-powered-api-with-node-and-now/"
                    icons={[
                      `${process.env.ASSETS}/topics/icons/node.svg`,
                      {
                        src: `${process.env.ASSETS}/topics/icons/mongo.svg`,
                        color: '#414043'
                      }
                    ]}
                  />
                  <Topic
                    topic="Hugo"
                    href="/guides/deploying-hugo-with-now/"
                    icons={{
                      src: `${process.env.ASSETS}/topics/icons/hugo.svg`,
                      color: '#0a1921'
                    }}
                  />
                  <Topic
                    topic="VuePress"
                    href="/guides/deploying-vuepress-to-now/"
                    icons={`${process.env.ASSETS}/topics/icons/vue.svg`}
                  />
                </List>
              </div>
            </section>
          </Wrapper>

          <section className="docs-navigation-section">
            <Wrapper>
              <div className="docs-navigation-wrapper">
                {data.map(
                  d =>
                    d.posts &&
                    d.highlightCategory && (
                      <div className="docs-navigation-category" key={d.name}>
                        <H5>{d.name}</H5>
                        {d.posts.map(p => (
                          <GenericLink href={p.href || p.overview} key={p.name}>
                            {p.name}
                          </GenericLink>
                        ))}
                      </div>
                    )
                )}
                <div className="view-all">
                  <GenericLink href="/docs/v2/introduction">
                    View All Docs →
                  </GenericLink>
                </div>
              </div>
            </Wrapper>
          </section>

          <Wrapper>
            <section className="support-section">
              <div className="priority-support-card">
                <div className="icon">
                  <Community animate={true} />
                </div>
                <div className="desktop-only">
                  <H3>Priority Support</H3>
                </div>
                <div className="mobile-only">
                  <H4>Priority Support</H4>
                </div>
                <P>
                  Whether you are just getting started or operating at scale,
                  our plans include options to help you make the most of our
                  platform.
                </P>
              </div>
              <div className="support-check-list-wrapper">
                <div className="support-check-list">
                  <H5>All support plans include</H5>
                  <ul>
                    <li>
                      <div className="bullet-container">
                        <CheckmarkInCircle />
                        <P>Live Chat</P>
                      </div>
                    </li>
                    <li>
                      <div className="bullet-container">
                        <CheckmarkInCircle />
                        <P>Priority Queuing</P>
                      </div>
                    </li>
                    <li>
                      <div className="bullet-container">
                        <CheckmarkInCircle />
                        <P>Urgent Tickets</P>
                      </div>
                    </li>
                  </ul>
                  <GenericLink href="/support#Plans">
                    <Button
                      bgColor="#007aff"
                      width="fit-content"
                      onClick={handleClickedCTA}
                    >
                      View Plans
                    </Button>
                  </GenericLink>
                </div>
              </div>
            </section>
          </Wrapper>
          <Wrapper>
            <section className="extra-resources-section">
              <div>
                <div className="icon-with-header">
                  <Box />
                  <H5>Resources</H5>
                </div>
                <P>
                  Explore our{' '}
                  <span>
                    <GenericLink href="/guides">
                      step-by-step guides
                    </GenericLink>
                  </span>{' '}
                  to get familiar with our products and their features.{' '}
                  <span>
                    <GenericLink href="/guides">Learn More →</GenericLink>
                  </span>
                </P>
              </div>
              <div>
                <div className="icon-with-header">
                  <Message />
                  <H5>Community</H5>
                </div>
                <P>
                  Tap into a wealth of knowledge with thousands of community
                  members contributing.
                  <span>
                    {' '}
                    <GenericLink href="https://spectrum.chat/zeit">
                      Join us on Spectrum →
                    </GenericLink>
                  </span>
                </P>
              </div>
              <div>
                <div className="icon-with-header">
                  <GitHub />
                  <H5>Open Source</H5>
                </div>
                <P>
                  Search our repositories, open issues and contribute to our
                  documentation.{' '}
                  <span>
                    <GenericLink href="https://github.com/zeit/docs">
                      Fork us on GitHub →
                    </GenericLink>
                  </span>
                </P>
              </div>
            </section>
          </Wrapper>
          <Footer />
        </main>
      </Layout>
      <style jsx>{`
        .hero-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 72px;
          padding-bottom: 128px;
          background: linear-gradient(
            360deg,
            #fafbfc 0%,
            rgba(250, 251, 252, 0) 100%
          );
          border-bottom: 1px solid #eaeaea;
        }

        .hero-section :global(h1) {
          margin-top: 0;
          margin-bottom: 32px;
          padding: 0 24px;
          text-align: center;
        }

        .view-all {
          margin-top: 24px;
        }

        .search {
          height: 48px;
          transition: all 0.1s ease;
        }

        .get-started-cta {
          position: relative;
          bottom: -108px;
          height: 0;
        }

        .get-started-cta :global(button:hover) {
          background: var(--geist-background);
          color: var(--geist-link-color);
        }

        .topics-section {
          margin-top: 96px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--accents-2);
        }

        .topics-container {
          margin-top: 48px;
        }

        .docs-navigation-section {
          padding: 48px 0;
        }

        .docs-navigation-wrapper {
          column-gap: 48px;
          column-count: 3;
          column-width: 240px;
        }

        .docs-navigation-category {
          flex-direction: column;
          page-break-inside: avoid;
          break-inside: avoid-column;
          display: flex;
        }

        .docs-navigation-category :global(h5) {
          margin-bottom: 16px;
          margin-top: 40px;
          font-weight: 500;
        }

        .docs-navigation-category :global(a) {
          color: var(--accents-6);
          line-height: 1.5em;
          text-decoration: none;
          transition: color 0.1s ease;
          display: block;
          margin-bottom: 8px;
        }

        .docs-navigation-category a:hover {
          color: var(--geist-foreground);
        }

        .support-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 128px 0;
          border-top: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
        }

        .priority-support-card {
          padding: 48px;
          flex: 0 0 50%;
          border-radius: 4px;
          background-color: #ffffff;
          box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.12);
        }

        .priority-support-card :global(h2) {
          margin: 0;
          margin-top: 24px;
        }

        .priority-support-card :global(p) {
          margin: 0;
          margin-top: 16px;
        }

        .support-check-list-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .support-check-list {
          display: flex;
          flex-direction: column;
        }

        .support-check-list :global(h5) {
          margin: 0;
        }

        .bullet-container {
          display: flex;
          align-items: center;
        }

        .bullet-container :global(p) {
          margin: 0;
          margin-left: 8px;
        }

        .suppor-check-list-wrapper {
          position: relative;
        }

        .support-check-list ul {
          padding: 0;
          margin-top: 24px;
        }

        .support-check-list li {
          list-style: none;
          margin-bottom: 16px;
        }

        .support-check-list li:last-child {
          margin-bottom: 0;
        }

        .support-check-list span {
          margin-left: 16px;
        }

        .extra-resources-section {
          display: flex;
          justify-content: space-between;
          margin-top: 64px;
          margin-bottom: 64px;
        }

        .extra-resources-section > div {
          flex: 1;
          margin-right: 48px;
        }

        .extra-resources-section :global(h5) {
          margin: 0;
          margin-left: 16px;
        }
        .extra-resources-section :global(p) {
          margin: 0;
          margin-top: 24px;
        }

        .mobile-only {
          display: none;
        }

        .icon-with-header {
          display: flex;
          align-items: center;
        }

        @media (max-width: 720px) {
          .support-section {
            flex-direction: column;
            padding: 64px 0;
          }

          .priority-support-card {
            width: 100%;
          }

          .priority-support-card :global(h3) {
            margin: 0;
            margin-top: 24px;
            margin-bottom: 16px;
          }

          .support-check-list {
            margin-left: 0;
            margin-top: 64px;
            margin-right: 0;
            align-items: center;
          }

          .support-check-list ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }

          .support-check-list li {
            margin-left: 24px;
          }
          .extra-resources-section {
            flex-direction: column;
            align-items: center;
          }

          .extra-resources-section > div {
            margin-top: 48px;
            margin-right: 0;
          }
          .extra-resources-section > div:first-child {
            margin-top: 0;
          }
        }

        @media (max-width: 640px) {
          .mobile-only {
            display: block;
          }

          .desktop-only {
            display: none;
          }

          .docs-navigation-section {
            min-height: 400px;
            padding-bottom: 48px;
          }

          .docs-navigation-wrapper {
            column-count: 1;
          }

          .docs-navigation-wrapper > .navigation-left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-right: 0;
          }

          .landing :global(header.header .search-wrapper) {
            visibility: visible;
            opacity: 1;
          }

          .landing .search {
            visibility: hidden;
            opacity: 0;
            height: 0;
          }

          .landing .hero-section {
            padding-bottom: 72px;
          }

          .get-started-cta {
            bottom: -52px;
          }
        }
      `}</style>
    </div>
  )
}

export default Landing
