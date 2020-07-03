import formatDate from 'date-fns/format'

import Head from '~/components/layout/head'
import Wrapper from '~/components/layout/wrapper'
import { H1, H3, P } from '~/components/text'
import { AvatarGroup } from '~/components/avatar'
import Link from '~/components/text/link'
import guides from '~/lib/data/guides.json'
import { PRODUCT_NAME } from '~/lib/constants'

const Guides = () => (
  <>
    <Head
      titlePrefix=""
      titleSuffix=""
      title={`${PRODUCT_NAME} Guides`}
      description={`Learn how to quickly deploy with ${PRODUCT_NAME} in any situation.`}
    />

    <div className="guides">
      <div className="guide-heading">
        <Wrapper>
          <H1>Guides</H1>
          <P>A list of guides for using {PRODUCT_NAME} with any project.</P>
        </Wrapper>
      </div>

      <Wrapper>
        <div className="guide-list">
          {guides.map((guide, i) => (
            <Link href={guide.url} key={`${guide.title}.${i}`}>
              <article className="guide">
                <div className="titles">
                  <H3>{guide.title}</H3>
                  <P>{guide.description}</P>
                </div>
                <div className="meta">
                  <span className="date">
                    Created on {formatDate(guide.published, 'MMMM Do YYYY')}
                  </span>
                  <AvatarGroup
                    size={24}
                    members={guide.authors.map(author => {
                      return { username: author }
                    })}
                  />
                </div>
              </article>
            </Link>
          ))}

          <Link href="https://github.com/vercel/docs/blob/master/CONTRIBUTING.md#guides">
            <article className="guide contribute">
              <div className="titles">
                <H3>Write Your Guide →</H3>
                <P>
                  Write about using {PRODUCT_NAME} in combination with a
                  technology of your choosing and get featured!
                </P>
              </div>
              <div className="meta">
                <span className="date" />
                <div className="avatar">You</div>
              </div>
            </article>
          </Link>
        </div>
      </Wrapper>
    </div>

    <style jsx>{`
      .titles {
        margin-right: var(--geist-gap);
      }

      .guides {
        min-height: 100vh;
        padding-bottom: 64px;
      }

      .guides :global(span a) {
        width: 100%;
      }

      .guide-heading {
        border-bottom: 1px solid #eaeaea;
        padding-top: 48px;
        padding-bottom: 16px;
      }

      .guide-heading :global(h1) {
        margin-bottom: 8px;
      }

      .guide-heading :global(p) {
        font-size: 16px;
        margin-top: 8px;
        color: #444444;
      }

      .guide-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding-top: 8px;
      }

      .guide-list > :global(*:not(:last-child)) .guide {
        border-bottom: 1px solid #eaeaea;
      }

      .guide-list > :global(*:nth-last-child(2)) .guide {
        border-color: transparent;
      }

      .guide-list > :global(*:nth-last-child(2)) .guide:after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, transparent 50%, #ddd 50%);
        background-size: 8px 100%;
      }

      .guide-list :global(a):hover {
        text-decoration: none;
      }

      .guide {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 24px 0;
        position: relative;
      }

      .guide :global(h3) {
        color: #000;
        margin: 0;
      }

      .guide :global(p) {
        margin-bottom: 0;
        color: #222;
        padding-right: 64px;
      }

      .guide :global(.avatar-group) {
        width: auto;
      }

      .guide:hover :global(h3) {
        text-decoration: underline;
      }

      .guide.contribute {
        margin-top: 24px;
      }

      .guide.contribute :global(h3) {
      }

      .guide.contribute :global(p) {
      }

      .guide.contribute .meta .avatar {
        width: 24px;
        height: 24px;
        background: #000;
        border-radius: 50%;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 8px;
        font-weight: 700;
        color: white;
      }

      .meta {
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
      }

      .date {
        color: #666;
        font-size: var(--font-size-small);
        line-height: var(--line-height-primary);
      }

      @media (max-width: 768px) {
        .guide {
          flex-direction: column;
        }

        .guide :global(p) {
          padding-right: 0;
        }

        .meta {
          flex-direction: row;
          margin-top: 24px;
        }

        .guide.contribute .meta .avatar {
          display: none;
        }
      }
    `}</style>
  </>
)

export default Guides

export const config = {
  amp: 'hybrid'
}
