import {
  convertShiftToNumbers,
  shiftIsFree,
  checkAvailableShifts
} from "../utils/checkAvailableShifts";
import { userShifts, globalShiftList } from "../sources";

const freeShift = {
  start: "0000",
  end: "0600"
};

const unavailableShift = {
  start: "0000",
  end: "2359"
};

test("should convert shift to numbers", () => {
  expect(
    convertShiftToNumbers({
      start: "0000",
      end: "2359"
    })
  ).toEqual({
    start: 0,
    end: 2359
  });
});
test("shiftIsFree should return true for free shifts ", () => {
  expect(shiftIsFree(freeShift, userShifts)).toBe(true);
});
test("shiftIsFree should return false for unavailable shifts ", () => {
  expect(shiftIsFree(unavailableShift, userShifts)).toBe(false);
});

test("get all shifts should return the one available shift", () => {
  expect(checkAvailableShifts(userShifts, globalShiftList)).toStrictEqual([
    {
      start: "0000",
      end: "0600"
    }
  ]);
});
