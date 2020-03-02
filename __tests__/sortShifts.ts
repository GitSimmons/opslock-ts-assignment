import {
  sortShiftsByStartTime,
  sortShiftsByEndTime,
  sortShiftsByLength
} from "../utils/sortShifts";

const unsortedShifts = [
  {
    start: "0000",
    end: "1300"
  },
  {
    start: "0600",
    end: "1200"
  },
  {
    start: "0300",
    end: "2359"
  }
];

test("should sort shifts in order of when they start", () => {
  const sortedShifts = sortShiftsByStartTime(unsortedShifts);
  expect(sortedShifts).toEqual([
    unsortedShifts[0],
    unsortedShifts[2],
    unsortedShifts[1]
  ]);
});

test("should sort shifts in order of when they start", () => {
  const sortedShifts = sortShiftsByEndTime(unsortedShifts);
  expect(sortedShifts).toEqual([
    unsortedShifts[1],
    unsortedShifts[0],
    unsortedShifts[2]
  ]);
});

test("should sort shifts by shift length", () => {
  const sortedShifts = sortShiftsByLength(unsortedShifts);
  expect(sortedShifts).toEqual([
    unsortedShifts[1],
    unsortedShifts[0],
    unsortedShifts[2]
  ]);
});
