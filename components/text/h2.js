const H2 = ({ children, className }) => (
  <h2 className={className}>
    {children}
    <style jsx>{`
      h2 {
        font-size: 2.25rem;
        line-height: 1.222em;
        letter-spacing: -0.049375rem;
        font-weight: 600;
        color: var(--geist-foreground);
      }

      h2 :global(code) {
        margin-left: 6px;
        margin-right: 6px;
      }
    `}</style>
  </h2>
)

export default H2
