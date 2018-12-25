const Navigation = ({ children, className }) => (
  <nav className={className}>
    {children}
    <style jsx>{`
      nav {
        align-items: center;
        display: flex;
        padding: 10px;
      }
    `}</style>
  </nav>
)

export default Navigation
