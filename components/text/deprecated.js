const Deprecated = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        opacity: 0.7;
      }
    `}</style>
  </div>
)

export default Deprecated
