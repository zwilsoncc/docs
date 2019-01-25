const Wrapper = ({ children, className, width = '1048' }) => (
  <div className={className}>
    {children}
    <style jsx>{`
      div {
        margin: 0 auto;
        max-width: ${width}px;
        padding: 0 24px;
        position: relative;
      }
    `}</style>
  </div>
)

export default Wrapper
