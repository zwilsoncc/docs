const Content = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 100%;
        padding-left: calc(256px + 40px);
        padding-bottom: 128px;
      }

      @media screen and (max-width: 950px) {
        div {
          padding-left: 0;
        }
      }
    `}</style>
  </div>
)

export default Content
