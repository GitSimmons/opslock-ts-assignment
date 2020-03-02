import { render, fireEvent, waitForElement } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import IndexPage from "../pages/index";

test("clicking an available shift should add it to current shifts", () => {
  const { getByTestId } = render(<IndexPage />);
  const availableShift = getByTestId("availableShifts-0000-0600")
  fireEvent.click(availableShift)
  expect(getByTestId("currentShifts-0000-0600")).toBeInTheDocument()
});

test("clicking an available shift should remove it from current shifts", () => {
  const { queryByTestId } = render(<IndexPage />);
  const availableShift = queryByTestId("availableShifts-0000-0600")
  fireEvent.click(availableShift)
  expect(queryByTestId("availableShifts-0000-0600")).not.toBeInTheDocument()
});
