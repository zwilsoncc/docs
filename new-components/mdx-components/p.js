export const P = ({ children }) => (
  <p>
    {children}
    <style jsx>{`
      p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        margin-bottom: 20px;
      }
    `}</style>
  </p>
)

export default P
