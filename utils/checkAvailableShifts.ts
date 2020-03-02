import { IShift } from "../sources";

export const convertShiftToNumbers = ({ start, end }: IShift) => {
  return {
    start: parseInt(start, 10),
    end: parseInt(end, 10)
  };
};

export const shiftIsFree = (
  shiftToCheckObj: IShift,
  currentShifts: IShift[]
): boolean => {
  return currentShifts.every(shiftObj => {
    const shift = convertShiftToNumbers(shiftObj);
    const shiftToCheck = convertShiftToNumbers(shiftToCheckObj);
    return (
      // shift either ends before the compared shift ends or starts after the compared shift ends
      shiftToCheck.end <= shift.start || shiftToCheck.start >= shift.end
    );
  });
};

export const checkAvailableShifts = (
  currentShifts: IShift[],
  allShifts: IShift[]
): IShift[] => {
  return allShifts.filter(shift => shiftIsFree(shift, currentShifts));
};
