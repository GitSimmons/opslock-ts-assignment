import { IShift } from "../sources";

export const sortShiftsByStartTime = (shifts: IShift[]): IShift[] =>
  [...shifts].sort((a, b) => parseInt(a.start, 10) - parseInt(b.start, 10));
export const sortShiftsByEndTime = (shifts: IShift[]): IShift[] =>
  [...shifts].sort((a, b) => parseInt(a.end, 10) - parseInt(b.end, 10));
export const sortShiftsByLength = (shifts: IShift[]): IShift[] =>
  [...shifts].sort(
    (a, b) =>
      parseInt(a.end, 10) -
      parseInt(a.start) -
      (parseInt(b.end, 10) - parseInt(b.start))
  );
