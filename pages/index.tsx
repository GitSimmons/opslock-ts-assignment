import React, { useState, useEffect } from "react";
import { globalShiftList, userShifts, IShift } from "../sources";
import { checkAvailableShifts } from "../utils/checkAvailableShifts";
import { sortShiftsByStartTime } from '../utils/sortShifts'

export const ShiftList = ({ shifts, listTitle, handleClick, sort }: { shifts: IShift[], listTitle: string, handleClick: (shift: IShift) => void, sort: (shifts: IShift[]) => IShift[] }) =>
  <ul key={listTitle}>
    {sort(shifts).map((shift) =>
      <li
        onClick={() => handleClick(shift)}
        key={`${listTitle}-${shift.start}-${shift.end}`}
        data-testid={`${listTitle}-${shift.start}-${shift.end}`}
      >
        {shift.start} - {shift.end}
      </li>)}
  </ul>

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
      <ShiftList shifts={globalShiftList} listTitle='globalShifts' sort={sortShiftsByStartTime} handleClick={() => null} />
      Current Shifts
      <ShiftList shifts={currentShifts} listTitle='currentShifts' sort={sortShiftsByStartTime} handleClick={removeShift} />
      Available Shifts
      <ShiftList shifts={availableShifts} listTitle='availableShifts' sort={sortShiftsByStartTime} handleClick={addShift} />
    </div >
  );
}
