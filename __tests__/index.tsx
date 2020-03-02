import { render, fireEvent, waitForElement } from "@testing-library/react";
import { globalShiftList } from '../sources'
import '@testing-library/jest-dom/extend-expect'

import IndexPage, { ShiftList } from "../pages/index";

test('should render a string for a shift', () => {
  const sampleString = `${globalShiftList[0].start} - ${globalShiftList[0].end}`
  const testSort = (shifts) => shifts
  const { getByText } = render(<ShiftList shifts={globalShiftList} listTitle="test" handleClick={() => null} sort={testSort} />)
  expect(getByText(sampleString)).toBeInTheDocument()
})

test("clicking an available shift should add it to current shifts and remove it from available shifts", () => {
  const { queryByTestId } = render(<IndexPage />);
  const availableShift = queryByTestId("availableShifts-0000-0600")
  fireEvent.click(availableShift)
  expect(queryByTestId("currentShifts-0000-0600")).toBeInTheDocument()
  expect(queryByTestId("availableShifts-0000-0600")).not.toBeInTheDocument()
});

test("clicking a current shift should remove it from current shifts and add it to available shifts", () => {
  const { queryByTestId } = render(<IndexPage />);
  const currentShift = queryByTestId("currentShifts-1600-2000")
  fireEvent.click(currentShift)
  expect(queryByTestId("currentShifts-0000-0600")).not.toBeInTheDocument()
  expect(queryByTestId("availableShifts-0000-0600")).toBeInTheDocument()
});
