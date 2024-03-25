import { render, screen } from "@testing-library/react";
import Item from "./Item";

const sum = (a, b) => {
  return a + b
}

test('sum test', () => {
  const result = sum(1, 2)
  expect(result).toBe(3)
})

test('render content', () => {
  const datum = {
    name: "milk",
    quantity: 6,
    expireDate: '05/01/2024'
  }

  render(<Item datum={datum} />)

  const element = screen.getByText('milk')
  expect(element).toBeDefined()
})
