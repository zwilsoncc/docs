const Wrapper = ({ children, className }) => (
  <div className={className}>
    {children}
    <style jsx>{`
      div {
        margin: 0 auto;
        max-width: 1048px;
        padding: 0 24px;
        position: relative;
      }
    `}</style>
  </div>
)

export default Wrapper
