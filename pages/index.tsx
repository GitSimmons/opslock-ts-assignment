import React, { useState } from "react";
import { globalShiftList, userShifts } from "../sources";
import { checkAvailableShifts } from "../utils";

export default function Index() {
  const [currentShifts, setCurrentShifts] = useState(userShifts)
  const [availableShifts, setAvailableShifts] = useState(checkAvailableShifts(currentShifts, globalShiftList))
  return (
    <div>
      Global Shifts
      <ul>
        {globalShiftList.map((shift) => <li>{shift.start} - {shift.end}</li>)}
      </ul>
      Current Shifts
      <ul>
        {currentShifts.map((shift) => <li>{shift.start} - {shift.end}</li>)}
      </ul>
      Available Shifts
      <ul>
        {availableShifts.map((shift) => <li>{shift.start} - {shift.end}</li>)}
      </ul>
    </div>
  );
}
