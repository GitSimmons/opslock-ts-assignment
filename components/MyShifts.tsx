import { DisplayTime } from "./DisplayTime";
import { Timeline } from "./Timeline";
import { FormatContext, Format } from "./useFormat";
import { IShift } from "../sources";

export const MyShifts = ({ currentShifts, toggleShift, sort }) => {
  return (
    <>
      {/* Absolutely positioned children means resorting to magic height number to set a background for them*/}
      <div className="my-shifts-timeline" style={{}}>
        {/* Force Format.HH because Format.hh is more likely to wrap, and it looks ridiculous when some shifts
      are double height.*/}
        <FormatContext.Provider value={{ format: Format.HH }}>
          <Timeline
            absolute
            shifts={currentShifts}
            handleClick={toggleShift}
            currentShifts={currentShifts}
          />
        </FormatContext.Provider>
      </div>
      <div className="my-shifts-list">
        {sort(currentShifts).map((shift: IShift) => (
          <div key={`currentShifts${shift.start}-${shift.end}`}>
            <button onClick={() => toggleShift(shift)}>
              <p>
                <DisplayTime time={shift.start} />
                {" - "}
                <DisplayTime time={shift.end} /> <span>x</span>{" "}
              </p>
            </button>
          </div>
        ))}
      </div>
      <style jsx>
        {`
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 0;
            background: none;
            margin: 0 0;
            color: grey;
          }
          p {
            font-size: 0.9rem;
            color: #29317c;
            transition: all ease-in 0.15s;
          }
          p:hover {
            color: lightgrey;
          }
          button:hover span {
            color: red;
          }
          span {
            padding: 0 0;
            background: none;
            width: inherit;
            font-size: 0.8rem;
            line-height: 0.8rem;
            color: darkred;
            transition: all ease-in 0.2s;
          }
          .my-shifts-timeline {
            background-color: #e8e8e8;
            border-radius: 1rem;
            height: 2.1rem;
            position: relative;
            white-space: nowrap;
          }
          .my-shifts-list {
            display: none;
          }
          @media (max-width: 450px) {
            .my-shifts-timeline {
              display: none;
            }
            .my-shifts-list {
              display: block;
            }
          }
        `}
      </style>
    </>
  );
};
