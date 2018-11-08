import cn from 'classnames'
import { Component } from 'react'
import { GenericLink } from './text/link'

export class SectionButtons extends Component {
  render() {
    const { children, className, ...props } = this.props

    return (
      <div className={cn('section-buttons', className)} {...props}>
        {children}
        <style jsx>{`
          .section-buttons {
            display: flex;
            flex-flow: row wrap;
            margin-bottom: 40px;
            margin-top: 32px;
          }
        `}</style>
      </div>
    )
  }
}

export class SectionButton extends Component {
  render() {
    const { href, as, children, className, ...props } = this.props

    return (
      <div className={cn('section-button', className)} {...props}>
        <GenericLink href={href} as={as}>
          {children}
        </GenericLink>

        <style jsx>{`
          .section-button {
            flex: 1 0 50%;
          }

          .section-button :global(a) {
            border-radius: 5px;
            border: 1px solid #eaeaea;
            padding: 0 16px;
            height: 56px;
            display: flex;
            align-items: center;
            font-size: 14px;
            font-weight: 600;
            color: black;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            margin-bottom: 24px;
            transition: box-shadow 0.2s ease, border 0.2s ease, color 0.2s ease;
          }

          .section-button:nth-child(odd):not(:last-child) :global(a) {
            margin-right: 8px;
          }

          .section-button:nth-child(even) :global(a) {
            margin-left: 8px;
          }

          .section-button:hover :global(a) {
            border-color: #dddddd;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            text-decoration: none;
            color: #067df7;
          }

          @media only screen and (max-width: 548px) {
            .section-button {
              flex: 0 0 100%;
            }

            .section-button:nth-child(odd):not(:last-child) :global(a) {
              margin-right: 0;
            }

            .section-button:nth-child(even) :global(a) {
              margin-left: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}
