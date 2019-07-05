const H1 = ({ children, className }) => (
  <h1 className={className}>
    {children}
    <style jsx>{`
      h1 {
        font-size: 3rem;
        line-height: 1.1666em;
        letter-spacing: -0.066875rem;
        font-weight: 600;
        color: var(--geist-foreground);
      }

      h1 :global(code) {
        margin-left: 6px;
        margin-right: 6px;
      }
    `}</style>
  </h1>
)

export default H1
