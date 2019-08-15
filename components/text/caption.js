const Caption = ({ children, ...props }) => (
  <p {...props}>
    {children}
    <style jsx>
      {`
        p {
          color: #999;
          font-size: 12px;
          margin: -24px 0 40px 0;
          text-align: center;
          line-height: 2;
        }
      `}
    </style>
  </p>
)

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: var(--font-mono);
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

Caption.Code = Code

export default Caption
