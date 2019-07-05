const H3 = ({ children }) => (
  <h3>
    {children}
    <style jsx>{`
      h3 {
        font-size: 1.5rem;
        line-height: 1.333em;
        letter-spacing: -0.029375rem;
        font-weight: 600;
        color: var(--geist-foreground);
      }
    `}</style>
  </h3>
)

export default H3
