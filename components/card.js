import cn from 'classnames'
import { Component } from 'react'
import { GenericLink } from './text/link'
import { H4 } from './text/heading'
import { P } from './text/paragraph'

export default class Card extends Component {
  render() {
    const { href = '#', as, children, className, title, ...props } = this.props

    return (
      <div className={cn('card', className)} {...props}>
        <GenericLink href={href} as={as}>
          {title && (
            <H4>
              {title} <span className="arrow">→</span>
            </H4>
          )}
          <P>{children}</P>
        </GenericLink>

        <style jsx>{`
          .card {
            background: white;
            border-radius: 5px;
            border: 1px solid #eaeaea;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            min-height: 48px;
            margin: 24px 0;
            transition: border 0.2s ease, box-shadow 0.2s ease;
          }

          .card :global(p) {
            margin: 0;
          }

          .card :global(a) {
            display: flex;
            padding: 24px;
            width: 100%;
            height: 100%;
            flex-direction: column;
            font-size: 14px;
            color: black;
          }

          .card :global(h4) {
            margin-top: 0;
            margin-bottom: 8px;
            color: #067df7;
            font-weight: 700;
          }

          .card:hover :global(a) {
            text-decoration: none;
          }

          .card:hover {
            text-decoration: none;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            border-color: #dddddd;
          }

          .card .arrow {
            transition: margin-left 0.2s ease;
          }

          .card:hover .arrow {
            margin-left: 4px;
          }
        `}</style>
      </div>
    )
  }
}
