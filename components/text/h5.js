const H5 = ({ children }) => (
  <h5>
    {children}
    <style jsx>
      {`
        h5 {
          font-size: 1rem;
          line-height: 1.4999em;
          letter-spacing: -0.01125rem;
          font-weight: 600;
          color: var(--geist-foreground);
        }

        h5 :global(code) {
          margin-left: 6px;
          margin-right: 6px;
        }
      `}
    </style>
  </h5>
)

export default H5
