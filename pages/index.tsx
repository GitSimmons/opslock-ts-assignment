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

  return (
    <div>
      Global Shifts
      <ul>
        {globalShiftList.map((shift) => <li>{shift.start} - {shift.end}</li>)}
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
