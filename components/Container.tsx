export const Container: React.FC = ({ children }) => {
  return (<>
    <div className='container'>{children}</div>
    <style jsx global>
      {`
      html {
        font-family: sans-serif;
        padding: 0;
        margin: 0;
      }
      * {
        box-sizing: border-box;
      }
      @media (hover: none) {
        *:hover {
          border: inherit;
          background-color: inherit;
          color: inherit;
        }
      }
      .container {
        max-width: 1200px;
        margin: auto;
        color: #28307c;
        position: relative;
      }
      button {
        line-height: 1.5;
        white-space: nowrap;
        text-align: center;
        height: 2rem;
        padding: 0 1rem;
        font-size: 0.8rem;
        border-radius: .25rem;
        cursor: pointer;
        border: none;
        transition: all ease-in 0.2s;
      }
      .save {
        color: #fff;
        background-color: #29317c;
      }
      .save:hover {
        background-color: #3943aa;
      }
      .cancel {
        background-color: white;
        decoration: none;
        color: grey;
      }
      .cancel:hover {
        color: red;
      }
    `}
    </style>
  </>
  )
}