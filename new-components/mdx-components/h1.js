const H1 = ({ children }) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        font-size: 40px;
        font-weight: 400;
        margin-top: 0;
      }
    `}</style>
  </h1>
)

export default H1
