import { render, screen } from "@testing-library/react";
import Item from "./Item";


test('render content', () => {
  const datum = {
    name: "milk",
    quantity: 6,
    expireDate: '05/01/2024'
  }

  render(<Item datum={datum} />)

  const element = screen.getByText('name: milk')
  expect(element).toBeDefined()
})
