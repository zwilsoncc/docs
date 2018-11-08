import React from 'react'
import { PDIV } from '../text/paragraph'

export default class Example extends React.PureComponent {
  render() {
    const { children } = this.props

    return (
      <div className="example">
        <PDIV>{children}</PDIV>

        <style jsx>{`
          .example {
            background: #f6f6f6;
            color: #000;
            display: flex;
            flex-direction: column;
            border-radius: 4px;
            padding: 24px;
            margin-bottom: 24px;
          }

          .example :global(*::selection) {
            background-color: #f81ce5;
            color: #fff;
          }

          .example :global(> div) {
            margin-bottom: 0;
            margin-top: 0;
          }

          .example :global(> div > *:first-child) {
            margin-top: 0;
          }

          .example :global(> div > *:last-child) {
            margin-bottom: 0;
          }

          .example + :global(h2),
          .example + :global(h3),
          .example + :global(h4) {
            margin-top: 64px;
          }

          .example + :global(h5) {
            margin-top: 32px;
          }
        `}</style>
      </div>
    )
  }
}
