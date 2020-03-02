import React, { useState, useEffect } from "react";
import { globalShiftList, userShifts, IShift } from "../sources";
import { checkAvailableShifts } from "../utils/checkAvailableShifts";
import { sortShiftsByStartTime } from '../utils/sortShifts'

export default () => {
  const [currentShifts, setCurrentShifts] = useState(userShifts)
  const [availableShifts, setAvailableShifts] = useState(checkAvailableShifts(currentShifts, globalShiftList))
  const addShift = (shift: IShift) => {
    setCurrentShifts((prevShifts) => [...prevShifts, shift])
  }
  const removeShift = (shift: IShift) => {
    setCurrentShifts((prevShifts) => prevShifts.filter((prevShift) => prevShift !== shift))
  }
  useEffect(() =>
    setAvailableShifts((checkAvailableShifts(currentShifts, globalShiftList)))
    , [currentShifts])

  return (
    <div>
      All Shifts
      <ul>
        {sortShiftsByStartTime(globalShiftList).map((shift) => <li key={`globalShifts-${shift.start}-${shift.end}`}>{shift.start} - {shift.end}</li>)}
      </ul>
      Current Shifts
      <ul>
        {sortShiftsByStartTime(currentShifts).map((shift) => <li key={`currentShifts-${shift.start}-${shift.end}`} data-testid={`currentShifts-${shift.start}-${shift.end}`} onClick={() => removeShift(shift)}>{shift.start} - {shift.end}</li>)}
      </ul>
      Available Shifts
      <ul>
        {sortShiftsByStartTime(availableShifts).map((shift) => <li key={`availableShifts-${shift.start}-${shift.end}`} data-testid={`availableShifts-${shift.start}-${shift.end}`} onClick={() => addShift(shift)}>{shift.start} - {shift.end}</li>)}
      </ul>
    </div>
  );
}
