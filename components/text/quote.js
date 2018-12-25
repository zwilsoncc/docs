import cns from 'classnames'

const Quote = ({ children }, { darkBg } = {}) => (
  <blockquote className={cns({ dark: darkBg })}>
    {children}
    <style jsx>{`
      blockquote {
        padding: 10px 20px;
        border-left: 5px solid #000;
        margin: 32px 0;
        color: #000;
      }

      blockquote.dark {
        border-left-color: #fff;
        color: #888;
      }

      blockquote :global(div) {
        margin: 0;
      }
    `}</style>
  </blockquote>
)

export default Quote
