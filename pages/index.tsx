import React, { useState, useEffect } from "react";
import { globalShiftList, userShifts, IShift } from "../sources";
import { checkAvailableShifts } from "../utils";


export default function Index() {
  const [currentShifts, setCurrentShifts] = useState(userShifts)
  const [availableShifts, setAvailableShifts] = useState(checkAvailableShifts(currentShifts, globalShiftList))
  // const getAvailableShifts = () => setAvailableShifts(checkAvailableShifts(currentShifts, globalShiftList))
  const addShift = (shift: IShift) => {
    setCurrentShifts((prevShifts) => [...prevShifts, shift])
  }
  const removeShift = (shift: IShift) => {
    setCurrentShifts((prevShifts) => prevShifts.filter((prevShift) => prevShift !== shift))
  }
  useEffect(() =>
    setAvailableShifts((checkAvailableShifts(currentShifts, globalShiftList)))
    , [currentShifts])

  const sortShiftsByStartTime = (shifts: IShift[]): IShift[] => shifts.sort((a, b) => parseInt(a.start, 10) - parseInt(b.start, 10))
  const sortShiftsByEndTime = (shifts: IShift[]): IShift[] => shifts.sort((a, b) => parseInt(a.end, 10) - parseInt(b.end, 10))
  const sortShiftsByLength = (shifts: IShift[]): IShift[] => shifts.sort((a, b) => (parseInt(a.end, 10) - parseInt(a.start)) - (parseInt(b.end, 10) - parseInt(b.start)))

  return (
    <div>
      All Shifts
      <ul>
        {sortShiftsByStartTime(globalShiftList).map((shift) => <li>{shift.start} - {shift.end}</li>)}
      </ul>
      Current Shifts
      <ul>
        {currentShifts.map((shift) => <li onClick={() => removeShift(shift)}>{shift.start} - {shift.end}</li>)}
      </ul>
      Available Shifts
      <ul>
        {availableShifts.map((shift) => <li onClick={() => addShift(shift)}>{shift.start} - {shift.end}</li>)}
      </ul>
    </div>
  );
}
