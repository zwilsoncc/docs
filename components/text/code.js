import PropTypes from 'prop-types'

export const Code = ({ children, syntax }, { darkBg } = {}) => (
  <pre className={(darkBg ? 'dark' : '') + (syntax ? ` ${syntax}` : '')}>
    <code>{children}</code>
    <style jsx>
      {`
        pre {
          border: 1px solid #eaeaea;
          padding: 20px;
          margin: 24px 0 40px;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          background: white;
        }
        code {
          color: #bd10e0;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 13px;
          line-height: 20px;
        }
        pre.dark {
          border-color: #333;
          background: transparent;
        }
        .dark code {
          color: #fff;
        }
        .dark.shell code {
          color: #50e3c2;
        }
      `}
    </style>
  </pre>
)

Code.contextTypes = {
  darkBg: PropTypes.bool
}

export const InlineCode = ({ children, noWrap, color }) => (
  <code className={noWrap && 'no-wrap'}>
    {children}
    <style jsx>
      {`
        code {
          color: ${color ? color : '#bd10e0'};
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '\`';
        }

        code::after {
          content: '\`';
        }
      `}
    </style>
  </code>
)

export const RequestHeader = ({ children, ...props }) => (
  <InlineCode noWrap color="#067df7" {...props}>
    {children}
  </InlineCode>
)
