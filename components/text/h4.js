import cns from 'classnames'

const H4 = ({ children, isCommand }) => (
  <h4 className={cns({ command: isCommand })}>
    {children}
    <style jsx>{`
      h4 {
        font-size: 1.25rem;
        line-height: 1.399em;
        letter-spacing: -0.020625rem;
        font-weight: 600;
        color: var(--geist-foreground);
      }

      .command {
        color: #bd10e0;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
        font-size: 0.9em;
      }

      h4 :global(code) {
        margin-left: 6px;
        margin-right: 6px;
      }
    `}</style>
  </h4>
)

export default H4
