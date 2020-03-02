import { sortShiftsByStartTime } from "../utils/sortShifts";

const unsortedShifts = [
  {
    start: "0000",
    end: "1200"
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
