import { IShift } from "./sources";

const convertShiftToNumbers = ({ start, end }: IShift) => {
  return {
    start: parseInt(start, 10),
    end: parseInt(end, 10)
  };
};

const shiftsThatDoNotIncludeShift = (
  shiftToCheckObj: IShift,
  currentShifts: IShift[]
): IShift[] => {
  return currentShifts.filter(shiftObj => {
    const shift = convertShiftToNumbers(shiftObj);
    const shiftToCheck = convertShiftToNumbers(shiftToCheckObj);
    return (
      // shift starts and ends before the start of the shift it's comparing itself to
      (shiftToCheck.start <= shift.start && shiftToCheck.end <= shift.start) ||
      // or shift starts and ends after the shift it's comparing itself to
      (shiftToCheck.start >= shift.end && shiftToCheck.end >= shift.end)
    );
  });
};

const shiftIsFree = (shift, currentShifts): boolean =>
  shiftsThatDoNotIncludeShift(shift, currentShifts).length ===
  currentShifts.length;

export const checkAvailableShifts = (currentShifts, allShifts) => {
  return allShifts.filter(shift => shiftIsFree(shift, currentShifts));
};
