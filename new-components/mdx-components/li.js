const LI = ({ children }) => (
  <li>
    {children}
    <style jsx>{`
      li {
        font-size: 14px;
        line-height: 24px;
        margin-bottom: 10px;
      }

      li > :global(p:last-child) {
        margin-bottom: 0;
        margin-top: 0;
      }
    `}</style>
  </li>
)

export default LI
