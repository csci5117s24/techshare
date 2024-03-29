import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App"

test('App test', () => {
  const result = render(<App />);

  const addButton = screen.getByText('Add Item')
  expect(addButton).toBeDefined();
  const nameInput = screen.getByPlaceholderText('Name')
  const quantityInput = screen.getByPlaceholderText('Quantity')
  const expInput = screen.getByPlaceholderText('Expiry: MM/DD/YYYY')
  expect(nameInput).toBeDefined()
  expect(quantityInput).toBeDefined()
  expect(expInput).toBeDefined()
  const itemsBefore = screen.getAllByRole('listitem')

  fireEvent.change(nameInput, { target: { value: 'Test Item'}})
  fireEvent.change(quantityInput, { target: { value: '1'}})
  fireEvent.change(expInput, { target: { value: '01/01/2024'}})

  fireEvent.click(addButton)

  const itemsAfter = screen.getAllByRole('listitem')
  expect(itemsAfter.length).toBe(itemsBefore.length + 1)
  const newItem = screen.getByText('name: Test Item')
  expect(newItem).toBeDefined()
})