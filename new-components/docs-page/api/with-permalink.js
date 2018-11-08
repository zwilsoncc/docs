import Context from '../context'
import PermalinkIcon from '../../icons/permakink'
import getFragment from './get-fragment'

export default function withPermalink(Heading) {
  return function HeadingWithPermalink({ children }) {
    return (
      <Context.Consumer>
        {({ slugs }) => (
          <Heading>
            <a href={`#${getFragment(slugs)}`}>
              {children}
              <PermalinkIcon size="0.4em" />
            </a>
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
