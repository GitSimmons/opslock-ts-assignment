import React, { useState, useEffect } from "react";
import { globalShiftList, userShifts, IShift } from "../sources";
import { checkAvailableShifts } from "../utils/checkAvailableShifts";
import { sortShiftsByStartTime } from "../utils/sortShifts";
import { Timeline } from "../components/Timeline";
import { Container } from "../components/Container";
import { useFormat, Format, FormatContext } from "../components/useFormat";
import { FormatToggle } from '../components/FormatToggle'
import { MyShifts } from '../components/MyShifts'

export default () => {
  const [globalShifts, setGlobalShifts] = useState(globalShiftList);
  const [currentShifts, setCurrentShifts] = useState(userShifts);
  const [availableShifts, setAvailableShifts] = useState(
    checkAvailableShifts(currentShifts, globalShiftList)
  );
  const { changeFormat, format } = useFormat();

  const addShift = (shift: IShift) => {
    setCurrentShifts(prevShifts => [...prevShifts, shift]);
    setGlobalShifts(prevShifts =>
      prevShifts.filter(comparisonShift => comparisonShift !== shift)
    );
  };
  const removeShift = (shift: IShift) => {
    setCurrentShifts(prevShifts =>
      prevShifts.filter(prevShift => prevShift !== shift)
    );
    setGlobalShifts(prevShifts => [...prevShifts, shift]);
  };
  useEffect(
    () => setAvailableShifts(checkAvailableShifts(currentShifts, globalShifts)),
    [currentShifts]
  );
  const toggleShift = shift => {
    currentShifts.indexOf(shift) !== -1
      ? removeShift(shift)
      : availableShifts.indexOf(shift) !== -1
        ? addShift(shift)
        : null;
  };
  return (
    <FormatContext.Provider value={{ format }}>
      <Container>
        <h2>My Shifts</h2>
        <MyShifts currentShifts={currentShifts} toggleShift={toggleShift} sort={sortShiftsByStartTime} />
        <h2>All Shifts</h2>
        <FormatToggle changeFormat={changeFormat} />
        <Timeline
          shifts={globalShifts.concat(currentShifts)}
          handleClick={toggleShift}
          availableShifts={availableShifts}
          currentShifts={currentShifts}
          sort={sortShiftsByStartTime}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: '2rem' }}>
          <a href="/">
            <button className="cancel">Cancel</button ></a>

          <button className="save">Save</button>
        </div>
      </Container>
    </FormatContext.Provider >
  );
};
