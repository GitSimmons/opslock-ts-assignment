import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'

import IndexPage from "../pages/index";

test('should render times for a shift', () => {
  const sampleString = `00:00 - 06:00`
  const { getByText } = render(<IndexPage />)
  expect(getByText(sampleString)).toBeInTheDocument()
})

test("clicking an available shift should add it to current shifts and remove it from available shifts", () => {
  const sampleString = `00:00 - 06:00`
  const { getAllByText } = render(<IndexPage />)
  expect(getAllByText(sampleString)[0]).toHaveClass('available')
  fireEvent.click(getAllByText(sampleString)[0])
  expect(getAllByText(sampleString)[0]).not.toHaveClass('available')
  expect(getAllByText(sampleString)[0]).toHaveClass('current')

});

test("clicking a current shift should remove it from current shifts and add it to available shifts", () => {
  const sampleString = `06:00 - 10:00`
  const { getAllByText } = render(<IndexPage />)
  expect(getAllByText(sampleString)[0]).toHaveClass('current')
  fireEvent.click(getAllByText(sampleString)[0])
  expect(getAllByText(sampleString)[0]).not.toHaveClass('current')
  expect(getAllByText(sampleString)[0]).toHaveClass('available')
});

test('shifts that are neither available nor current should nave neither class', () => {
  const sampleString = `00:00 - 12:00`
  const { getAllByText } = render(<IndexPage />)
  expect(getAllByText(sampleString)[0]).not.toHaveClass('current')
  expect(getAllByText(sampleString)[0]).not.toHaveClass('available')
})

test('should switch from 24h to 12h format views', () => {
  const sampleString = `16:00 - 20:00`
  const sampleStringIn12hFormat = `4:00pm - 8:00pm`
  const formatButtonText = `view in 12h format`
  const { getAllByText, getByText } = render(<IndexPage />)
  expect(getAllByText(sampleString)[0]).toBeInTheDocument();
  fireEvent.click(getByText(formatButtonText))
  expect(getAllByText(sampleStringIn12hFormat)[0]).toBeInTheDocument()
})

