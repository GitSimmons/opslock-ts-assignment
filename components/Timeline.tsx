import moment from "moment";
import { IShift } from "../sources";
import { DisplayTime } from './DisplayTime'

export const Timeline = ({
  shifts = [],
  handleClick,
  absolute = false, // collapses all shifts onto one line
  availableShifts = [],
  currentShifts = [],
  sort = shifts => shifts // I call this 'fastest sort'
}: {
  shifts: IShift[];
  handleClick?: (shift: IShift) => void;
  absolute?: boolean;
  availableShifts?: IShift[];
  currentShifts?: IShift[];
  sort?: (shifts: IShift[]) => IShift[];
}) => {
  return (
    <>
      {sort(shifts).map(shift => (
        <TimeLineShift
          shift={shift}
          key={shift.start + shift.end}
          handleClick={handleClick}
          absolute={absolute}
          currentShifts={currentShifts}
          availableShifts={availableShifts}
        />
      ))}
    </>
  )
};

const TimeLineShift = ({
  shift,
  handleClick,
  absolute,
  currentShifts = [],
  availableShifts = []
}: {
  shift: IShift;
  handleClick?: (shift: IShift) => void;
  absolute?: boolean;
  currentShifts?: IShift[];
  availableShifts?: IShift[];
}) => {
  const start = moment(shift.start, "hhmm");
  const end = moment(shift.end, "hhmm");
  const duration = moment.duration(end.diff(start)).asHours();
  const width = duration * 100 / 24 + '%'
  const marginLeft = moment.duration(start.diff(moment({ hour: 0, minute: 0 }))).asHours() * 100 / 24 + '%'
  return (
    <>
      <div
        className={`shift
                  ${
          availableShifts?.indexOf(shift) !== -1 &&
          "available"}
                  ${
          currentShifts?.indexOf(shift) !== -1 &&
          "current"}
                  `}
        onClick={() => handleClick(shift)}
      >
        <DisplayTime time={shift.start} />
        {" - "}
        <DisplayTime time={shift.end} />
        <span className="removeShift">x</span>
      </div>
      <style jsx>
        {`
        .removeShift {
            position: absolute;
            right: 0.5rem;
            color: red;
            opacity: 0;
            transition: all ease-out 0.2s;
            box-sizing: border-box;
          }
          .shift {
            position: ${absolute ? 'absolute' : 'relative'};
            width: ${width};
            padding: 0.2rem;
            line-height: 1.2rem;
            background-color: white;
            color: white;
            margin: 0.2rem;
            margin-left: ${marginLeft}; 
            border-radius: 1rem;
            border: 1px solid lightgrey;
            box-sizing: border-box;
            cursor: default;
            transition: all ease-out 0.2s;
            font-size: 0.75rem;
            color: lightgrey;
            display: flex;
            text-align: center;
            align-items: baseline;
            justify-content: center;
          }
          .available {
            background-color: white;
            border-color: cornflowerblue;
            cursor: pointer;
            color: cornflowerblue;
          }
          .current {
            cursor: pointer;
            background-color: cornflowerblue;
            border-color: cornflowerblue;
            color: white;
          }
          /* remove hover effects for touch users */
          @media (hover: hover) {
          .shift:hover {
            border: 1px solid lightgrey;
            background-color: white;
            color: lightgrey;
          }
          .current :hover {
            background-color: white;
            border-color: cornflowerblue;
            color: cornflowerblue;
          }
          .available :hover {
            background-color: cornflowerblue;
            border-color: cornflowerblue;
            color: white;
          }
          .available:hover .removeShift {
            visibility: none;
          }
          .current:hover .removeShift {
            opacity: 1;
          }
          .current .removeShift:hover {
            color: red;
          }

        `}
      </style>
    </>
  );
};
