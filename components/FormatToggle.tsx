import { useContext } from 'react'
import { Format, FormatContext } from "../components/useFormat";

export const FormatToggle: React.FC<{ changeFormat: () => void }> = ({ changeFormat }) => {
  const { format } = useContext(FormatContext)
  return (
    <>
      <div className={'format-toggle'} onClick={changeFormat}>

        <input
          type="checkbox"
          checked={format === Format.hh}
          onChange={changeFormat}
          id="format-checkbox"
        />
        <label className="switch" htmlFor="format-checkbox">
          view in {format === Format.HH ? '12h' : '24h'} format
        </label>
      </div>
      <style jsx>
        {`
        .format-toggle {
          position: absolute;
          display: flex;
          text-align: center;
          right: 0;
          background-color: #29317c;
          color: #fff;
          border-radius: 1rem;
          font-size: 0.75rem;
          padding: 0.2rem 1rem;
          line-height: 1.2rem;
          cursor: pointer;
          float: right;
        }
        .format-toggle:hover {
          background-color: #3943aa;
        }
        #format-checkbox {
          display: none;
        }
        label {
          cursor: pointer;

        }
    `}
      </style>
    </>
  )
}