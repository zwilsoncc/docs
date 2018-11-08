import Link from 'next/link'
import PermalinkIcon from '../../icons/permakink'
import Context from '../context'
import getHref from './get-href'
import getSlugsForId from './get-slugs-for-id'

export default function withPermalink(Heading) {
  return function HeadingWithPermalink({ children }) {
    return (
      <Context.Consumer>
        {({ id }) => (
          <Heading>
            <Link {...getHref(getSlugsForId(id))}>
              <a>
                {children}
                <PermalinkIcon size="0.4em" />
              </a>
            </Link>
            <style jsx>{`
              a {
                align-items: center;
                border-bottom: 1px solid transparent;
                color: inherit;
                display: inline-flex;
                text-decoration: none;
              }

              a:visited {
                color: inherit;
              }

              a:hover {
                border-bottom-color: inherit;
              }

              a > :global(svg) {
                display: none;
                margin-left: 5px;
              }

              a:hover > :global(svg) {
                display: block;
              }
            `}</style>
          </Heading>
        )}
      </Context.Consumer>
    )
  }
}
